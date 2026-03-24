// Hero Parallax Scroll Animation
class HeroParallax {
  constructor() {
    this.videos = [];
    this.isScrolling = false;
    this.scrollY = 0;
    this.init();
  }

  init() {
    console.log('🌊 Hero Parallax Animation gestartet');
    
    // Warte bis alle Videos geladen sind
    setTimeout(() => {
      this.findVideos();
      this.setupScrollListener();
    }, 3000); // Nach den Video-Replacements
  }

  findVideos() {
    // Finde alle Hero-Videos
    const video1 = document.querySelector('video[src*="hero-video-1"]');
    const video2 = document.querySelector('video[src*="hero-video-2"]');
    const video3 = document.querySelector('video[src*="hero-video-3"]');

    if (video1) {
      video1.classList.add('hero-video-1');
      this.videos.push({ element: video1, speed: 0.5, direction: -1 }); // Nach links
      console.log('✅ Video 1 für Parallax gefunden');
    }
    
    if (video2) {
      video2.classList.add('hero-video-2');
      this.videos.push({ element: video2, speed: 0.7, direction: -1 }); // Schneller nach links
      console.log('✅ Video 2 für Parallax gefunden');
    }
    
    if (video3) {
      video3.classList.add('hero-video-3');
      this.videos.push({ element: video3, speed: 0.9, direction: -1 }); // Am schnellsten nach links
      console.log('✅ Video 3 für Parallax gefunden');
    }

    console.log(`🎬 ${this.videos.length} Videos für Parallax-Animation bereit`);
  }

  setupScrollListener() {
    // Optimierter Scroll-Listener mit RequestAnimationFrame
    let ticking = false;

    const updateParallax = () => {
      this.scrollY = window.pageYOffset;
      this.animateVideos();
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    console.log('🎯 Parallax Scroll-Listener aktiviert');
  }

  animateVideos() {
    // Berechne Scroll-Fortschritt (0 = oben, 1 = nach unten gescrollt)
    const scrollProgress = Math.min(this.scrollY / window.innerHeight, 2);

    this.videos.forEach((video, index) => {
      const { element, speed, direction } = video;
      
      // Berechne Parallax-Verschiebung
      const translateX = scrollProgress * speed * direction * 100; // In Pixeln
      const opacity = Math.max(1 - (scrollProgress * 0.3), 0.4); // Leichtes Fade-Out
      
      // Wende Transformation an
      element.style.transform = `translateX(${translateX}px)`;
      element.style.opacity = opacity;
    });
  }
}

// Starte Parallax nach dem DOM-Load
document.addEventListener('DOMContentLoaded', () => {
  new HeroParallax();
});
