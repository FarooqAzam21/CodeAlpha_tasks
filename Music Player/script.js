const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const coverEl = document.getElementById('cover');

const progressEl = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const volumeEl = document.getElementById('volume');
const autoplayEl = document.getElementById('autoplay');
const playlistEl = document.getElementById('playlist');
const searchBox = document.getElementById('searchBox');

const tracks = [
  { src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", title: "Sunrise Drive", artist: "SoundHelix" },
  { src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", title: "Evening Road", artist: "SoundHelix" },
  { src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", title: "Ocean Breeze", artist: "SoundHelix" },
  { src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", title: "Midnight City", artist: "SoundHelix" }
];

let currentIndex = 0;
let isPlaying = false;


function formatTime(sec){
  if (!sec || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2,"0");
  return `${m}:${s}`;
}


function renderPlaylist(){
  playlistEl.innerHTML = "";
  tracks.forEach((t, i) => {
    const li = document.createElement("li");
    li.dataset.index = i;
    li.innerHTML = `<span>${t.title}</span><span id="dur-${i}">--:--</span>`;
    li.addEventListener("click", () => {
      loadTrack(i);
      playTrack();
    });
    playlistEl.appendChild(li);

    const probe = new Audio(t.src);
    probe.addEventListener("loadedmetadata", () => {
      document.getElementById(`dur-${i}`).textContent = formatTime(probe.duration);
    });
  });
}

function loadTrack(i){
  if (i < 0) i = tracks.length - 1;
  if (i >= tracks.length) i = 0;
  currentIndex = i;
  audio.src = tracks[i].src;
  titleEl.textContent = tracks[i].title;
  artistEl.textContent = tracks[i].artist;

  document.querySelectorAll("#playlist li").forEach(li => li.classList.remove("active"));
  const activeLi = document.querySelector(`#playlist li[data-index="${i}"]`);
  if (activeLi) activeLi.classList.add("active");
}
function playTrack(){ audio.play(); isPlaying = true; playBtn.textContent = "⏸"; }
function pauseTrack(){ audio.pause(); isPlaying = false; playBtn.textContent = "▶️"; }

playBtn.addEventListener("click", () => { isPlaying ? pauseTrack() : playTrack(); });
prevBtn.addEventListener("click", () => { loadTrack(currentIndex-1); playTrack(); });
nextBtn.addEventListener("click", () => { loadTrack(currentIndex+1); playTrack(); });

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progressEl.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});
audio.addEventListener("loadedmetadata", () => { durationEl.textContent = formatTime(audio.duration); });
audio.addEventListener("ended", () => {
  if (autoplayEl.checked) { loadTrack(currentIndex+1); playTrack(); } 
  else { pauseTrack(); audio.currentTime = 0; }
});

progressEl.addEventListener("input", e => {
  audio.currentTime = (parseFloat(e.target.value)/100) * audio.duration;
});
volumeEl.addEventListener("input", e => audio.volume = parseFloat(e.target.value));
searchBox.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const items = playlistEl.querySelectorAll("li");

  items.forEach(li => {
    const title = li.querySelector("span").textContent.toLowerCase();
    li.style.display = title.includes(query) ? "flex" : "none";
  });
});
renderPlaylist();
loadTrack(0);
