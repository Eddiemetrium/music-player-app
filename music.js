const musicInfo = document.querySelector(".music-info");
const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector(".pause");
const backBtn = document.querySelector("#back");
const forwardBtn = document.querySelector("#forward");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const coverimg = document.querySelector(".album-art");
//song title
const songs = ["Gut Guitar Ver", "d.m.c", "faint", "I will be your home"];

//keep track of songs
let songIndex = 2;

//innitially load song info DOM
loadSong(songs[songIndex]);

//update load details
function loadSong(song) {
  title.innerHTML = song;
  audio.src = `music/${song}.mp3`;
  coverimg.src = `music/${song}.jpg`;
}
function playSong() {
  coverimg.classList.add("play");
  musicInfo.classList.remove("hide");
  playBtn.innerHTML = "Pause";
  audio.play();
}
function pauseSong() {
  coverimg.classList.remove("play");
  playBtn.innerHTML = "Play";
  musicInfo.classList.add("hide");
  audio.pause();
}
function prevSong() {
   songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  } 
  loadSong(songs[songIndex]);
  playSong();
}
function nextSong() {
   songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}
function setProgress(r) {
  const width = this.clientWidth;
  const clickX = r.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}
//event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = coverimg.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
//change songs
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
backBtn.addEventListener("click", prevSong);
forwardBtn.addEventListener("click", nextSong);
audio.addEventListener('ended', nextSong)
