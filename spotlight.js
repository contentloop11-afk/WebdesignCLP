// Spotlight / Flashlight Effect
// Replaces the missing Webflow IX2 animation for the mask SVG

(function() {
  var mask = null;
  var mouseX = window.innerWidth / 2;
  var mouseY = window.innerHeight / 2;
  var currentX = mouseX;
  var currentY = mouseY;
  var rafId = null;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function animate() {
    currentX = lerp(currentX, mouseX, 0.08);
    currentY = lerp(currentY, mouseY, 0.08);

    if (mask) {
      var dx = currentX - window.innerWidth / 2;
      var dy = currentY - window.innerHeight / 2;
      mask.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
    }

    rafId = requestAnimationFrame(animate);
  }

  function init() {
    mask = document.querySelector('.fixed-photo-wall-bg .mask');
    if (!mask) {
      console.warn('Spotlight: .mask not found');
      return;
    }

    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    animate();
    console.log('✅ Spotlight effect aktiv');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
