// ===== BLOG-BILDER AKTUALISIEREN =====
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        updateBlogImages();
    }, 1000);
});

function updateBlogImages() {
    console.log('Aktualisiere Blog-Bilder...');
    
    // Blog Post 1: AI-Generated Art is More Than Just a Trend
    const blogImage1 = document.querySelector('img[src*="blog-post-1-tb.webp"]');
    if (blogImage1) {
        blogImage1.src = 'Assets/Bildschirmfoto 2025-08-25 um 19.05.25.png';
        blogImage1.srcset = 'Assets/Bildschirmfoto 2025-08-25 um 19.05.25.png';
        console.log('Blog Post 1 Bild aktualisiert');
    }
    
    // Blog Post 2: How to Prepare AI Art for Printing
    const blogImage2 = document.querySelector('img[src*="blog-post-2-tb.webp"]');
    if (blogImage2) {
        blogImage2.src = 'Assets/Bildschirmfoto 2025-08-25 um 19.04.41.png';
        blogImage2.srcset = 'Assets/Bildschirmfoto 2025-08-25 um 19.04.41.png';
        console.log('Blog Post 2 Bild aktualisiert');
    }
    
    // Blog Post 3: How AI and Humans Work Together
    const blogImage3 = document.querySelector('img[src*="blog-post-3-tb.jpeg"]');
    if (blogImage3) {
        blogImage3.src = 'Bildschirmfoto 2025-08-25 um 20.37.29.png';
        blogImage3.srcset = 'Bildschirmfoto 2025-08-25 um 20.37.29.png';
        console.log('Blog Post 3 Bild aktualisiert');
    }
    
    console.log('Alle Blog-Bilder erfolgreich aktualisiert');
}
