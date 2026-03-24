// Ersetzt die drei Thumbnail-Bilder in der Minimalist-Karte
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    try {
      // Minimalist-Karte über den Titel finden
      const titles = Array.from(document.querySelectorAll('.project-row .project-thumbnail-content h3'));
      const minimalRow = titles.find(h3 => h3.textContent.trim().toLowerCase() === 'minimalist');
      if (!minimalRow) {
        console.warn('[thumbs] Minimalist-Titel nicht gefunden');
        return;
      }

      const row = minimalRow.closest('.project-row');
      if (!row) return;

      const imgs = row.querySelectorAll('.collection-list .w-dyn-item img');
      if (imgs.length < 3) {
        console.warn('[thumbs] Weniger als 3 Thumbnails gefunden');
        return;
      }

      const sources = [
        'Assets/image.png',
        'Assets/image (1).png',
        'Assets/image (2).png'
      ];

      imgs.forEach((img, idx) => {
        if (idx < sources.length) {
          img.src = sources[idx];
          // Aufräumen, damit Browser nicht alte srcset bevorzugt
          img.removeAttribute('srcset');
          img.removeAttribute('sizes');
          img.loading = 'lazy';
          img.alt = img.alt || '';
        }
      });

      console.log('[thumbs] Minimalist-Thumbs ersetzt');
    } catch (e) {
      console.error('[thumbs] Fehler:', e);
    }
  }, 800);
});



