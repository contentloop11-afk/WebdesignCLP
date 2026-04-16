(function () {
  const INTERVAL_MS = 5000;
  const VIDEO_SRC = './glitch-hero.mp4';

  function init() {
    const hero = document.querySelector('.home-hero-section');
    if (!hero) return;

    // Hero braucht position:relative als Anker
    hero.style.position = 'relative';

    const video = document.createElement('video');
    video.src = VIDEO_SRC;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.loop = false;

    Object.assign(video.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      objectPosition: '10% center',
      opacity: '0',
      mixBlendMode: 'screen',
      transition: 'opacity 0.3s ease',
      zIndex: '10',
      pointerEvents: 'none',
    });

    hero.appendChild(video);

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
