(function () {
  const INTERVAL_MS = 5000;
  const VIDEO_SRC = './glitch-hero.mp4';

  function init() {
    const hero = document.querySelector('.home-hero-section');
    const silhouette = document.querySelector('.silhouette');
    if (!hero || !silhouette) return;

    // height:100% auf Kind funktioniert nur wenn Parent height (nicht nur min-height) hat
    hero.style.height = window.getComputedStyle(hero).minHeight;

    // Silhouette braucht position:relative damit absolute Children funktionieren
    silhouette.style.position = 'relative';

    const video = document.createElement('video');
    video.src = VIDEO_SRC;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.loop = false;

    // Muss exakt background-size:contain + background-position:10% center matchen
    Object.assign(video.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      objectPosition: '52% center',
      opacity: '0',
      mixBlendMode: 'screen',
      maskImage: 'radial-gradient(ellipse 65% 75% at 43% 45%, black 40%, transparent 80%)',
      webkitMaskImage: 'radial-gradient(ellipse 65% 75% at 43% 45%, black 40%, transparent 80%)',
      transition: 'opacity 0.3s ease',
      zIndex: '10',
      pointerEvents: 'none',
    });

    silhouette.appendChild(video);

    function playGlitch() {
      video.currentTime = 0;
      video.style.opacity = '1';
      video.play();
      video.onended = function () {
        video.style.opacity = '0';
      };
    }

    setTimeout(function trigger() {
      playGlitch();
      setTimeout(trigger, INTERVAL_MS);
    }, INTERVAL_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
