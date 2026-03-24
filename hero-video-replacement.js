// Ersetze nur die ersten 3 Bilder im Hero-Grid (oben rechts) – keine globalen Hides
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎬 Hero Video Replacement gestartet');

  const grid = document.querySelector('.projects-grid-thumbnails');
  if (!grid) {
    console.warn('❌ .projects-grid-thumbnails nicht gefunden');
    return;
  }

  // Kandidaten im Grid sammeln (robust gegen Webflow-Änderungen)
  const candidates = grid.querySelectorAll('img');
  const targets = [candidates[0], candidates[1], candidates[2]].filter(Boolean);
  const sources = ['hero-video-1.mp4', 'hero-video-2.mp4', 'hero-video-3.mp4'];

  function replaceImageWithVideo(imageElement, src) {
    try {
      const rect = imageElement.getBoundingClientRect();

      const video = document.createElement('video');
      video.src = src;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;

      // Klassen und Inline-Styles übernehmen
      video.className = imageElement.className;
      video.style.cssText = imageElement.getAttribute('style') || '';
      video.style.objectFit = 'cover';

      // Größe stabil setzen, falls nötig
      if (rect.width > 0) video.style.width = rect.width + 'px';
      if (rect.height > 0) video.style.height = rect.height + 'px';

      // Runde Ecken
      video.style.borderRadius = '12px';

      // Bild nicht aus Layout entfernen, nur verblassen bis Ersatz steht
      imageElement.style.opacity = '0';

      imageElement.parentNode.replaceChild(video, imageElement);
      video.play().catch(err => console.warn('Autoplay fehlgeschlagen:', err));

      console.log('🎥 Video eingesetzt:', src);
    } catch (e) {
      console.warn('⚠️ Konnte Bild nicht ersetzen:', e);
    }
  }

  // In Reihenfolge ersetzen
  targets.forEach((img, idx) => {
    setTimeout(() => replaceImageWithVideo(img, sources[idx]), idx * 200);
  });
});
