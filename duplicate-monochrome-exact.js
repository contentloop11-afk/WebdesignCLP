// Dupliziert die Monochrome-Karte 1:1 (Struktur, Klassen, Webflow-Interactions)
document.addEventListener('DOMContentLoaded', function () {
  const MAX_RETRIES = 8;
  const RETRY_MS = 500;

  function run(attempt = 1) {
    try {
      if (document.querySelector('.project-row[data-duplicate="mono-exact"]')) return;

      // Monochrome anhand des Bildes identifizieren
      const monoImg = document.querySelector('img[src*="67c0ba8d7b64b871f0fac8a3_img-7.webp"]');
      if (!monoImg) throw new Error('Monochrome-Bild nicht gefunden');

      const monoRow = monoImg.closest('.project-row');
      if (!monoRow) throw new Error('Monochrome .project-row nicht gefunden');

      const listParent = monoRow.parentNode; // enthält mehrere .project-row
      if (!listParent) throw new Error('Parent-Liste nicht gefunden');

      // Exakte Kopie erzeugen
      const clone = monoRow.cloneNode(true);
      clone.setAttribute('data-duplicate', 'mono-exact');

      // Link im Duplikat optional neutralisieren (damit Klicks nicht doppelt verwirren)
      const link = clone.querySelector('a.project-thumbnail-link');
      if (link) link.setAttribute('href', link.getAttribute('href') || '#');

      // Am Ende der Liste einfügen
      listParent.appendChild(clone);
      console.log('[duplicate-mono] Kopie am Listenende eingefügt.');
    } catch (err) {
      if (attempt < MAX_RETRIES) {
        setTimeout(() => run(attempt + 1), RETRY_MS);
      } else {
        console.warn('[duplicate-mono] Abgebrochen:', err.message);
      }
    }
  }

  setTimeout(() => run(), 700);
});



