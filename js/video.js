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
    // Add: Enable loop after user starts playback
    vid.addEventListener('play', function enableLoopOnce() {
      vid.loop = true;
      vid.removeEventListener('play', enableLoopOnce);
    });
  });