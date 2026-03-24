// ===== ZUSÄTZLICHES LOGO HINZUFÜGEN =====
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        addAdditionalLogo();
    }, 3000); // Länger warten, damit andere Scripts zuerst laufen
});

function addAdditionalLogo() {
    console.log('Füge zusätzliches Logo hinzu...');
    
    // Warte nochmal kurz, damit andere Scripts fertig sind
    setTimeout(function() {
        const logoWrappers = document.querySelectorAll('.logos-wrappr');
        
        if (logoWrappers.length === 0) {
            console.log('Keine Logo-Wrapper gefunden, versuche es später...');
            setTimeout(addAdditionalLogo, 1000);
            return;
        }
        
        logoWrappers.forEach(function(wrapper) {
            // Prüfe, ob das Logo bereits existiert
            const existingLogos = wrapper.querySelectorAll('img[src*="ChatGPT Image 25. Aug. 2025, 15_35_59.png"]');
            if (existingLogos.length === 0) {
                // Erstelle neues Logo-Wrapper Element
                const newLogoWrapper = document.createElement('div');
                newLogoWrapper.className = 'logo-wrapper';
                newLogoWrapper.innerHTML = `
                    <img src="Assets/ChatGPT Image 25. Aug. 2025, 15_35_59.png" loading="lazy" alt=""/>
                    <img src="67f92ecb810080d9cf6352e7_tl-svg.svg" loading="lazy" alt="" class="top-left-corner"/>
                    <img src="67f92ecb810080d9cf6352e7_tl-svg.svg" loading="lazy" alt="" class="top-right-corner"/>
                    <img src="67f92ecb810080d9cf6352e7_tl-svg.svg" loading="lazy" alt="" class="bottom-left-corner"/>
                    <img src="67f92ecb810080d9cf6352e7_tl-svg.svg" loading="lazy" alt="" class="bottom-right-corner"/>
                `;
                
                // Füge das neue Logo am Ende hinzu
                wrapper.appendChild(newLogoWrapper);
                console.log('Neues Logo zu Wrapper hinzugefügt');
            }
        });
        
        console.log('Zusätzliches Logo erfolgreich hinzugefügt');
    }, 1000);
}
