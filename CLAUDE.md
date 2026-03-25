# Contentloop Website — Projektkontext für Lea

## Was das hier ist
Lars' Portfolio-Website als Content Creator / Video Editor / Social Media Manager.
Ursprünglich Webflow-Template "Niko Marcellini" — komplett umgebaut.

## Deployment
- **GitHub:** `https://github.com/contentloop11-afk/WebdesignCLP.git` (Branch: `main`)
- **Live:** `webdesignclp.vercel.app` (Vercel, auto-deploy aus GitHub)
- **Lokal testen:** `npx serve` auf Port 3000

## Wichtige Dateien
- `index.html` — Hauptseite
- `custom-silhouette.css` — Fast alle custom CSS-Overrides
- `spotlight.js` — Maus-Cursor Scheinwerfer-Effekt (Ersatz für Webflow IX2)
- `skills-overlay.css` + `skills-overlay.js` — Infinite Marquee der Skills-GIFs
- `testimonials-cards.css` + `update-testimonials.js` — Kundenstimmen
- `blog.css` — Blog-Section Styling
- `footage/` — Alle Medien (GIFs, Fotos, Videos)

## Workflow
Änderungen immer committen und pushen → Vercel deployed automatisch.
```
git add <datei> && git commit -m "..." && git push origin main
```

## Offene Baustellen
- Mobile Gesamtlayout (sieht auf Smartphone anders aus)
- Projekt-Karten ("Minimalist"-Block wirkt leblos, Jahreszahl zu groß)
- Warenkorb-Icon im Nav (Webflow Commerce, sollte weg)

## Technische Eigenheiten
- Webflow IX2 ist im Grab nicht enthalten → `spotlight.js` als Ersatz
- `background-size: contain` überschreibt einzelne `.silhouette` Regeln — immer gleiche Selektor-Kette nutzen
- Leerzeichen in Dateinamen in `footage/` → URL-encoden in HTML
