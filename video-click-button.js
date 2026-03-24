// Hover Video Animation für AI-Silhouettes Projekt
document.addEventListener('DOMContentLoaded', function() {
    // Finde das AI-Silhouettes Projekt
    const silhouetteProject = document.querySelector('.projects-collection-item h3');
    
    if (silhouetteProject && silhouetteProject.textContent.includes('Silhouette')) {
        const projectContainer = silhouetteProject.closest('.projects-collection-item');
        const hoverVideo = projectContainer.querySelector('.hover-video');
        
        console.log('AI-Silhouettes Projekt gefunden:', projectContainer);
        console.log('Video-Element gefunden:', hoverVideo);
        
        if (hoverVideo) {
            // Video laden und testen
            hoverVideo.addEventListener('loadeddata', function() {
                console.log('Video erfolgreich geladen!');
            });
            
            hoverVideo.addEventListener('error', function(e) {
                console.error('Video-Fehler:', e);
            });
            
            // Hover-Events
            projectContainer.addEventListener('mouseenter', function() {
                console.log('Mouse Enter - Video starten');
                hoverVideo.style.opacity = '1';
                hoverVideo.play().then(() => {
                    console.log('Video erfolgreich gestartet');
                }).catch(e => {
                    console.error('Video konnte nicht gestartet werden:', e);
                });
            });
            
            projectContainer.addEventListener('mouseleave', function() {
                console.log('Mouse Leave - Video stoppen');
                hoverVideo.style.opacity = '0';
                hoverVideo.pause();
                hoverVideo.currentTime = 0;
            });
            
            // Erstelle den Click-Button (bleibt bestehen)
            const videoButton = document.createElement('button');
            videoButton.className = 'video-click-button';
            videoButton.textContent = 'Play Video';
            videoButton.title = 'Schau dir das AI-Silhouettes Video an';
            
            // Füge den Button zum Projekt-Container hinzu
            projectContainer.appendChild(videoButton);
            
            // Erstelle das Video-Modal für den Click-Button
            const videoModal = document.createElement('div');
            videoModal.className = 'video-modal';
            videoModal.innerHTML = `
                <div class="video-modal-content">
                    <span class="video-modal-close">&times;</span>
                    <video controls autoplay>
                        <source src="Assets/social_u9363215276__--ar_23_--video_1_--end_loop_4d0bc429-d394-4cfd-b5ce-c70def6565b7_2.mp4" type="video/mp4">
                        Ihr Browser unterstützt keine Video-Wiedergabe.
                    </video>
                </div>
            `;
            document.body.appendChild(videoModal);
            
            // Click-Button Event Listeners
            videoButton.addEventListener('click', function() {
                videoModal.style.display = 'flex';
                const video = videoModal.querySelector('video');
                video.play();
            });
            
            videoModal.querySelector('.video-modal-close').addEventListener('click', function() {
                videoModal.style.display = 'none';
                const video = videoModal.querySelector('video');
                video.pause();
            });
            
            videoModal.addEventListener('click', function(e) {
                if (e.target === videoModal) {
                    videoModal.style.display = 'none';
                    const video = videoModal.querySelector('video');
                    video.pause();
                }
            });
            
            console.log('Hover Video Animation wurde zum AI-Silhouettes Projekt hinzugefügt');
        } else {
            console.error('Video-Element nicht gefunden!');
        }
    } else {
        console.log('AI-Silhouettes Projekt nicht gefunden');
    }
});
