(function () {
  const INTERVAL_MS = 5000;
  // WebM Alpha für Chrome/FF, MP4 Fallback für Safari/iOS
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const VIDEO_SRC = isSafari ? './glitch-hero.mp4' : './glitch-hero.webm';

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

    // Mobile: cover + gleiche Position wie Silhouette CSS (@media 767px)
    var isMobile = window.innerWidth <= 767;
    Object.assign(video.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      objectFit: isMobile ? 'cover' : 'contain',
      objectPosition: isMobile ? '60.5% 20%' : '50% center',
      opacity: '0',
      mixBlendMode: isSafari ? 'screen' : 'normal',
      maskImage: 'radial-gradient(ellipse 80% 90% at 50% 40%, black 40%, transparent 80%)',
      webkitMaskImage: 'radial-gradient(ellipse 80% 90% at 50% 40%, black 40%, transparent 80%)',
      transition: 'opacity 0.3s ease',
      zIndex: '10',
      pointerEvents: 'none',
    });

    silhouette.appendChild(video);

    const sfx = new Audio('./glitch_sfx.wav');
    sfx.preload = 'auto';

    // Browser blockiert Audio bis erster User-Interact — einmal unlock
    var audioUnlocked = false;
    function unlockAudio() {
      if (audioUnlocked) return;
      sfx.play().then(function () { sfx.pause(); sfx.currentTime = 0; audioUnlocked = true; }).catch(function () {});
    }
    document.addEventListener('click', unlockAudio, { once: true });
    document.addEventListener('touchstart', unlockAudio, { once: true });
    document.addEventListener('keydown', unlockAudio, { once: true });
    // Auch bei erster Scroll-Interaktion
    document.addEventListener('scroll', unlockAudio, { once: true });

    // Keyframe für subtilen Overbounce-Zoom
    var styleTag = document.createElement('style');
    styleTag.textContent = '@keyframes glitch-zoom{0%{transform:scale(1)}35%{transform:scale(1.025)}75%{transform:scale(0.993)}100%{transform:scale(1)}}';
    document.head.appendChild(styleTag);

    function playGlitch() {
      video.currentTime = 0;
      video.style.opacity = '1';
      video.play();
      sfx.currentTime = 0;
      sfx.play().catch(function () {});
      // Overbounce auf die Silhouette
      silhouette.style.animation = 'none';
      silhouette.offsetHeight; // reflow trigger
      silhouette.style.animation = 'glitch-zoom 0.6s cubic-bezier(0.36,0.07,0.19,0.97) forwards';
      video.onended = function () {
        video.style.opacity = '0';
        silhouette.style.animation = 'none';
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
