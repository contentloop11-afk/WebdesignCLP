// LARS KUNDE - Ultra-Smooth Parallax Animation (Anti-Jump)
document.addEventListener('DOMContentLoaded', function() {
    const nameElement = document.querySelector('.name');
    
    if (!nameElement) {
        console.log('❌ .name Element nicht gefunden!');
        return;
    }

    let ticking = false;
    let lastScrollY = 0;
    let currentX = -150; // Aktuelle Position für smooth interpolation
    let targetX = -150;  // Ziel-Position
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        
        // Anti-Jitter: Verhindere extreme negative Scroll-Werte
        const clampedScrollY = Math.max(0, scrollY);
        
        // Berechne Ziel-Position
        const parallaxSpeed = 0.3; // Langsamere Geschwindigkeit für smoothness
        const startPosition = -150;
        targetX = startPosition + (clampedScrollY * parallaxSpeed);
        
        // Smooth Interpolation (Lerp) zur Ziel-Position
        const lerpFactor = 0.1; // Je kleiner, desto smoother aber träger
        currentX = currentX + (targetX - currentX) * lerpFactor;
        
        // Nur updaten wenn signifikante Änderung
        if (Math.abs(scrollY - lastScrollY) > 1 || Math.abs(targetX - currentX) > 0.5) {
            // Transform mit style-Attribut (überschreibt CSS !important)
            nameElement.style.setProperty('transform', `translate3d(${Math.round(currentX)}px, 0, 0)`, 'important');
        }
        
        lastScrollY = scrollY;
        ticking = false;
        
        // Weiter animieren wenn noch nicht am Ziel angekommen
        if (Math.abs(targetX - currentX) > 0.1) {
            requestAnimationFrame(function() {
                if (!ticking) {
                    ticking = true;
                    updateParallax();
                }
            });
        }
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Initiale Position sofort setzen (ohne Scroll-Event)
    const initialScrollY = Math.max(0, window.pageYOffset);
    const initialTargetX = -150 + (initialScrollY * 0.3);
    currentX = initialTargetX;
    targetX = initialTargetX;
    nameElement.style.setProperty('transform', `translate3d(${Math.round(currentX)}px, 0, 0)`, 'important');
    
    // Optimierter Scroll Event Listener (throttled für Performance)
    window.addEventListener('scroll', requestTick, { passive: true });
    
    console.log('✅ LARS KUNDE Ultra-Smooth Parallax Animation geladen!');
    console.log(`📍 Startet bei ${Math.round(currentX)}px, wandert smooth nach rechts beim Scrollen`);
});
