import { createElement } from "../consts/helpers.js";
import { GALLERY_ARRAY } from "../consts/consts.js";

const gallerySelector = document.getElementById("gallery");
const pictureContainer = document.querySelector(".gallery-container");
const visibleHeight = document.documentElement.clientHeight;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(GALLERY_ARRAY);

export default function addGallery() {
  for (let i = 0; i < GALLERY_ARRAY.length; i++) {
    const splitedImageName = GALLERY_ARRAY[i].split("/");
    const imageData = {
      alt: splitedImageName[splitedImageName.length - 1].replace(".jpg", ""),
      src: GALLERY_ARRAY[i],
      class: "gallery-image",
      style: `transform: translateY(${visibleHeight}px);`,
    };
    createElement("img", imageData, pictureContainer);
  }
  window.addEventListener("scroll", () => {
    const images = Array.from(document.querySelectorAll(".gallery-image"));

    if (
      window.pageYOffset >
      gallerySelector.offsetTop -
        (document.documentElement.clientHeight / 16) * 7
    ) {
      images.forEach((i, index) => {
        i.style.transitionDelay = `${index / images.length}s`;
        i.classList.add("gallery-image_fixedPlace");
      });
    } else {
      images.forEach((i) => {
        i.classList.remove("gallery-image_fixedPlace");
      });
    }
  });
}
