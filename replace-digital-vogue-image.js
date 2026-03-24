// Ersetzt das Multicolored Jacket Portrait durch ChatGPT-Bild für Digital Vogue Collection
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Digital Vogue Image Replacement gestartet');
    
    // Warte kurz, damit alle Bilder geladen sind
    setTimeout(() => {
      // Finde alle Vorkommen des Multicolored-Bildes
      var selector = 'img[src*="67c624fbccf45fa49a0dbc76_Multicolored"], img[src*="Multicolored%20Jacket%20Portrait"]';
      var images = document.querySelectorAll(selector);
      
      if (images.length === 0) {
        console.log('🔍 Kein Multicolored-Bild gefunden');
        return;
      }
      
      console.log(`✅ ${images.length} Multicolored-Bilder gefunden`);
      
      var newImageSrc = 'Assets/ChatGPT Image 22. Aug. 2025, 21_38_30.png';
      
      images.forEach(function(img, index) {
        // Entferne responsive Attribute für saubere Ersetzung
        img.removeAttribute('srcset');
        img.removeAttribute('sizes');
        
        // Ersetze das Bild
        img.setAttribute('src', newImageSrc);
        
        // Setze das Bild ohne Cache-Buster für bessere Kompatibilität
        img.src = newImageSrc;
        
        console.log(`🖼️ Bild ${index + 1} ersetzt:`, img.src);
      });
      
      console.log('🎉 Digital Vogue Titelbild erfolgreich aktualisiert!');
      
    }, 500); // 500ms warten für sichere Ladung
  });
})();
