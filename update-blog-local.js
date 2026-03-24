document.addEventListener('DOMContentLoaded', () => {
  try {
    // 1. Update "read this post" text to "Lies diesen Beitrag"
    const promptTexts = document.querySelectorAll('.prompt-text');
    promptTexts.forEach(function(text) {
        if (text.textContent.trim().toLowerCase() === 'read this post') {
            text.textContent = 'Lies diesen Beitrag';
        }
    });

    const blogGrid = document.querySelector('.blog-post-grid');
    if (!blogGrid) return;

    const cards = blogGrid.querySelectorAll('.blog-collection-item');

    // Card 1: Hidden Gems
    if (cards[0]) {
        const link = cards[0].querySelector('a.blog-thumbnail-link');
        if (link) link.setAttribute('href', 'blog/hidden-gems-oldenburg.html');

        const titleEl = cards[0].querySelector('.blog-thumbnail-content h3');
        if (titleEl) titleEl.textContent = 'Hidden Gems in Oldenburg';

        const teaserEl = cards[0].querySelector('.blog-thumbnail-content p');
        if (teaserEl) teaserEl.textContent = 'Mit meiner Freundin entdecke ich Oldenburg abseits der Maps: Hinterhöfe, Kanalufer, vergessene Ecken – perfekte Spots für Fotos und Stories. Klick rein für die Geheimtipps!';
    }

    // Card 2: Langeweile
    if (cards[1]) {
      const l2 = cards[1].querySelector('a.blog-thumbnail-link');
      if (l2) l2.setAttribute('href', 'blog/prepare-ai-art-printing.html');
      
      const title2 = cards[1].querySelector('.blog-thumbnail-content h3');
      if (title2) title2.textContent = 'Kreativität kommt nach der Langeweile';
      
      const teaser2 = cards[1].querySelector('.blog-thumbnail-content p');
      if (teaser2) teaser2.textContent = 'Warum wir oft erst dann wirklich kreativ werden, wenn wir uns langweilen.';
    }

    // Card 3: FPV Drohnen
    if (cards[2]) {
      const l3 = cards[2].querySelector('a.blog-thumbnail-link');
      if (l3) l3.setAttribute('href', 'blog/ai-and-humans-work-together.html');
      
      const title3 = cards[2].querySelector('.blog-thumbnail-content h3');
      if (title3) title3.textContent = 'FPV-Drohnenfliegen: Wie es mein Leben verändert hat';
      
      const teaser3 = cards[2].querySelector('.blog-thumbnail-content p');
      if (teaser3) teaser3.textContent = 'Die Out-of-Body Experience, wenn man freiwillig zum Vogel wird.';
    }
    
    console.log('Blog content updated successfully via update-blog-local.js');

  } catch (e) {
    console.error('update-blog-local error', e);
  }
});


