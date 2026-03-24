class SimplePreloader {
  constructor() {
    this.percentage = 0;
    this.targetPercentage = 100;
    this.duration = 1500; // 1.5 Sekunden
    this.preloaderElement = null;
    this.percentageElement = null;
    this.startTime = null;
  }

  init() {
    console.log('🚀 Simple Preloader startet...');
    
    // Preloader HTML erstellen
    this.createPreloaderHTML();
    
    // Animation nach kurzer Verzögerung starten
    setTimeout(() => {
      this.startAnimation();
    }, 100);
  }

  createPreloaderHTML() {
    // Preloader Container
    const preloader = document.createElement('div');
    preloader.className = 'simple-preloader';
    
    // Percentage Element
    const percentage = document.createElement('div');
    percentage.className = 'simple-percentage';
    percentage.textContent = '0%';
    
    preloader.appendChild(percentage);
    document.body.appendChild(preloader);
    
    this.preloaderElement = preloader;
    this.percentageElement = percentage;
    
    console.log('✨ Preloader HTML erstellt');
  }

  startAnimation() {
    console.log('🎬 Starte 0-100% Animation');
    this.animatePercentage();
  }

  animatePercentage() {
    const animate = (currentTime) => {
      if (!this.startTime) {
        this.startTime = currentTime;
      }
      
      const elapsed = currentTime - this.startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      
      // Smooth easing
      const easedProgress = this.easeOutCubic(progress);
      
      // Update percentage
      this.percentage = Math.floor(easedProgress * this.targetPercentage);
      this.percentageElement.textContent = this.percentage + '%';
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation fertig - 100% setzen und ausblenden
        this.percentageElement.textContent = '100%';
        console.log('🎯 100% erreicht - Preloader wird ausgeblendet');
        
        setTimeout(() => {
          this.hidePreloader();
        }, 300);
      }
    };
    
    requestAnimationFrame(animate);
  }

  easeOutCubic(t) {
    return (--t) * t * t + 1;
  }

  hidePreloader() {
    console.log('👋 Preloader wird ausgeblendet');
    
    // Preloader ausblenden
    this.preloaderElement.classList.add('loaded');
    
    // SOFORT Hero-Animation starten (kein Delay)
    this.startHeroPushAnimation();
    
    // Nach Animation komplett entfernen
    setTimeout(() => {
      if (this.preloaderElement && this.preloaderElement.parentNode) {
        this.preloaderElement.parentNode.removeChild(this.preloaderElement);
        console.log('✅ Preloader komplett entfernt - Hero-Section ist sichtbar');
      }
    }, 800);
  }

  startHeroPushAnimation() {
    console.log('🎬 Starte Hero Push-Animation SOFORT');
    
    // Einfach: Body-Klasse setzen für CSS-Animation
    document.body.classList.add('hero-loaded');
    
    console.log('✅ hero-loaded Klasse gesetzt - CSS übernimmt Animation');
  }
}

// Preloader starten wenn DOM bereit ist
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 DOM geladen - Starte Simple Preloader');
  const preloader = new SimplePreloader();
  preloader.init();
});

// Fallback falls DOM bereits geladen
if (document.readyState === 'loading') {
  // DOM wird noch geladen, Event Listener ist aktiv
} else {
  // DOM bereits geladen
  console.log('📄 DOM bereits geladen - Starte Simple Preloader sofort');
  const preloader = new SimplePreloader();
  preloader.init();
}
