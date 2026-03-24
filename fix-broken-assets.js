// Fix broken asset paths at runtime by swapping to existing local files
document.addEventListener('DOMContentLoaded', () => {
  const imageFallbacks = new Map([
    [
      'Assets/u9363215276_retro_analog_silhouette_portrait_of_a_young_man_p_fb339547-a6d7-4120-8d38-8b949ec16de5_3.png',
      '67c1d62d9f9c85a2d5167997_Crimson%20Contemplation_%20The%20Silhouette%20Profile.webp',
    ],
    [
      'Assets/ChatGPT Image 25. Aug. 2025, 15_35_59.png',
      'ChatGPT Image 23. Aug. 2025, 16_00_08.png',
    ],
    [
      'Assets/ChatGPT Image 22. Aug. 2025, 21_38_30.png',
      'ChatGPT Image 23. Aug. 2025, 16_00_08.png',
    ],
    ['Assets/image.png', 'maxresdefault.jpg'],
    ['Assets/image (1).png', 'maxresdefault.jpg'],
    ['Assets/image (2).png', 'maxresdefault.jpg'],
  ]);

  const videoFallbacks = new Map([
    [
      'Assets/social_u9363215276__--ar_23_--video_1_--end_loop_4d0bc429-d394-4cfd-b5ce-c70def6565b7_2.mp4',
      'hero-video-1.mp4',
    ],
  ]);

  // Generic fallbacks for whole folders
  const folderImageFallback = 'maxresdefault.jpg';
  const folderVideoFallback = 'hero-video-1.mp4';

  // Fix <img>
  document.querySelectorAll('img[src]').forEach((img) => {
    const src = img.getAttribute('src');
    if (!src) return;
    const swap = (oldSrc) => {
      const replacement = imageFallbacks.get(oldSrc) || folderImageFallback;
      if (img.getAttribute('src') !== replacement) {
        img.setAttribute('src', replacement);
      }
    };

    // immediate swap
    if (imageFallbacks.has(src) || src.startsWith('Assets/')) {
      swap(src);
    }

    // error-based swap (handles first 404 request)
    img.onerror = () => {
      swap(src);
    };
  });

  // Fix <source> inside <video>
  document.querySelectorAll('video source[src]').forEach((source) => {
    const src = source.getAttribute('src');
    if (!src) return;
    const swap = (oldSrc) => {
      const replacement = videoFallbacks.get(oldSrc) || folderVideoFallback;
      if (source.getAttribute('src') !== replacement) {
        source.setAttribute('src', replacement);
        const video = source.closest('video');
        if (video) {
          try { video.load(); } catch (_) {}
        }
      }
    };

    // immediate swap
    if (videoFallbacks.has(src) || src.startsWith('Assets/')) {
      swap(src);
    }

    // error-based swap
    const videoEl = source.closest('video');
    if (videoEl) {
      videoEl.addEventListener('error', () => swap(src), { once: true });
    }
  });
});


