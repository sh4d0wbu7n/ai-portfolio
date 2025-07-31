fetch('data/videos.json')
  .then(res => res.json())
  .then(videos => {
    const grid = document.getElementById('videoGrid');
    videos.forEach(video => {
      const card = document.createElement('div');
      card.className = 'video-card';
      card.tabIndex = 0;
      card.innerHTML = `
        <video src="videos/${video.preview}" muted loop preload="metadata" poster="" playsinline></video>
        <div class="video-title">${video.title}</div>
      `;
      // Play on hover/tap
      const vid = card.querySelector('video');
      card.addEventListener('mouseover', () => vid.play());
      card.addEventListener('mouseout', () => { vid.pause(); vid.currentTime = 0; });
      card.addEventListener('touchstart', () => vid.play(), {passive:true});
      card.addEventListener('touchend', () => { vid.pause(); vid.currentTime = 0; }, {passive:true});
      // Navigate to detail page
      card.addEventListener('click', () => {
        window.location.href = `video.html?id=${video.id}`;
      });
      grid.appendChild(card);
    });
  });