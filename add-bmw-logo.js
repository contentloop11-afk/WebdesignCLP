// ===== BMW LOGO HINZUFÜGEN =====

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        addBmwLogo();
    }, 1500);
});

function addBmwLogo() {
    console.log('Füge BMW Logo hinzu...');
    
    // Finde alle Logo-Wrapper
    const logoWrappers = document.querySelectorAll('.logos-wrappr');
    
    logoWrappers.forEach(function(wrapper) {
        // Prüfe, ob BMW Logo bereits existiert
        const existingBmwLogos = wrapper.querySelectorAll('img[src*="Daco_5743982.png"]');
        if (existingBmwLogos.length === 0) {
            // Füge BMW Logo nach Quadcopter hinzu
            const quadcopterLogos = wrapper.querySelectorAll('img[src*="Quadcopter.png"]');
            quadcopterLogos.forEach(function(quadcopterLogo) {
                const logoWrapper = quadcopterLogo.closest('.logo-wrapper');
                if (logoWrapper) {
                    // Erstelle BMW Logo Element
                    const bmwLogoWrapper = document.createElement('div');
                    bmwLogoWrapper.className = 'logo-wrapper';
                    bmwLogoWrapper.innerHTML = `
                        <img src="Daco_5743982.png" loading="lazy" alt="BMW Logo"/>
                        <img src="67f92ecb810080d9cf6352e7_tl-svg.svg" loading="lazy" alt="" class="top-left-corner"/>
                        <img src="67f92ecb810080d9cf6352e7_tl-svg.svg" loading="lazy" alt="" class="top-right-corner"/>
                        <img src="67f92ecb810080d9cf6352e7_tl-svg.svg" loading="lazy" alt="" class="bottom-left-corner"/>
                        <img src="67f92ecb810080d9cf6352e7_tl-svg.svg" loading="lazy" alt="" class="bottom-right-corner"/>
                    `;
                    
                    // Füge BMW Logo nach Quadcopter hinzu
                    logoWrapper.parentNode.insertBefore(bmwLogoWrapper, logoWrapper.nextSibling);
                }
            });
        }
        
        // Verschiebe Bose Logo zwischen Quadcopter und BMW (nur einmal)
        const boseLogos = wrapper.querySelectorAll('img[src*="bose-1-logo.png"]');
        if (boseLogos.length > 0) {
            const boseLogo = boseLogos[0]; // Nur das erste Bose Logo
            const boseWrapper = boseLogo.closest('.logo-wrapper');
            const quadcopterLogos = wrapper.querySelectorAll('img[src*="Quadcopter.png"]');
            
            if (boseWrapper && quadcopterLogos.length > 0) {
                const quadcopterWrapper = quadcopterLogos[0].closest('.logo-wrapper');
                if (quadcopterWrapper) {
                    // Prüfe, ob Bose Logo bereits nach Quadcopter steht
                    const nextSibling = quadcopterWrapper.nextSibling;
                    if (nextSibling && !nextSibling.querySelector('img[src*="bose-1-logo.png"]')) {
                        // Entferne Bose Logo von seiner aktuellen Position
                        boseWrapper.remove();
                        // Füge Bose Logo nach Quadcopter hinzu
                        quadcopterWrapper.parentNode.insertBefore(boseWrapper, quadcopterWrapper.nextSibling);
                    }
                }
            }
        }
        
        // Entferne alle zusätzlichen Bose Logos (außer dem ersten)
        const allBoseLogos = wrapper.querySelectorAll('img[src*="bose-1-logo.png"]');
        if (allBoseLogos.length > 1) {
            for (let i = 1; i < allBoseLogos.length; i++) {
                const extraBoseWrapper = allBoseLogos[i].closest('.logo-wrapper');
                if (extraBoseWrapper) {
                    extraBoseWrapper.remove();
                }
            }
        }
    });
    
    console.log('BMW Logo hinzugefügt und Bose Logo verschoben');
}
