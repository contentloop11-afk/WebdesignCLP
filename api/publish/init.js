// POST /api/publish/init — initializes a Direct Post and returns the
// upload_url + publish_id. The actual video bytes are PUT directly from the
// browser to upload_url (no secret needed), so we sidestep Vercel's 4.5 MB
// request-body limit. access_token is read server-side from the HttpOnly cookie.
//
// Body: { title, privacy_level, video_size }

function parseCookies(header) {
  const out = {};
  (header || '').split(';').forEach(p => {
    const i = p.indexOf('=');
    if (i > -1) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}

async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  return await new Promise((resolve) => {
    let raw = '';
    req.on('data', c => (raw += c));
    req.on('end', () => { try { resolve(JSON.parse(raw || '{}')); } catch { resolve({}); } });
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.statusCode = 405; return res.json({ error: 'method_not_allowed' }); }

  const token = parseCookies(req.headers.cookie).tt_token;
  if (!token) { res.statusCode = 401; return res.json({ error: 'not_authenticated' }); }

  const { title = '', privacy_level = 'SELF_ONLY', video_size } = await readJson(req);
  if (!video_size || video_size < 1) { res.statusCode = 400; return res.json({ error: 'missing_video_size' }); }

  // Single-chunk upload (chunk_size === video_size, total_chunk_count === 1).
  const payload = {
    post_info: {
      title: String(title).slice(0, 2200),
      privacy_level, // unaudited apps are forced to SELF_ONLY by TikTok regardless
      disable_duet: false,
      disable_comment: false,
      disable_stitch: false,
    },
    source_info: {
      source: 'FILE_UPLOAD',
      video_size,
      chunk_size: video_size,
      total_chunk_count: 1,
    },
  };

  try {
    const r = await fetch('https://open.tiktokapis.com/v2/post/publish/video/init/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(payload),
    });
    const data = await r.json();

    if (!data.data || !data.data.upload_url) {
      const msg = (data.error && (data.error.message || data.error.code)) || 'init_failed';
      res.statusCode = 400;
      return res.json({ error: msg, raw: data.error || null });
    }
    res.json({ publish_id: data.data.publish_id, upload_url: data.data.upload_url });
  } catch (e) {
    res.statusCode = 502;
    res.json({ error: 'init_request_failed' });
  }
};
