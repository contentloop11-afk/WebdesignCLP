// POST /api/publish/init — initializes a Direct Post (video.publish) and returns
// the upload_url + publish_id. The video bytes are PUT directly from the browser
// to upload_url (no secret needed), sidestepping Vercel's 4.5 MB request limit.
// access_token is read server-side from the HttpOnly cookie.
//
// All post_info values come from the user's explicit choices in the composer
// (privacy, interaction toggles, content disclosure) — required for TikTok's
// Direct Post audit. We re-validate the branded-content rule server-side too.
//
// Body: { title, privacy_level, disable_comment, disable_duet, disable_stitch,
//         brand_content_toggle, brand_organic_toggle, video_size }

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

const VALID_PRIVACY = ['PUBLIC_TO_EVERYONE', 'MUTUAL_FOLLOW_FRIENDS', 'FOLLOWER_OF_CREATOR', 'SELF_ONLY'];

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.statusCode = 405; return res.json({ error: 'method_not_allowed' }); }

  const token = parseCookies(req.headers.cookie).tt_token;
  if (!token) { res.statusCode = 401; return res.json({ error: 'not_authenticated' }); }

  const {
    title = '',
    privacy_level,
    disable_comment = false,
    disable_duet = false,
    disable_stitch = false,
    brand_content_toggle = false,
    brand_organic_toggle = false,
    video_size,
  } = await readJson(req);

  // Privacy is a deliberate choice — no default. Reject if missing/invalid.
  if (!privacy_level || !VALID_PRIVACY.includes(privacy_level)) {
    res.statusCode = 400;
    return res.json({ error: 'missing_privacy_level' });
  }
  if (!video_size || video_size < 1) { res.statusCode = 400; return res.json({ error: 'missing_video_size' }); }

  // TikTok rule: branded content (paid partnership) cannot be private.
  if (brand_content_toggle && privacy_level === 'SELF_ONLY') {
    res.statusCode = 400;
    return res.json({ error: 'branded_content_cannot_be_private' });
  }

  const payload = {
    post_info: {
      title: String(title).slice(0, 2200),
      privacy_level, // unaudited apps are forced to SELF_ONLY by TikTok regardless
      disable_comment: !!disable_comment,
      disable_duet: !!disable_duet,
      disable_stitch: !!disable_stitch,
      brand_content_toggle: !!brand_content_toggle, // paid partnership / branded content
      brand_organic_toggle: !!brand_organic_toggle, // "your brand"
    },
    source_info: {
      source: 'FILE_UPLOAD',
      video_size,
      chunk_size: video_size,   // single chunk
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
