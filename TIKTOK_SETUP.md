# TikTok Publish-Flow — Setup

Echter Content-Posting-Flow (Login Kit + Content Posting API / Direct Post).
Token-Tausch läuft serverseitig über Vercel Functions, `client_secret` bleibt geheim.

## 1. Vercel Environment Variables (Project → Settings → Environment Variables)

| Name | Wert |
|------|------|
| `TIKTOK_CLIENT_KEY` | `awjupjfpfigcby5y` |
| `TIKTOK_CLIENT_SECRET` | *(aus TikTok Developer Console → App → "App secret")* |
| `TIKTOK_REDIRECT_URI` | `https://webdesignclp.vercel.app/api/auth/callback` |

Nach dem Setzen einmal **redeployen** (Vercel zieht Env-Vars erst beim nächsten Build).

## 2. TikTok Developer Console

- **App name:** exakt `Webdesign CLP`
- **Redirect URI (Login Kit):** `https://webdesignclp.vercel.app/api/auth/callback`
  *(ersetzt die alte `/tiktok-upload.html` — muss exakt mit `TIKTOK_REDIRECT_URI` übereinstimmen)*
- **Scopes:** `user.info.basic`, `video.publish` — `video.upload` entfernen (wird nicht genutzt)
- **Web/Desktop URL:** `https://webdesignclp.vercel.app/`

## 3. Endpoints (Vercel Functions)

| Route | Zweck |
|-------|-------|
| `GET /api/auth/login` | baut TikTok-Authorize-URL (+ CSRF-state), redirect zu TikTok |
| `GET /api/auth/callback` | code → access_token (server-side), Token in HttpOnly-Cookie |
| `GET /api/me` | Display-Name/Avatar (demonstriert `user.info.basic`) |
| `POST /api/publish/init` | Direct-Post init → `upload_url` + `publish_id` |
| `GET /api/publish/status?id=` | Status-Poll bis `PUBLISH_COMPLETE` |

Video-Bytes gehen per `PUT` direkt vom Browser an TikToks `upload_url` (umgeht Vercels 4.5 MB Request-Limit).

## 4. Wichtig bis zur Production-Approval

- Unauditierte App: TikTok **erzwingt `SELF_ONLY`** (privat), egal welche Sichtbarkeit gewählt wird. Max 5 Test-User.
- Für die Sandbox-Demo: Test-User im Developer Portal hinzufügen; der Account sollte beim Posten auf privat stehen.
- Nach bestandener Review wird `PUBLIC_TO_EVERYONE` wirksam.

## 5. Demo-Video (für die Review)

Kompletten Flow zeigen, Domain `webdesignclp.vercel.app` sichtbar:
Login mit TikTok → OAuth-Consent → "Connected as @name" → Video wählen → Caption + Sichtbarkeit → Publish → "Published". Sandbox-Post zählt als Nachweis.
