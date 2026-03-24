// ===== WORK HISTORY STATISTIKEN AKTUALISIEREN =====
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        updateWorkHistoryStats();
    }, 1000);
});

function updateWorkHistoryStats() {
    console.log('Aktualisiere Work History Statistiken...');
    
    // Finde alle stat-grid Elemente
    const statGrids = document.querySelectorAll('.stat-grid');
    
    statGrids.forEach(function(grid, index) {
        const largeStat = grid.querySelector('.large-stat');
        const statCopy = grid.querySelector('.stat-copy');
        
        if (largeStat && statCopy) {
            const h4Elements = statCopy.querySelectorAll('h4');
            
            if (index === 0) {
                // Erste Statistik: 300+ geschnittene videos / creative ads
                largeStat.textContent = '300+';
                if (h4Elements.length >= 2) {
                    h4Elements[0].textContent = 'geschnittene videos';
                    h4Elements[1].textContent = 'creative ads';
                }
                console.log('Statistik 1 aktualisiert: 300+ geschnittene videos / creative ads');
            } else if (index === 1) {
                // Zweite Statistik: 10+ kunden / hatte ich schon
                largeStat.textContent = '10+';
                if (h4Elements.length >= 2) {
                    h4Elements[0].textContent = 'kunden';
                    h4Elements[1].textContent = 'hatte ich schon';
                }
                console.log('Statistik 2 aktualisiert: 10+ kunden / hatte ich schon');
            } else if (index === 2) {
                // Dritte Statistik: 1M+ video views / with conversion
                largeStat.textContent = '1M+';
                if (h4Elements.length >= 2) {
                    h4Elements[0].textContent = 'video views';
                    h4Elements[1].textContent = 'with conversion';
                }
                console.log('Statistik 3 aktualisiert: 1M+ video views / with conversion');
            }
        }
    });
    
    console.log('Work History Statistiken erfolgreich aktualisiert');
}
