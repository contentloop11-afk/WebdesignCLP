// ===== SKILLS OVERLAY IMPLEMENTATION =====

document.addEventListener('DOMContentLoaded', function() {
    // Warte bis die Seite vollständig geladen ist
    setTimeout(function() {
        insertSkillsOverlay();
    }, 2000);
});

function insertSkillsOverlay() {
    console.log('Suche nach Work History Bereich...');
    
    // Suche nach dem Work History Bereich
    let workHistorySection = null;
    
    // Strategie 1: Suche nach "work history" Text
    const workHistoryHeadings = Array.from(document.querySelectorAll('h2')).filter(h2 => 
        h2.textContent.toLowerCase().includes('work history')
    );
    
    if (workHistoryHeadings.length > 0) {
        console.log('Work History Überschrift gefunden');
        workHistorySection = workHistoryHeadings[0].closest('.section');
    }
    
    // Strategie 2: Suche nach section mit work history
    if (!workHistorySection) {
        const sections = document.querySelectorAll('.section');
        for (let section of sections) {
            if (section.textContent.toLowerCase().includes('work history')) {
                workHistorySection = section;
                console.log('Work History Section gefunden');
                break;
            }
        }
    }
    
    if (workHistorySection) {
        console.log('✅ Work History Bereich gefunden, füge Skills-Overlay ein...');
        
        // Erstelle die Skills-Overlay-Sektion
        const skillsOverlay = createSkillsOverlay();
        
        // Füge die Skills-Overlay nach dem Work History Bereich ein
        workHistorySection.parentNode.insertBefore(skillsOverlay, workHistorySection.nextSibling);
        
        console.log('✅ Skills-Overlay erfolgreich eingefügt!');
    } else {
        console.error('❌ Work History Bereich nicht gefunden!');
        // Fallback: Füge vor dem Footer hinzu
        const footer = document.querySelector('.footer');
        if (footer) {
            const skillsOverlay = createSkillsOverlay();
            footer.parentNode.insertBefore(skillsOverlay, footer);
            console.log('✅ Skills-Overlay vor Footer eingefügt!');
        } else {
            // Letzter Fallback: Am Ende der Seite
            const body = document.body;
            const skillsOverlay = createSkillsOverlay();
            body.appendChild(skillsOverlay);
            console.log('✅ Skills-Overlay als Fallback am Ende eingefügt!');
        }
    }
}

function createSkillsOverlay() {
    const skillsHTML = `
        <section class="skills-overlay-section">
            <div class="skills-overlay-container">
                <div class="skills-overlay-header">
                    <h2 class="skills-overlay-title">Skills & Expertise</h2>
                    <p class="skills-overlay-subtitle">Meine Kernkompetenzen im kreativen Bereich</p>
                </div>
                
                <div class="skills-overlay-grid">
                  <div class="skills-marquee-track">
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/contentcreation.gif" alt="Content Creation">
                        </div>
                        <h3 class="skill-overlay-label">Content Creation</h3>
                    </div>
                    
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/Liquid_3.gif" alt="Brand Development">
                        </div>
                        <h3 class="skill-overlay-label">Brand Development</h3>
                    </div>
                    
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/Pixels_Outline_Icon.gif" alt="Digital Design">
                        </div>
                        <h3 class="skill-overlay-label">Digital Design</h3>
                    </div>
                    
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/Horizontal_Bars.gif" alt="Video Editing">
                        </div>
                        <h3 class="skill-overlay-label">Video Editing</h3>
                    </div>
                    
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/Lights_Icon.gif" alt="AI-Automation">
                        </div>
                        <h3 class="skill-overlay-label">AI-Automation</h3>
                    </div>
                    
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/Flat_Globe_Icon.gif" alt="Research">
                        </div>
                        <h3 class="skill-overlay-label">Research</h3>
                    </div>
                    
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/Orbit_Globe_Icon.gif" alt="Illustration">
                        </div>
                        <h3 class="skill-overlay-label">Illustration</h3>
                    </div>
                    
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/Design_ohne_Titel.gif" alt="Personal Branding">
                        </div>
                        <h3 class="skill-overlay-label">Personal Branding</h3>
                    </div>
                    
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/grading.gif" alt="Color Grading">
                        </div>
                        <h3 class="skill-overlay-label">Color Grading</h3>
                    </div>
                    
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/cinemato.gif" alt="Cinematography">
                        </div>
                        <h3 class="skill-overlay-label">Cinematography</h3>
                    </div>
                    
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/soudnesign.gif" alt="Sound Design">
                        </div>
                        <h3 class="skill-overlay-label">Sound Design</h3>
                    </div>
                    
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/prompting.gif" alt="Prompt Engineering">
                        </div>
                        <h3 class="skill-overlay-label">Prompt Engineering</h3>
                    </div>
                    <!-- Duplikat der 12 Elemente für endlose Schleife -->
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/contentcreation.gif" alt="Content Creation">
                        </div>
                        <h3 class="skill-overlay-label">Content Creation</h3>
                    </div>
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/Liquid_3.gif" alt="Brand Development">
                        </div>
                        <h3 class="skill-overlay-label">Brand Development</h3>
                    </div>
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/Pixels_Outline_Icon.gif" alt="Digital Design">
                        </div>
                        <h3 class="skill-overlay-label">Digital Design</h3>
                    </div>
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/Horizontal_Bars.gif" alt="Video Editing">
                        </div>
                        <h3 class="skill-overlay-label">Video Editing</h3>
                    </div>
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/Lights_Icon.gif" alt="AI-Automation">
                        </div>
                        <h3 class="skill-overlay-label">AI-Automation</h3>
                    </div>
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/Flat_Globe_Icon.gif" alt="Research">
                        </div>
                        <h3 class="skill-overlay-label">Research</h3>
                    </div>
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/Orbit_Globe_Icon.gif" alt="Illustration">
                        </div>
                        <h3 class="skill-overlay-label">Illustration</h3>
                    </div>
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/Design_ohne_Titel.gif" alt="Personal Branding">
                        </div>
                        <h3 class="skill-overlay-label">Personal Branding</h3>
                    </div>
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/grading.gif" alt="Color Grading">
                        </div>
                        <h3 class="skill-overlay-label">Color Grading</h3>
                    </div>
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/cinemato.gif" alt="Cinematography">
                        </div>
                        <h3 class="skill-overlay-label">Cinematography</h3>
                    </div>
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/soudnesign.gif" alt="Sound Design">
                        </div>
                        <h3 class="skill-overlay-label">Sound Design</h3>
                    </div>
                    <div class="skill-overlay-card">
                        <div class="skill-overlay-media">
                            <img src="footage/prompting.gif" alt="Prompt Engineering">
                        </div>
                        <h3 class="skill-overlay-label">Prompt Engineering</h3>
                    </div>
                  </div>
                </div>
            </div>
        </section>
    `;
    
    // Erstelle ein temporäres Element um den HTML-String zu parsen
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = skillsHTML;
    const el = tempDiv.firstElementChild;
    el.id = 'skills-anchor';
    return el;
}
