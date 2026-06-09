// GET /api/publish/creator-info — proxies TikTok's creator_info/query so the
// access_token stays server-side. Direct Post REQUIRES this call before posting:
// it returns the creator's avatar/nickname (shown in the composer), the privacy
// levels this account is allowed to use, and which interaction options TikTok has
// disabled for the account — the UI must honour all of these (TikTok audit point).
//
// Docs: https://developers.tiktok.com/doc/content-posting-api-reference-query-creator-info

function parseCookies(header) {
  const out = {};
  (header || '').split(';').forEach(p => {
    const i = p.indexOf('=');
    if (i > -1) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}

module.exports = async (req, res) => {
  const token = parseCookies(req.headers.cookie).tt_token;
  if (!token) { res.statusCode = 401; return res.json({ error: 'not_authenticated' }); }

  try {
    const r = await fetch('https://open.tiktokapis.com/v2/post/publish/creator_info/query/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    const data = await r.json();

    if (!data.data || (data.error && data.error.code && data.error.code !== 'ok')) {
      const msg = (data.error && (data.error.message || data.error.code)) || 'creator_info_failed';
      res.statusCode = 400;
      return res.json({ error: msg });
    }

    const d = data.data;
    res.json({
      creator_avatar_url: d.creator_avatar_url || null,
      creator_username: d.creator_username || null,
      creator_nickname: d.creator_nickname || null,
      // Order/availability is decided by TikTok — the UI must only offer these.
      privacy_level_options: Array.isArray(d.privacy_level_options) ? d.privacy_level_options : [],
      comment_disabled: !!d.comment_disabled,
      duet_disabled: !!d.duet_disabled,
      stitch_disabled: !!d.stitch_disabled,
      max_video_post_duration_sec: d.max_video_post_duration_sec || null,
    });
  } catch (e) {
    res.statusCode = 502;
    res.json({ error: 'creator_info_request_failed' });
  }
};
