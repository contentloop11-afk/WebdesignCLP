// POST /api/publish/init — initializes either a Direct Post (video.publish) or
// a Draft upload to the user's TikTok inbox (video.upload), and returns the
// upload_url + publish_id. The video bytes are PUT directly from the browser to
// upload_url (no secret needed), sidestepping Vercel's 4.5 MB request limit.
// access_token is read server-side from the HttpOnly cookie.
//
// Body: { mode: 'direct' | 'draft', title, privacy_level, video_size }

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

  const { mode = 'direct', title = '', privacy_level = 'SELF_ONLY', video_size } = await readJson(req);
  if (!video_size || video_size < 1) { res.statusCode = 400; return res.json({ error: 'missing_video_size' }); }

  const source_info = {
    source: 'FILE_UPLOAD',
    video_size,
    chunk_size: video_size,   // single chunk
    total_chunk_count: 1,
  };

  // Two distinct TikTok endpoints — one per scope:
  //   draft  → /inbox/video/init/  (video.upload): lands in the user's TikTok inbox to finish in-app
  //   direct → /video/init/        (video.publish): posts straight to the profile with post_info
  let endpoint, payload;
  if (mode === 'draft') {
    endpoint = 'https://open.tiktokapis.com/v2/post/publish/inbox/video/init/';
    payload = { source_info };
  } else {
    endpoint = 'https://open.tiktokapis.com/v2/post/publish/video/init/';
    payload = {
      post_info: {
        title: String(title).slice(0, 2200),
        privacy_level, // unaudited apps are forced to SELF_ONLY by TikTok regardless
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false,
      },
      source_info,
    };
  }

  try {
    const r = await fetch(endpoint, {
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
    res.json({ publish_id: data.data.publish_id, upload_url: data.data.upload_url, mode });
  } catch (e) {
    res.statusCode = 502;
    res.json({ error: 'init_request_failed' });
  }
};
