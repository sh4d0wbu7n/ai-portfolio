function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}
const videoId = getQueryParam('id');
fetch('data/videos.json')
  .then(res => res.json())
  .then(videos => {
    const video = videos.find(v => String(v.id) === String(videoId));
    if (!video) {
      document.getElementById('videoTitle').textContent = 'Video Not Found';
      document.getElementById('fullVideo').style.display = 'none';
      document.getElementById('videoDescription').textContent = '';
      return;
    }
    document.getElementById('videoTitle').textContent = video.title;
    const vid = document.getElementById('fullVideo');
    vid.src = `videos/${video.full}`;
    vid.poster = '';
    document.getElementById('videoDescription').textContent = video.description;
    // Render structured content blocks if present
    const container = document.getElementById('videoContent');
    container.innerHTML = '';
    if (Array.isArray(video.content)) {
      video.content.forEach(block => {
        if (!block || !block.type) return;
        switch (block.type) {
          case 'heading': {
            const level = Math.min(Math.max(parseInt(block.level || 2, 10), 2), 4); // h2-h4
            const el = document.createElement(`h${level}`);
            el.textContent = block.text || '';
            container.appendChild(el);
            break;
          }
          case 'paragraph': {
            const p = document.createElement('p');
            p.textContent = block.text || '';
            container.appendChild(p);
            break;
          }
          case 'image': {
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            img.src = block.src || '';
            img.alt = block.alt || '';
            figure.appendChild(img);
            if (block.caption) {
              const figcap = document.createElement('figcaption');
              figcap.textContent = block.caption;
              figure.appendChild(figcap);
            }
            container.appendChild(figure);
            break;
          }
          default:
            break;
        }
      });
    }
    // Add: Enable loop after user starts playback
    vid.addEventListener('play', function enableLoopOnce() {
      vid.loop = true;
      vid.removeEventListener('play', enableLoopOnce);
    });
  });