// ===== SKILLS SECTION IMPLEMENTATION =====

document.addEventListener('DOMContentLoaded', function() {
    // Warte bis die Seite vollständig geladen ist
    setTimeout(function() {
        insertSkillsSection();
    }, 2000);
});

function insertSkillsSection() {
    console.log('Suche nach Work History Bereich...');
    
    // Suche nach dem Work History Bereich (nach "5k+ Online Sales")
    let workHistorySection = null;
    
    // Strategie 1: Suche nach "work history" Text
    const workHistoryHeadings = Array.from(document.querySelectorAll('h2')).filter(h2 => 
        h2.textContent.toLowerCase().includes('work history')
    );
    
    if (workHistoryHeadings.length > 0) {
        console.log('Work History Überschrift gefunden');
        workHistorySection = workHistoryHeadings[0].closest('.section');
    }
    
    // Strategie 2: Suche nach der section mit "5k+" Statistik
    if (!workHistorySection) {
        const statsElements = Array.from(document.querySelectorAll('*')).filter(el => 
            el.textContent.includes('5k+')
        );
        if (statsElements.length > 0) {
            workHistorySection = statsElements[0].closest('.section');
            console.log('Stats Section gefunden');
        }
    }
    
    if (workHistorySection) {
        console.log('✅ Work History Bereich gefunden, füge Skills-Sektion ein...');
        
        // Erstelle die Skills-Sektion
        const skillsSection = createSkillsSection();
        
        // Füge die Skills-Sektion nach dem Work History Bereich ein
        workHistorySection.parentNode.insertBefore(skillsSection, workHistorySection.nextSibling);
        
        console.log('✅ Skills-Sektion erfolgreich eingefügt!');
    } else {
        console.error('❌ Work History Bereich nicht gefunden!');
        // Fallback: Füge am Ende der Seite hinzu
        const body = document.body;
        const skillsSection = createSkillsSection();
        body.appendChild(skillsSection);
        console.log('✅ Skills-Sektion als Fallback am Ende eingefügt!');
    }
}

function createSkillsSection() {
    const skillsHTML = `
        <section class="skills-section">
            <div class="skills-container">
                <div class="skills-header">
                    <h2 class="skills-title">Skills & Expertise</h2>
                    <p class="skills-subtitle">Meine Kernkompetenzen im kreativen Bereich</p>
                </div>
                
                <div class="skills-grid">
                    <div class="skill-card">
                        <div class="skill-media">
                            <img src="footage/contentcreation.gif" alt="Content Creation">
                        </div>
                        <div class="skill-content">
                            <span class="skill-icon">🎬</span>
                            <h3 class="skill-label">Content Creation</h3>
                        </div>
                    </div>
                    
                    <div class="skill-card">
                        <div class="skill-media">
                            <img src="footage/Liquid_3.gif" alt="Brand Development">
                        </div>
                        <div class="skill-content">
                            <span class="skill-icon">✳️</span>
                            <h3 class="skill-label">Brand Development</h3>
                        </div>
                    </div>
                    
                    <div class="skill-card">
                        <div class="skill-media">
                            <img src="footage/Pixels_Outline_Icon.gif" alt="Digital Design">
                        </div>
                        <div class="skill-content">
                            <span class="skill-icon">◻️</span>
                            <h3 class="skill-label">Digital Design</h3>
                        </div>
                    </div>
                    
                    <div class="skill-card">
                        <div class="skill-media">
                            <img src="footage/Horizontal_Bars.gif" alt="Video Editing">
                        </div>
                        <div class="skill-content">
                            <span class="skill-icon">🎞️</span>
                            <h3 class="skill-label">Video Editing</h3>
                        </div>
                    </div>
                    
                    <div class="skill-card">
                        <div class="skill-media">
                            <img src="footage/Lights_Icon.gif" alt="AI-Automation">
                        </div>
                        <div class="skill-content">
                            <span class="skill-icon">🤖</span>
                            <h3 class="skill-label">AI-Automation</h3>
                        </div>
                    </div>
                    
                    <div class="skill-card">
                        <div class="skill-media">
                            <img src="footage/Flat_Globe_Icon.gif" alt="Research">
                        </div>
                        <div class="skill-content">
                            <span class="skill-icon">🔎</span>
                            <h3 class="skill-label">Research</h3>
                        </div>
                    </div>
                    
                    <div class="skill-card">
                        <div class="skill-media">
                            <img src="footage/Orbit_Globe_Icon.gif" alt="Illustration">
                        </div>
                        <div class="skill-content">
                            <span class="skill-icon">🖊️</span>
                            <h3 class="skill-label">Illustration</h3>
                        </div>
                    </div>
                    
                    <div class="skill-card">
                        <div class="skill-media">
                            <img src="footage/Design_ohne_Titel.gif" alt="Personal Branding">
                        </div>
                        <div class="skill-content">
                            <span class="skill-icon">👤</span>
                            <h3 class="skill-label">Personal Branding</h3>
                        </div>
                    </div>
                    
                    <div class="skill-card">
                        <div class="skill-media">
                            <img src="footage/grading.gif" alt="Color Grading">
                        </div>
                        <div class="skill-content">
                            <span class="skill-icon">🌈</span>
                            <h3 class="skill-label">Color Grading</h3>
                        </div>
                    </div>
                    
                    <div class="skill-card">
                        <div class="skill-media">
                            <img src="footage/cinemato.gif" alt="Cinematography">
                        </div>
                        <div class="skill-content">
                            <span class="skill-icon">🎥</span>
                            <h3 class="skill-label">Cinematography</h3>
                        </div>
                    </div>
                    
                    <div class="skill-card">
                        <div class="skill-media">
                            <img src="footage/soudnesign.gif" alt="Sound Design">
                        </div>
                        <div class="skill-content">
                            <span class="skill-icon">🔊</span>
                            <h3 class="skill-label">Sound Design</h3>
                        </div>
                    </div>
                    
                    <div class="skill-card">
                        <div class="skill-media">
                            <img src="footage/prompting.gif" alt="Prompt Engineering">
                        </div>
                        <div class="skill-content">
                            <span class="skill-icon">⌨️</span>
                            <h3 class="skill-label">Prompt Engineering</h3>
                        </div>
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
