import { createElement } from "../consts/helpers.js";
import { VIDEOS_ARRAY, checkWindowWidth } from "../consts/consts.js";

const videoPlayer = document.getElementById("video-player");
const playButton = document.querySelector(".video__controls-btn_main");
const actionButton = document.querySelector(".video__controls-btn_play");
const progressBar = document.querySelector(".video__length-input");
const muteButton = document.querySelector(".video__controls-btn_volume");
const volumeScale = document.querySelector(".video__volume-input");
const playlist = document.querySelector(".video__playlist");
let fullscreenIsOpen = false;
let progress = 0;

export function playOrPause() {
  if (videoPlayer.paused) {
    videoPlayer.playbackRate = 1;
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
  actionButton.classList.toggle("video__controls-btn_pause");
  playButton.style = "transform: scale(0)";
}

function progressStyle(element, progress) {
  element.style = `background: linear-gradient(
    to right,
    rgba(113, 7, 7, 1) 0%,
    rgba(113, 7, 7, 1) ${progress}%,
    #fff ${progress}%,
    #fff 100%
  );`;
}

export function videoProgress() {
  progress =
    Math.floor(videoPlayer.currentTime) /
    (Math.floor(videoPlayer.duration) / 100);
  progressBar.value = progress;
  progressStyle(progressBar, progress);
}

export function videoChangeTime(e) {
  const value = e.target.value;
  videoPlayer.currentTime = value * (Math.floor(videoPlayer.duration) / 100);
  progressStyle(progressBar, value);
}

function jumpToTime(back) {
  let interval = 10;

  if (back) {
    interval = -interval;
  }
  videoPlayer.currentTime += interval;
}

export function videoMute() {
  if (videoPlayer.volume === 0) {
    videoPlayer.volume = volumeScale.value / 50;
  } else {
    videoPlayer.volume = 0;
  }
  muteButton.classList.toggle("video__controls-btn_mute");
  progressStyle(volumeScale, volumeScale.value * 2);
}

export function videoChangeVolume() {
  const volume = volumeScale.value / 50;
  videoPlayer.volume = volume;

  if (videoPlayer.volume === 0) {
    muteButton.classList.add("video__controls-btn_mute");
  } else {
    muteButton.classList.remove("video__controls-btn_mute");
  }
  progressStyle(volumeScale, volumeScale.value * 2);
}

export function fullscreenSwitch() {
  if (!fullscreenIsOpen) {
    launchFullScreen();
    fullscreenIsOpen = true;
  } else {
    cancelFullscreen();
    fullscreenIsOpen = false;
  }
}
function launchFullScreen() {
  if (videoPlayer.requestFullScreen) {
    videoPlayer.requestFullScreen();
  } else if (videoPlayer.mozRequestFullScreen) {
    videoPlayer.mozRequestFullScreen();
  } else if (videoPlayer.webkitRequestFullScreen) {
    videoPlayer.webkitRequestFullScreen();
  }
}
function cancelFullscreen() {
  if (document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
}

function changVideoSpeed(direction) {
  let step = 0.25;

  if (direction) {
    step = step * -1;
  }

  if (direction && videoPlayer.playbackRate === 0) {
    return;
  }
  videoPlayer.playbackRate += step;
}

function switchVideo(back) {
  const srcPartsArray = videoPlayer.src.split("/");
  let oldIndex = +srcPartsArray[srcPartsArray.length - 1]
    .replace("video", "")
    .replace(".mp4", "");
  let newIndex;

  if (!back) {
    if (oldIndex === 4) {
      oldIndex = -1;
    }
    newIndex = oldIndex + 1;
  } else {
    if (oldIndex === 0) {
      oldIndex = 5;
    }
    newIndex = oldIndex - 1;
  }
  const newSrc = `./assets/videos/video${newIndex}.mp4`;
  const newPoster = `./assets/img/video/poster${newIndex}.jpg`;
  videoPlayer.src = newSrc;
  videoPlayer.poster = newPoster;
  videoPlayer.autoplay = true;
}

function closePopup() {
  const popup = document.querySelector(".popup");
  const containerClose = document.querySelector(".popup__container-close");
  containerClose.removeEventListener("click", closePopup);
  popup.remove();
}

function createPopupTextItem(container, text1, text2) {
  const containerText = createElement(
    "div",
    { class: "popup__container-text" },
    container
  );
  createElement("h4", {}, containerText, text1);
  createElement("h3", {}, containerText, text2);
}

function openPopup() {
  const body = document.querySelector("body");
  const popup = createElement("div", { class: "popup" }, body);
  const container = createElement("div", { class: "popup__container" }, popup);
  const containerHeader = createElement(
    "div",
    { class: "popup__container-header" },
    container
  );
  createElement("h2", {}, containerHeader, "Быстрые клавиши");
  const containerClose = createElement(
    "img",
    {
      class: "popup__container-close",
      src: "./assets/svg/close.svg",
      alt: "close",
    },
    containerHeader
  );
  containerClose.addEventListener("click", closePopup);
  const containerBody = createElement(
    "div",
    { class: "popup__container-content" },
    container
  );
  createPopupTextItem(containerBody, "Пауза / Воспроизвести", "Space or K");
  createPopupTextItem(containerBody, "Следующее видео", "N");
  createPopupTextItem(containerBody, "Предыдущее видео", "P");
  createPopupTextItem(containerBody, "Перемотка на 10сек вперед", "L");
  createPopupTextItem(containerBody, "Перемотка на 10сек назад", "J");
  createPopupTextItem(
    containerBody,
    'Перейти к определенному моменту видео (например, при нажатии на цифру "7" ролик будет перемотан до временной отметки, которая соответствует 70% от длительности видео)',
    "0...9"
  );
  createPopupTextItem(containerBody, "Уменьшить скорость воспроизведения", "<");
  createPopupTextItem(containerBody, "Увеличить скорость воспроизведения", ">");
  createPopupTextItem(containerBody, "Включить / выключить звук", "M");
  createPopupTextItem(
    containerBody,
    "Включить / выключить полноэкранный режим",
    "F"
  );
}

export function keyboardHandler(e) {
  if (e.code === "KeyK") {
    playOrPause();
  }

  if (e.code === "Space") {
    e.preventDefault();
    const obj = {};
    obj.code = "KeyK";
    keyboardHandler(obj);
    return playOrPause();
  }

  if (e.code === "KeyM") {
    e.preventDefault();
    videoMute();
  }

  if (e.code === "Comma") {
    e.preventDefault();
    changVideoSpeed(true);
  }

  if (e.code === "Period") {
    e.preventDefault();
    changVideoSpeed();
  }

  if (e.code === "KeyF") {
    e.preventDefault();
    fullscreenSwitch();
  }

  if (e.code === "KeyJ") {
    e.preventDefault();
    jumpToTime();
  }
  if (e.code === "KeyL") {
    e.preventDefault();
    jumpToTime(true);
  }

  if (e.key >= 0 && e.key <= 9) {
    e.preventDefault();
    let obj = {};
    obj.target = {};
    obj.target.value = 10 * e.key;
    videoChangeTime(obj);
  }

  if (e.code === "KeyN") {
    e.preventDefault();
    switchVideo();
  }

  if (e.code === "KeyP") {
    e.preventDefault();
    switchVideo(true);
  }

  if (e.code === "Slash" && e.shiftKey) {
    e.preventDefault();
    openPopup();
  }
}

export function createPlaylist() {
  for (let i = 0; i < VIDEOS_ARRAY.length; i++) {
    const container = createElement(
      "div",
      { class: "video__playlist-item" },
      playlist
    );
    const item = createElement("img", VIDEOS_ARRAY[i], container);
    item.addEventListener("click", () => {
      videoPlayer.src = `./assets/videos/video${i}.mp4`;
      videoPlayer.poster = `./assets/img/video/poster${i}.jpg`;
    });
  }

  const firstVideoCopy = playlist.children[0].cloneNode(true);
  firstVideoCopy.addEventListener("click", () => {
    videoPlayer.src = `./assets/videos/video${0}.mp4`;
    videoPlayer.poster = `./assets/img/video/poster${0}.jpg`;
  });
  playlist.appendChild(firstVideoCopy);
  const secondVideoCopy = playlist.children[1].cloneNode(true);
  secondVideoCopy.addEventListener("click", () => {
    videoPlayer.src = `./assets/videos/video${1}.mp4`;
    videoPlayer.poster = `./assets/img/video/poster${1}.jpg`;
  });
  playlist.appendChild(secondVideoCopy);
  const thirdVideoCopy = playlist.children[2].cloneNode(true);
  thirdVideoCopy.addEventListener("click", () => {
    videoPlayer.src = `./assets/videos/video${2}.mp4`;
    videoPlayer.poster = `./assets/img/video/poster${2}.jpg`;
  });
  playlist.appendChild(thirdVideoCopy);
  const lastVideoCopy = playlist.children[4].cloneNode(true);
  lastVideoCopy.addEventListener("click", () => {
    videoPlayer.src = `./assets/videos/video${4}.mp4`;
    videoPlayer.poster = `./assets/img/video/poster${4}.jpg`;
  });
  const prelastVideoCopy = playlist.children[3].cloneNode(true);
  prelastVideoCopy.addEventListener("click", () => {
    videoPlayer.src = `./assets/videos/video${3}.mp4`;
    videoPlayer.poster = `./assets/img/video/poster${3}.jpg`;
  });
  const fourthVideoCopy = playlist.children[2].cloneNode(true);
  fourthVideoCopy.addEventListener("click", () => {
    videoPlayer.src = `./assets/videos/video${2}.mp4`;
    videoPlayer.poster = `./assets/img/video/poster${2}.jpg`;
  });
  playlist.insertBefore(lastVideoCopy, playlist.children[0]);
  playlist.insertBefore(prelastVideoCopy, playlist.children[0]);
  playlist.insertBefore(fourthVideoCopy, playlist.children[0]);

  for (let i = 0; i < playlist.children.length; i++) {
    playlist.children[i].style = `transform: translateX(-${
      checkWindowWidth() * 3
    }px)`;
  }
}
