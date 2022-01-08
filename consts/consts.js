import { updateElements } from './helpers.js'

export const IMAGES_ARRAY = [
  "./assets/jpg/royal.jpg",
  "./assets/jpg/denon.jpg",
  "./assets/jpg/colonnade.jpg",
  "./assets/jpg/greek.jpg",
  "./assets/jpg/mona.jpg",
  "./assets/jpg/night.jpg",
];

export const TITLES_ARRAY = [
  "royal palace",
  "denon wing",
  "colonnade perrault",
  "greek hall",
  "mona lisa",
  "night palace",
];

export const VIDEOS_ARRAY = [
  {
    src: "./assets/img/video/poster0.jpg",
    alt: "poster0",
    class: "video__playlist-video",
    title: "video player",
  },
  {
    src: "./assets/img/video/poster1.jpg",
    alt: "poster1",
    class: "video__playlist-video",
    title: "video player",
  },
  {
    src: "./assets/img/video/poster2.jpg",
    alt: "poster2",
    class: "video__playlist-video",
    title: "video player",
  },
  {
    src: "./assets/img/video/poster3.jpg",
    alt: "poster3",
    class: "video__playlist-video",
    title: "video player",
  },
  {
    src: "./assets/img/video/poster4.jpg",
    alt: "poster4",
    class: "video__playlist-video",
    title: "video player",
  },
];

export const GALLERY_ARRAY = [
  "./assets/img/galery/galery1.jpg",
  "./assets/img/galery/galery2.jpg",
  "./assets/img/galery/galery3.jpg",
  "./assets/img/galery/galery4.jpg",
  "./assets/img/galery/galery5.jpg",
  "./assets/img/galery/galery6.jpg",
  "./assets/img/galery/galery7.jpg",
  "./assets/img/galery/galery8.jpg",
  "./assets/img/galery/galery9.jpg",
  "./assets/img/galery/galery10.jpg",
  "./assets/img/galery/galery11.jpg",
  "./assets/img/galery/galery12.jpg",
  "./assets/img/galery/galery13.jpg",
  "./assets/img/galery/galery14.jpg",
  "./assets/img/galery/galery15.jpg",
];

export const checkWindowWidth = (arg, evt) => {
  const width = Math.max(document.documentElement.clientWidth, window.screen.width);
  //const playlistWidth = document.querySelector('.video__playlist').clientWidth
  //console.log(width, playlistWidth)
  if (evt) {
    updateElements(arg, width);
  }
  if (width >= 1490) {
    return 494;
  } else if (width > 1024 && width < 1490) {
    return (width - 84) / 3 + 25;
  } else if (width > 768 && width < 1024) {
    const res = width - 340;
    return res;
  } else if (width <= 768 && width > 420) {
    const res = (width - 20) / 2
    return res
  } if (width === 420) {
    return 200;
  } else {
    return width - 40
  }
};
