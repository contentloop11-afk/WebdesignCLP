// GET /api/publish/status?id=<publish_id> — proxies TikTok's status fetch
// so the access_token stays server-side. Client polls this until the status
// is PUBLISH_COMPLETE (or FAILED).

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

  const publishId = (req.query && req.query.id) || '';
  if (!publishId) { res.statusCode = 400; return res.json({ error: 'missing_publish_id' }); }

  try {
    const r = await fetch('https://open.tiktokapis.com/v2/post/publish/status/fetch/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ publish_id: publishId }),
    });
    const data = await r.json();
    res.json({
      status: (data.data && data.data.status) || 'UNKNOWN',
      fail_reason: (data.data && data.data.fail_reason) || null,
      error: (data.error && data.error.code !== 'ok') ? data.error.message : null,
    });
  } catch (e) {
    res.statusCode = 502;
    res.json({ error: 'status_request_failed' });
  }
};
