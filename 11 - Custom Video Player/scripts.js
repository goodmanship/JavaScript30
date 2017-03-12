const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? 'II' : 'v';
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset);
  video.currentTime += parseFloat(this.dataset.skip);
}

function rangeHandler() {
  video[this.name] = this.value;
}

function handleProgress() {
  const pct = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${pct}%`;
}

function scrub(e) {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(b => b.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', rangeHandler));

let mousing = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousing && scrub(e));
progress.addEventListener('mousedown', () => mousing = true);
progress.addEventListener('mouseup', () => mousing = false);