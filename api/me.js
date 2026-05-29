// GET /api/me — returns the connected user's display name & avatar.
// Demonstrates the user.info.basic scope in the UI ("Connected as @name"),
// which TikTok's reviewers expect to see exercised.

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
  if (!token) {
    res.statusCode = 401;
    return res.json({ error: 'not_authenticated' });
  }
  try {
    const r = await fetch('https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name,avatar_url', {
      headers: { Authorization: 'Bearer ' + token },
    });
    const data = await r.json();
    const u = (data.data && data.data.user) || {};
    res.json({ display_name: u.display_name || null, avatar_url: u.avatar_url || null });
  } catch (e) {
    res.statusCode = 502;
    res.json({ error: 'user_info_failed' });
  }
};
