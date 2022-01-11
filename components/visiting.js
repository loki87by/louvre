import { IMAGES_ARRAY, TITLES_ARRAY } from "../consts/consts.js";
import { createElement } from "../consts/helpers.js";

export default function createCard(index, selector) {
  const tourAnchor = TITLES_ARRAY[index].split(" ")[0];
  const anchor = createElement(
    "a",
    {
      class: "visiting__card-container",
      href: `./pages/tour.html#${tourAnchor}`,
      target: "_blank",
    },
    selector
  );
  const card = createElement("div", { class: "visiting__card" }, anchor);
  createElement(
    "img",
    {
      src: IMAGES_ARRAY[index],
      alt: TITLES_ARRAY[index],
      class: "visiting__card-img",
    },
    card
  );
  createElement(
    "h3",
    { class: "visiting__card-title" },
    card,
    TITLES_ARRAY[index]
  );
  createElement(
    "p",
    { class: "visiting__card-text" },
    card,
    "360° Virtual Tour"
  );
  createElement(
    "p",
    { class: "visiting__card-caption" },
    card,
    "Google Street Panorama View"
  );
}
