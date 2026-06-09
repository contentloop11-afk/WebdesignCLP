// GET /api/auth/login — builds the TikTok OAuth authorize URL and redirects.
// No secret involved here; client_key + redirect_uri come from env for consistency.
const crypto = require('crypto');

module.exports = (req, res) => {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI;
  if (!clientKey || !redirectUri) {
    res.statusCode = 500;
    return res.end('Server not configured: missing TIKTOK_CLIENT_KEY / TIKTOK_REDIRECT_URI');
  }

  const scope = 'user.info.basic,video.publish,video.upload';
  const state = crypto.randomBytes(16).toString('hex');

  // CSRF state in a short-lived HttpOnly cookie, verified in the callback.
  res.setHeader('Set-Cookie', `tt_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`);

  const url = 'https://www.tiktok.com/v2/auth/authorize/'
    + '?client_key=' + encodeURIComponent(clientKey)
    + '&scope=' + encodeURIComponent(scope)
    + '&response_type=code'
    + '&redirect_uri=' + encodeURIComponent(redirectUri)
    + '&state=' + state;

  res.writeHead(302, { Location: url });
  res.end();
};
