// ===== KUNDENSTIMMEN AKTUALISIEREN =====
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        updateTestimonials();
    }, 1000);
});

function updateTestimonials() {
    console.log('Aktualisiere Kundenstimmen...');
    
    // Finde alle testimonial-wrapper Elemente
    const testimonialWrappers = document.querySelectorAll('.testimonial-wrapper');
    
    // Erstelle alle 4 Kundenstimmen dynamisch
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    
    if (testimonialsGrid) {
        // Lösche alle bestehenden Kundenstimmen
        testimonialsGrid.innerHTML = '';
        
        // Erste Kundenstimme: Ahmet Bannout
        const firstTestimonial = document.createElement('div');
        firstTestimonial.className = 'testimonial-wrapper';
        firstTestimonial.innerHTML = `
            <img src="Assets/Bildschirmfoto 2025-08-25 um 17.00.40.png" loading="lazy" alt="Ahmet Bannout" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 15px;"/>
            <h3 class="grey-text">hear from people i worked with</h3>
            <p class="testimonial-text">Die Zusammenarbeit mit Lars war einfach fantastisch. Jeder Dreh war ein Erlebnis und die Arbeit fühlte sich nie wie Arbeit an. Die Videos für meine Drohnenreinigung haben mir geholfen, mein Business auf das nächste Level zu bringen und Kunden für meine Masterclass zu gewinnen. Absolute Empfehlung!</p>
            <p>Ahmet Bannout</p>
            <p>Drohnenreinigung & Gebäudereinigung</p>
        `;
        testimonialsGrid.appendChild(firstTestimonial);
        
        // Zweite Kundenstimme: Ole Belisar
        const secondTestimonial = document.createElement('div');
        secondTestimonial.className = 'testimonial-wrapper';
        secondTestimonial.innerHTML = `
            <img src="Assets/Bildschirmfoto 2025-08-25 um 17.06.08.png" loading="lazy" alt="Ole Belisar" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 15px;"/>
            <h3 class="grey-text">hear from people i worked with</h3>
            <p class="testimonial-text">Lars hat mir die Social Media Welt komplett neu eröffnet. Seine Expertise war der Grundstein für meinen Erfolg. Die ersten Videos, die wir zusammen erstellt haben, haben mir den Einstieg enorm erleichtert. Durch seine Schulungen habe ich gelernt, wie man authentischen Content kreiert. Ein echter Gamechanger!</p>
            <p>Ole Belisar</p>
            <p>Fitness-Coach</p>
        `;
        testimonialsGrid.appendChild(secondTestimonial);
        
        // Dritte Kundenstimme: Darian Wiegand
        const thirdTestimonial = document.createElement('div');
        thirdTestimonial.className = 'testimonial-wrapper';
        thirdTestimonial.innerHTML = `
            <img src="Assets/bild darian.jpg" loading="lazy" alt="Darian Wiegand" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 15px;"/>
            <h3 class="grey-text">hear from people i worked with</h3>
            <p class="testimonial-text">Von der ersten Sekunde an war ich begeistert. Lars hat mir eine klare Vision gegeben, wie sich mein Social Media in einem Jahr entwickeln kann. Der Beweis: Innerhalb eines Jahres habe ich 15.000 Abonnenten gewonnen. Das zeigt, was die richtige Partnerschaft bewirken kann.</p>
            <p>Darian Wiegand</p>
            <p>DW Coaching</p>
        `;
        testimonialsGrid.appendChild(thirdTestimonial);
        
        // Vierte Kundenstimme: Gregor Schade
        const fourthTestimonial = document.createElement('div');
        fourthTestimonial.className = 'testimonial-wrapper';
        fourthTestimonial.innerHTML = `
            <img src="Assets/Bildschirmfoto 2025-08-25 um 16.59.12.png" loading="lazy" alt="Gregor Schade" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 15px;"/>
            <h3 class="grey-text">hear from people i worked with</h3>
            <p class="testimonial-text">Die Videos, die Lars erstellt, sind durchweg von außergewöhnlicher Qualität. Man spürt seine kreative Leidenschaft in jedem Frame. Unsere Kunden sind begeistert von der emotionalen Tiefe, die er durch Bild, Ton und Video transportiert. Echte Emotionen, die ankommen.</p>
            <p>Gregor Schade</p>
            <p>Content Creator</p>
        `;
        testimonialsGrid.appendChild(fourthTestimonial);
        
        console.log('Alle 4 Kundenstimmen erfolgreich erstellt');
    }
    
    console.log('Kundenstimmen erfolgreich aktualisiert');
}
