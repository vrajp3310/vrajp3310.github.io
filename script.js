const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const listBtn = document.getElementById('list');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ['Bank Account', 'Blinding Lights', 'One Dance'];

let songIndex = 1;

loadSong(songs[songIndex]);


// function showSong() {

//     listBtn.querySelector('i.fas').classList.onclick('fa-list');
//     for(var i=0;i<songIndex.length;i++){
//         document.write("<b>songIndex["+i+"] is </b>=>"+songs[i]+"<br>");
//     }
    
// }




function loadSong(song) {
  title.innerText = song;
  audio.src = `songs/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
//   listBtn.querySelector('i.fas').classList
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

// Night Sky element

const $el = document.body;

// Generate a random number between min and max values

const genRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

// Generate a star <div>

const genStar = () => {
    const star = document.createElement("div");
    star.classList.add("star");

    // Gen star coordinates relative to $el size
    let x = genRandomNumber(1, $el.offsetWidth);
    let y = genRandomNumber(1, $el.offsetHeight);

    const { style } = star;
    
    style.left = Math.floor(x) + "px";
    style.top = Math.floor(y) + "px";

    style.setProperty(
        "--star-size",
        genRandomNumber(1, 3) + "px"
    );

    style.setProperty(
        "--twinkle-duration",
        Math.ceil(genRandomNumber(1, 5)) + "s"
    );

    style.setProperty(
        "--twinkle-delay",
        Math.ceil(genRandomNumber(1, 5)) + "s"
    );

    return star;
}

for (let index = 0; index < 800; index++) {
    $el.append(genStar());
}