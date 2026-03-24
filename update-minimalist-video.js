// ===== MINIMALIST: Bild -> Video ersetzen =====
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(replaceMinimalistImageWithVideo, 1000);
});

function replaceMinimalistImageWithVideo() {
  console.log('Suche Minimalist-Bilder...');
  
  const selector = 'img[src*="67c1d7999f9c85a2d517e1f3_img-3.webp"]';
  const images = document.querySelectorAll(selector);
  
  console.log('Gefundene Bilder:', images.length);
  
  if (images.length === 0) {
    console.log('Keine Bilder gefunden, versuche erneut...');
    setTimeout(replaceMinimalistImageWithVideo, 1500);
    return;
  }
  
  images.forEach(function(img) {
    console.log('Ersetze Bild:', img);
    
    const video = document.createElement('video');
    video.src = 'Assets/2a573126-af12-46cb-9300-66bfe41eac5f.MP4';
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'auto';
    
    // Alle Attribute vom Bild übernehmen
    video.className = img.className;
    video.style.cssText = img.style.cssText;
    
    // Video-Stile setzen - vollflächig für Hover-Effekt
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.style.display = 'block';
    
    // Poster setzen
    video.poster = img.src;
    
    // Bild durch Video ersetzen
    img.parentNode.replaceChild(video, img);
    console.log('Video erfolgreich eingebunden');
  });
}
