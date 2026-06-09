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
| `GET /api/publish/creator-info` | Pflicht-Vorabruf für Direct Post: Avatar/Name, erlaubte Privacy-Level, gesperrte Interaktionen (`creator_info/query`) |
| `POST /api/publish/init` | Direct-Post init → `upload_url` + `publish_id` (mit echten Consent-Feldern) |
| `GET /api/publish/status?id=` | Status-Poll bis `PUBLISH_COMPLETE` |

Video-Bytes gehen per `PUT` direkt vom Browser an TikToks `upload_url` (umgeht Vercels 4.5 MB Request-Limit).

### Consent-UI (Audit-Pflicht, im Composer `tiktok-upload.html` Schritt 3)

Direct Post verlangt eine vollständige Compose-Oberfläche. Implementiert + headless-getestet (19/19):
- Creator-Avatar + Name sichtbar beim Posten (aus `creator_info`).
- Privacy-Auswahl **ohne Default** — Publish gesperrt bis aktive Wahl; nur von TikTok erlaubte Level.
- Comment/Duet/Stitch-Toggles, default **aus**, greyed-out wenn der Account sie sperrt.
- Content-Disclosure-Toggle → „Your brand" (`brand_organic_toggle`) / „Branded content" (`brand_content_toggle`).
- Branded Content kann **nicht** privat sein (UI + Server erzwingen es).
- Consent-Text wechselt: ohne Branded → nur Music Usage Confirmation; mit Branded → + Branded Content Policy.

## 4. Wichtig bis zur Production-Approval

- Unauditierte App: TikTok **erzwingt `SELF_ONLY`** (privat), egal welche Sichtbarkeit gewählt wird. Max 5 Test-User.
- Für die Sandbox-Demo: Test-User im Developer Portal hinzufügen; der Account sollte beim Posten auf privat stehen.
- Nach bestandener Review wird `PUBLIC_TO_EVERYONE` wirksam.

## 5. Demo-Video (für die Review)

Ein **durchgehender** Screencast, Domain `webdesignclp.vercel.app` sichtbar, ohne Schnitt:
1. Login mit TikTok → OAuth-Consent-Screen (alle Permissions zustimmen)
2. „Connected as @name" (demonstriert `user.info.basic`)
3. Video wählen → Video-Preview
4. Composer: Creator-Avatar + Name sichtbar
5. Privacy aktiv auswählen (zeigen, dass kein Default gesetzt ist)
6. Comment/Duet/Stitch-Toggles zeigen (default aus; ggf. greyed-out)
7. „Disclose video content" an → Your brand / Branded content → Consent-Text ändert sich; zeigen, dass Branded Content „privat" sperrt
8. Caption tippen (editierbar)
9. Publish → „processing" → „Published"
10. In die TikTok-App/Profil wechseln und den (privaten) Sandbox-Post live zeigen

Sandbox-Post zählt als Nachweis.
