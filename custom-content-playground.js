// ===== ISOLIERTER SPIELPLATZ FÜR ZUSÄTZLICHEN CONTENT =====

document.addEventListener('DOMContentLoaded', function() {
    // Warte bis die Seite vollständig geladen ist
    setTimeout(function() {
        insertPlaygroundArea();
    }, 2000); // Längere Wartezeit für bessere Kompatibilität
});

function insertPlaygroundArea() {
    console.log('Suche nach Store-Bereich...');
    
    // Suche nach dem Store-Bereich
    let storeSection = null;
    
    // Strategie 1: Suche nach "check out my store" Text
    const storeHeadings = Array.from(document.querySelectorAll('h2')).filter(h2 => 
        h2.textContent.toLowerCase().includes('store')
    );
    
    if (storeHeadings.length > 0) {
        console.log('Store Überschrift gefunden');
        // Suche nach der art-series-section die den Store enthält
        storeSection = storeHeadings[0].closest('.art-series-section');
    }
    
    // Strategie 2: Suche nach art-series-section
    if (!storeSection) {
        const artSeriesSections = document.querySelectorAll('.art-series-section');
        if (artSeriesSections.length > 0) {
            // Nehme die letzte art-series-section (wahrscheinlich der Store)
            storeSection = artSeriesSections[artSeriesSections.length - 1];
            console.log('Art Series Section gefunden');
        }
    }
    
    // Strategie 3: Suche nach "check out my store" Text in beliebigen Elementen
    if (!storeSection) {
        const storeElements = Array.from(document.querySelectorAll('*')).filter(el => 
            el.textContent.toLowerCase().includes('check out my store')
        );
        if (storeElements.length > 0) {
            storeSection = storeElements[0].closest('section') || storeElements[0].closest('.art-series-section');
            console.log('Store Element gefunden');
        }
    }
    
    if (storeSection) {
        console.log('✅ Store-Bereich gefunden, füge Skills-Bereich ein...');
        
        // Erstelle den Skills-Bereich
        const skillsSection = createSkillsSection();
        
        // Füge den Skills-Bereich vor dem Store-Bereich ein
        storeSection.parentNode.insertBefore(skillsSection, storeSection);
        
        console.log('✅ Skills-Bereich erfolgreich eingefügt!');
    } else {
        console.error('❌ Store-Bereich nicht gefunden!');
        // Fallback: Füge am Ende der Seite hinzu
        const body = document.body;
        const skillsSection = createSkillsSection();
        body.appendChild(skillsSection);
        console.log('✅ Skills-Bereich als Fallback am Ende eingefügt!');
    }
}

function createSkillsSection() {
    const skillsHTML = `
        <section class="playground-section">
            <div class="skills-container">
                <div class="skills-header">
                    <h2 class="skills-title">Skills & Expertise</h2>
                    <p class="skills-subtitle">Meine Kernkompetenzen im kreativen Bereich</p>
                </div>
                
                <div class="skills-grid">
                    <div class="skill-card">
                        <span class="skill-icon">🎬</span>
                        <h3 class="skill-title">Content Creation</h3>
                        <p class="skill-description">Erstellung von visuellen Inhalten für Social Media, Websites und Marketing-Kampagnen</p>
                    </div>
                    
                    <div class="skill-card">
                        <span class="skill-icon">✳️</span>
                        <h3 class="skill-title">Brand Development</h3>
                        <p class="skill-description">Entwicklung und Gestaltung von Markenidentitäten und Corporate Design</p>
                    </div>
                    
                    <div class="skill-card">
                        <span class="skill-icon">◻️</span>
                        <h3 class="skill-title">Digital Design</h3>
                        <p class="skill-description">UI/UX Design, Webdesign und digitale Benutzeroberflächen</p>
                    </div>
                    
                    <div class="skill-card">
                        <span class="skill-icon">🎞️</span>
                        <h3 class="skill-title">Video Editing</h3>
                        <p class="skill-description">Professionelle Videobearbeitung und Post-Production</p>
                    </div>
                    
                    <div class="skill-card">
                        <span class="skill-icon">🤖</span>
                        <h3 class="skill-title">AI-Automation</h3>
                        <p class="skill-description">Integration von KI-Tools für effiziente Workflows und Automatisierung</p>
                    </div>
                    
                    <div class="skill-card">
                        <span class="skill-icon">🔎</span>
                        <h3 class="skill-title">Research</h3>
                        <p class="skill-description">Marktanalyse, Trendforschung und strategische Planung</p>
                    </div>
                    
                    <div class="skill-card">
                        <span class="skill-icon">🖊️</span>
                        <h3 class="skill-title">Illustration</h3>
                        <p class="skill-description">Digitale Illustrationen und künstlerische Gestaltung</p>
                    </div>
                    
                    <div class="skill-card">
                        <span class="skill-icon">👤</span>
                        <h3 class="skill-title">Personal Branding</h3>
                        <p class="skill-description">Entwicklung von persönlichen Marken und Online-Präsenz</p>
                    </div>
                    
                    <div class="skill-card">
                        <span class="skill-icon">🌈</span>
                        <h3 class="skill-title">Color Grading</h3>
                        <p class="skill-description">Professionelle Farbkorrektur und Styling für Videos und Fotos</p>
                    </div>
                    
                    <div class="skill-card">
                        <span class="skill-icon">🎥</span>
                        <h3 class="skill-title">Cinematography</h3>
                        <p class="skill-description">Filmische Gestaltung und visuelle Storytelling-Techniken</p>
                    </div>
                    
                    <div class="skill-card">
                        <span class="skill-icon">🔊</span>
                        <h3 class="skill-title">Sound Design</h3>
                        <p class="skill-description">Audio-Bearbeitung und Sound-Design für Multimedia-Projekte</p>
                    </div>
                    
                    <div class="skill-card">
                        <span class="skill-icon">⌨️</span>
                        <h3 class="skill-title">Prompt Engineering</h3>
                        <p class="skill-description">Optimierung von KI-Prompts für beste Ergebnisse</p>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Erstelle ein temporäres Element um den HTML-String zu parsen
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = skillsHTML;
    
    return tempDiv.firstElementChild;
}
