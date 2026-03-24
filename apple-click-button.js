// Apple-minimalistischer Click Me Button für Media Markt x Bose Projekt
document.addEventListener('DOMContentLoaded', function() {
    // Finde das Media Markt x Bose Projekt
    const mediaMarktProject = document.querySelector('.projects-collection-item h3');
    
    if (mediaMarktProject && mediaMarktProject.textContent.includes('Media Markt x Bose')) {
        const projectContainer = mediaMarktProject.closest('.projects-collection-item');
        
        // Erstelle den Apple-minimalistischen Button
        const clickButton = document.createElement('a');
        clickButton.href = 'https://youtu.be/3Y5cQKsLsiA?si=sQzl6A8b5pXwKC-L';
        clickButton.target = '_blank';
        clickButton.rel = 'noopener noreferrer';
        clickButton.className = 'apple-click-button';
        clickButton.textContent = 'Click Me';
        clickButton.title = 'Schau dir das Media Markt x Bose Video an';
        
        // Füge den Button zum Projekt-Container hinzu
        projectContainer.appendChild(clickButton);
        
        console.log('Apple Click Me Button wurde zum Media Markt x Bose Projekt hinzugefügt');
    }
});
