// GET /api/auth/callback — TikTok redirects here with ?code & ?state.
// Verifies CSRF state, exchanges the code for an access token SERVER-SIDE
// (client_secret never reaches the browser), stores tokens in HttpOnly cookies,
// then sends the user back to the publisher UI.

function parseCookies(header) {
  const out = {};
  (header || '').split(';').forEach(p => {
    const i = p.indexOf('=');
    if (i > -1) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}

function back(res, qs) {
  res.writeHead(302, { Location: '/tiktok-upload.html' + qs });
  res.end();
}

module.exports = async (req, res) => {
  const { code, state, error, error_description } = req.query || {};

  if (error) return back(res, '?error=' + encodeURIComponent(error_description || error));

  const cookies = parseCookies(req.headers.cookie);
  if (!state || !cookies.tt_state || state !== cookies.tt_state) {
    return back(res, '?error=' + encodeURIComponent('state_mismatch'));
  }
  if (!code) return back(res, '?error=' + encodeURIComponent('missing_code'));

  try {
    const body = new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY,
      client_secret: process.env.TIKTOK_CLIENT_SECRET,
      code: decodeURIComponent(code), // TikTok sends the code URL-encoded
      grant_type: 'authorization_code',
      redirect_uri: process.env.TIKTOK_REDIRECT_URI,
    });

    const r = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    const data = await r.json();

    if (!data.access_token) {
      return back(res, '?error=' + encodeURIComponent(data.error_description || data.error || 'token_exchange_failed'));
    }

    const opts = 'HttpOnly; Secure; SameSite=Lax; Path=/';
    const maxAge = data.expires_in || 86400;
    res.setHeader('Set-Cookie', [
      `tt_token=${data.access_token}; ${opts}; Max-Age=${maxAge}`,
      `tt_open_id=${data.open_id || ''}; ${opts}; Max-Age=${maxAge}`,
      `tt_state=; ${opts}; Max-Age=0`,
    ]);

    back(res, '?connected=1');
  } catch (e) {
    back(res, '?error=' + encodeURIComponent('exchange_error'));
  }
};
