"use strict";

let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("myProgressBar");
let gifImage = document.querySelector(".gif");
let gifImage2 = document.querySelectorAll(".gif2");
let first = document.querySelector(".first");
let songsItems = Array.from(document.querySelectorAll(".song-item"));
let songItemPlay = document.querySelectorAll(".songItemPlay");
let previousBtn = document.getElementById("previous-btn");
let nextBtn = document.getElementById("next-btn");
let songIndex = 1;
let masterSongName = document.getElementById("masterSongName");
let audioElement = new Audio(`songs/${songIndex}.mp3`);
let time = document.querySelector(".time");
let currentTiming = document.getElementById("currentTime");
let durationTiming = document.getElementById("duration");
let songTime = document.querySelectorAll(".song-time");
let lastindex, progress;

let songs = [
  {
    songName: "Let Me Love You",
    filePath: "songs/1.mp3",
    coverPath:
      "https://upload.wikimedia.org/wikipedia/en/a/a5/DJSnakeLetMeLoveYou.jpg",
  },
  {
    songName: "CKay - Love Nwantiti (Feat. Dj Yo!)",
    filePath: "songs/2.mp3",
    coverPath:
      "https://upload.wikimedia.org/wikipedia/en/c/ca/Love-Nwantiti-remix.jpg",
  },
  {
    songName: "Badshah - Jugnu (Official Video)",
    filePath: "songs/3.mp3",
    coverPath:
      "https://i0.wp.com/99lyricstore.com/wp-content/uploads/2021/10/jugnu-lyrics-badshah.jpg?fit=883%2C932&ssl=1",
  },
  {
    songName: "Alec Benjamin - Let Me Down Slowly",
    filePath: "songs/4.mp3",
    coverPath:
      "https://a10.gaanacdn.com/images/albums/22/2149722/crop_480x480_2149722.jpg",
  },
  {
    songName: "JONY - Love your voice",
    filePath: "songs/5.mp3",
    coverPath:
      "https://i.scdn.co/image/ab67616d0000b273b461ea676b6c3858ce862de9",
  },
  {
    songName: "Witt Lowry - Into Your Arms",
    filePath: "songs/6.mp3",
    coverPath:
      "https://upload.wikimedia.org/wikipedia/en/c/ce/Into_Your_Arms_by_Capital_Kings.jpg",
  },
  {
    songName: "Tesher x Jason Derulo - Jalebi Baby",
    filePath: "songs/7.mp3",
    coverPath:
      "https://upload.wikimedia.org/wikipedia/en/0/0a/Jalebi_Baby.jpeg",
  },
  {
    songName: "LYRICAL: Kaise Hua",
    filePath: "songs/8.mp3",
    coverPath:
      "https://a10.gaanacdn.com/gn_img/song/lJvKa56KDV/vKa794R2WD/size_m_1560412400.webp",
  },
  {
    songName: "Sub Urban - Cradles",
    filePath: "songs/9.mp3",
    coverPath:
      "https://i1.sndcdn.com/artworks-LxaOCLTuyZe4R3xb-HlmPQw-t500x500.jpg",
  },
];

const makeAllPlays = function () {
  songItemPlay.forEach(function (element) {
    element.classList.add("fa-play-circle");
    element.classList.remove("fa-pause-circle");
  });
};

const sameTimePlays = function () {
  let ans = songItemPlay[songIndex - 1];
  if (masterPlay.classList.contains("fa-play-circle")) {
    ans.classList.add("fa-play-circle");
    ans.classList.remove("fa-pause-circle");
  } else {
    ans.classList.remove("fa-play-circle");
    ans.classList.add("fa-pause-circle");
  }
};

const addPlayCirclesforMasterPlay = function () {
  masterPlay.classList.add("fa-play-circle");
  masterPlay.classList.remove("fa-pause-circle");
};

const addPauseCirclesforMasterPlay = function () {
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
};

const playSong = function () {
  audioElement.src = `songs/${songIndex}.mp3`;
  audioElement.play();
  masterSongName.textContent = songs[songIndex - 1].songName;
  audioElement.currentTime = 0;
};

const pauseSong = function () {
  audioElement.src = `songs/${songIndex}.mp3`;
  audioElement.pause();
  masterSongName.textContent = songs[songIndex - 1].songName;
  audioElement.currentTime = 0;
};

const gifImageOpacity = function (number) {
  gifImage.style.opacity = number;
};

const gifImage2_Opacity = function (number, opacity) {
  gifImage2[songIndex - number].style.opacity = opacity;
};

const formatTime = function (second) {
  let seconds = Math.round(second);
  let minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
};

audioElement.addEventListener("timeupdate", function () {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  progressBar.value = progress;
  currentTiming.textContent = formatTime(this.currentTime);
  // if (currentTiming.textContent === "00:00") {
  //   makeAllPlays();
  //   songItemPlay[songIndex - 1].classList.add("fa-pause-circle");
  //   songItemPlay[songIndex - 1].classList.remove("fa-play-circle");
  //   gifImage2_Opacity(1, 1);
  // } else {
  //   songItemPlay[songIndex - 1].classList.add("fa-play-circle");
  //   songItemPlay[songIndex - 1].classList.remove("fa-pause-circle");
  //   gifImage2_Opacity(1, 0);
  // }
  if (currentTiming.textContent === formatTime(this.duration)) {
    gifImageOpacity(0);
    gifImage2_Opacity(1, 0);
    songItemPlay[songIndex - 1].classList.add("fa-play-circle");
    songItemPlay[songIndex - 1].classList.remove("fa-pause-circle");
  }
});

audioElement.addEventListener("durationchange", function () {
  durationTiming.textContent = formatTime(this.duration);
});

document.addEventListener("keydown", function (e) {
  const key = e.key;
  if (key === "0") {
    currentTiming.textContent = "00:00";
    progressBar.value = 0;
    audioElement.currentTime = 0;
  }
});

progressBar.addEventListener("change", function () {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

songsItems.forEach(function (item, i) {
  item.querySelectorAll(".cover-image")[0].src = songs[i].coverPath;
  item.querySelectorAll(".songName")[0].textContent = songs[i].songName;
});

masterPlay.addEventListener("click", function () {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    addPauseCirclesforMasterPlay();
    gifImageOpacity(1);
    gifImage2_Opacity(1, 1);
  } else {
    audioElement.pause();
    addPlayCirclesforMasterPlay();
    gifImageOpacity(0);
    gifImage2_Opacity(1, 0);
  }
  sameTimePlays();
});

songItemPlay.forEach(function (element) {
  element.addEventListener("click", function (e) {
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    if (lastindex !== undefined) {
      gifImage2[lastindex].style.opacity = 0;
    }
    if (audioElement.paused || audioElement.currentTime <= 0) {
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      playSong();
      addPauseCirclesforMasterPlay();
      gifImageOpacity(1);
      gifImage2_Opacity(1, 1);
      lastindex = songIndex - 1;
    } else {
      e.target.classList.add("fa-play-circle");
      e.target.classList.remove("fa-pause-circle");
      pauseSong();
      addPlayCirclesforMasterPlay();
      gifImageOpacity(0);
      gifImage2_Opacity(1, 0);
    }
  });
});

previousBtn.addEventListener("click", function () {
  makeAllPlays();
  if (songIndex <= 1) {
    if (gifImage2[songIndex - 1].style.opacity) {
      gifImage2_Opacity(1, 0);
    }
    songIndex = 9;
  } else {
    songIndex--;
  }
  playSong();
  addPauseCirclesforMasterPlay();
  sameTimePlays();
  if (songIndex === 9) {
    gifImage2_Opacity(1, 1);
  } else {
    if (songIndex >= 1 && gifImage2[songIndex].style.opacity) {
      gifImage2_Opacity(0, 0);
    }
  }
  gifImageOpacity(1);
  gifImage2_Opacity(1, 1);
});

nextBtn.addEventListener("click", function () {
  makeAllPlays();
  if (songIndex >= 9) {
    if (gifImage2[songIndex - 1].style.opacity) {
      gifImage2_Opacity(1, 0);
    }
    songIndex = 1;
  } else {
    songIndex++;
  }
  playSong();
  addPauseCirclesforMasterPlay();
  sameTimePlays();
  if (songIndex > 1 && gifImage2[songIndex - 2].style.opacity) {
    gifImage2_Opacity(2, 0);
  }
  gifImageOpacity(1);
  gifImage2_Opacity(1, 1);
});

document.addEventListener("keydown", function (e) {
  const key = e.key;
  if (key === " ") {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      audioElement.play();
      addPauseCirclesforMasterPlay();
      gifImageOpacity(1);
      gifImage2_Opacity(1, 1);
    } else {
      audioElement.pause();
      addPlayCirclesforMasterPlay();
      gifImageOpacity(0);
      gifImage2_Opacity(1, 0);
    }
    sameTimePlays();
  }
});

document.addEventListener("keydown", function (e) {
  const key = e.key;
  if (key === "ArrowRight") {
    makeAllPlays();
    if (songIndex >= 9) {
      if (gifImage2[songIndex - 1].style.opacity) {
        gifImage2_Opacity(1, 0);
      }
      songIndex = 1;
    } else {
      songIndex++;
    }
    playSong();
    addPauseCirclesforMasterPlay();
    sameTimePlays();
    if (songIndex > 1 && gifImage2[songIndex - 2].style.opacity) {
      gifImage2_Opacity(2, 0);
    }
    gifImageOpacity(1);
    gifImage2_Opacity(1, 1);
  }
});

document.addEventListener("keydown", function (e) {
  const key = e.key;
  if (key === "ArrowLeft") {
    makeAllPlays();
    if (songIndex <= 1) {
      if (gifImage2[songIndex - 1].style.opacity) {
        gifImage2_Opacity(1, 0);
      }
      songIndex = 9;
    } else {
      songIndex--;
    }
    playSong();
    addPauseCirclesforMasterPlay();
    sameTimePlays();
    if (songIndex === 9) {
      gifImage2_Opacity(1, 1);
    } else {
      if (songIndex >= 1 && gifImage2[songIndex].style.opacity) {
        gifImage2_Opacity(0, 0);
      }
    }
    gifImageOpacity(1);
    gifImage2_Opacity(1, 1);
  }
});
