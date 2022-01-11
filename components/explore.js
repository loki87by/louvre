const topImage = document.querySelector(".explore__top-image");
const bottomImage = document.querySelector(".explore__bottom-image");
const slider = document.querySelector(".explore__image-slider");

export default function dragSlider(evt) {
  evt.preventDefault();

  if (evt.clientX - bottomImage.x <= bottomImage.width) {
    topImage.style = `width: ${evt.clientX - bottomImage.x + 18}px`;
    slider.style = `left: ${evt.clientX - bottomImage.x}px`;
  }

  if (evt.clientX - bottomImage.x <= 0) {
    topImage.style = "width: 0";
    slider.style = "left: -18px";
  }

  if (evt.clientX - bottomImage.x > bottomImage.width) {
    topImage.style = `width: ${bottomImage.width}px`;
    slider.style = `left: ${bottomImage.width - 18}px`;
  }
}
