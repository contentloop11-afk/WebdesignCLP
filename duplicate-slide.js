// Dupliziert die Monochrome-Karte und fügt sie direkt darunter ein
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    try {
      // Verhindern, dass mehrfach dupliziert wird
      if (document.querySelector('.project-row[data-duplicate="monochrome-copy"]')) {
        return;
      }

      const monoImg = document.querySelector('img[src*="67c0ba8d7b64b871f0fac8a3_img-7.webp"]');
      if (!monoImg) {
        console.log('[duplicate-slide] Monochrome Bild nicht gefunden');
        return;
      }

      const monoRow = monoImg.closest('.project-row');
      if (!monoRow) {
        console.log('[duplicate-slide] .project-row für Monochrome nicht gefunden');
        return;
      }

      const clone = monoRow.cloneNode(true);
      clone.setAttribute('data-duplicate', 'monochrome-copy');

      // Titel/Teaser im Duplikat leicht anpassen, damit unterscheidbar
      const titleEl = clone.querySelector('.project-thumbnail-content h3');
      const descEl = titleEl ? titleEl.nextElementSibling : null;
      if (titleEl) titleEl.textContent = 'Monochrome (Copy)';
      if (descEl && descEl.tagName.toLowerCase() === 'p') {
        descEl.textContent = 'Identische Struktur als zusätzliche Karte – bereit für Anpassungen.';
      }

      // Einfaches Hover-Verhalten aktivieren (falls Webflow-Interaction nicht gebunden ist)
      const inner = clone.querySelector('.project-thumbnail-link-inner');
      const content = clone.querySelector('.project-thumbnail-content');
      const overlay = clone.querySelector('.image-overlay');
      if (content) content.style.transition = 'opacity 0.25s ease';
      if (overlay) overlay.style.transition = 'opacity 0.25s ease';
      if (content) content.style.opacity = '0';
      if (overlay) overlay.style.opacity = '0';
      if (inner) {
        inner.addEventListener('mouseenter', () => {
          if (content) content.style.opacity = '1';
          if (overlay) overlay.style.opacity = '1';
        });
        inner.addEventListener('mouseleave', () => {
          if (content) content.style.opacity = '0';
          if (overlay) overlay.style.opacity = '0';
        });
      }

      monoRow.parentNode.insertBefore(clone, monoRow.nextSibling);
      console.log('[duplicate-slide] Monochrome-Karte dupliziert und eingefügt.');
    } catch (e) {
      console.error('[duplicate-slide] Fehler beim Duplizieren:', e);
    }
  }, 1200);
});


