import { IMAGES_ARRAY, checkWindowWidth } from "./consts/consts.js";
import {
  changeSlide,
  getCurrentSlide,
  ticketSelect,
} from "./consts/helpers.js";
import createCard from "./components/visiting.js";
import dragSlider from "./components/explore.js";
import addGallery from "./components/gallery.js";
import {
  createPlaylist,
  playOrPause,
  videoProgress,
  videoChangeTime,
  videoMute,
  videoChangeVolume,
  fullscreenSwitch,
  keyboardHandler,
} from "./components/video.js";
import {
  openPopup,
  closePopup,
  checkOverlay,
  changeDate,
  changeTime,
  checkPopupOpened,
  inputLimiter,
} from "./components/popup.js";

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const welcomeSlider = document.querySelector(".welcome__slider-wrapper");
const welcomeSliderBtns = document.querySelector(".welcome__slider-btns");
const welcomeSliderIcons = document.querySelectorAll(".welcome__slider-icon");
const welcomeSliderText = document.querySelector(".welcome__slider-text");
const cardSelector = document.querySelector(".visiting__container");
const slider = document.querySelector(".explore__image-slider");
const videoPlayer = document.getElementById("video-player");
const playButton = document.querySelector(".video__controls-btn_main");
const actionButton = document.querySelector(".video__controls-btn_play");
const progressBar = document.querySelector(".video__length-input");
const muteButton = document.querySelector(".video__controls-btn_volume");
const volumeScale = document.querySelector(".video__volume-input");
const fullscreenButton = document.getElementById("fullscreen-button");
const playlist = document.querySelector(".video__playlist");
const videoPaginationBtns = document.querySelectorAll(".video__pagination-btn");
const videoPaginationItems = document.querySelectorAll(
  ".video__pagination-item"
);
const amountTickets = document.querySelectorAll(".tickets__amount-container");
const radioButton = document.getElementsByName("type");
const totalTicketsCoast = document.querySelector(".tickets__form-title_total");
const ticketsSubmitButton = document.querySelector(".tickets__form-submit");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__container-close");
const dateInput = document.getElementById("input-date");
const timeInput = document.getElementById("input-time");
const cardInput = document.getElementById("input-card");
const mounthInput = document.getElementById("input-mounth");
const yearInput = document.getElementById("input-year");
const cardholderInput = document.getElementById("input-cardholder");
const cvvInput = document.getElementById("input-cvv");
const entryCounter = document.querySelectorAll(
  ".popup__fieldset-entry-counter"
);
const entryCoasts = document.querySelectorAll(".popup__fieldset-entry-coast");
const entryCoastSum = document.querySelectorAll(
  ".popup__fieldset-entry-coast-text"
);
const entryDateButtons = document.querySelectorAll(
  ".popup__fieldset-card-date-button"
);
const entryOverviewDescription = document.querySelectorAll(
  ".popup__fieldset-entry-overview-description"
);
const ticketTypeSelect = document.getElementById("input-ticket");
const entryOverviewTicket = entryOverviewDescription[2].children[1];
const popupSubmit = document.querySelector(".popup__form-submit");
let welcomeSlidePosition = 1;
let videoSlidePosition = 3;
let ticketCoastCounter = 0;
let ticketType = "Permanent exhibition";

let welcomeSliderData = {
  slides: welcomeSlider.children,
  pos: welcomeSlidePosition,
  icons: welcomeSliderIcons,
  activeIconClass: "welcome__slider-icon_active",
  shift: 100,
  shiftUnit: "%",
  limit: 1,
  text: welcomeSliderText,
};

const firstCopy = welcomeSlider.children[0].cloneNode(true);
welcomeSlider.appendChild(firstCopy);
const lastCopy = welcomeSlider.children[4].cloneNode(true);
welcomeSlider.insertBefore(lastCopy, welcomeSlider.children[0]);

for (let i = 0; i < welcomeSlider.children.length; i++) {
  welcomeSlider.children[i].style = "transform: translateX(-100%)";
}

let videoSliderData = {
  slides: playlist.children,
  pos: videoSlidePosition,
  icons: videoPaginationItems,
  activeIconClass: "video__pagination-item_active",
  shift: checkWindowWidth(videoSlidePosition),
  shiftUnit: "px",
  limit: 3,
};

for (let i = 0; i < IMAGES_ARRAY.length; i++) {
  createCard(i, cardSelector);
}

function changeTicketCoast() {
  const basicInput = document.getElementById("basic");
  const seniorInput = document.getElementById("senior");
  const popupTotal = document.querySelector(
    ".popup__fieldset-entry-total-count"
  );
  ticketCoastCounter = basicInput.value * 20 + seniorInput.value * 10;
  totalTicketsCoast.textContent = `Total € ${ticketCoastCounter}`;
  popupTotal.textContent = `€${ticketCoastCounter}`;
  entryCoastSum[0].textContent = `${basicInput.value * 20} €`;
  entryCoastSum[1].textContent = `${seniorInput.value * 10} €`;
  entryCounter[0].children[1].textContent = basicInput.value;
  entryCounter[1].children[1].textContent = seniorInput.value;
}

function clearInputs() {
  cardInput.value = "";
  mounthInput.value = "";
  yearInput.value = "";
  cardholderInput.value = "";
  cvvInput.value = "";
}

function submitForm(e) {
  e.preventDefault();
  closePopup();
  clearInputs();
}

addGallery();
createPlaylist();
videoPlayer.volume = 0.4;

for (let i = 0; i < amountTickets.length; i++) {
  const input = amountTickets[i].querySelector(".tickets__amount-input");
  let value = input.value;
  const popupTicketCounter = entryCoasts[i].children[0];
  const plus = amountTickets[i].querySelector(
    ".tickets__amount-input-btn_plus"
  );
  const minus = amountTickets[i].querySelector(
    ".tickets__amount-input-btn_minus"
  );
  plus.addEventListener("click", () => {
    if (value < 20) {
      value++;
      input.value = value;
      popupTicketCounter.textContent = value;
      changeTicketCoast();
    }
  });
  minus.addEventListener("click", () => {
    if (value > 0) {
      value--;
      input.value = value;
      popupTicketCounter.textContent = value;
      changeTicketCoast();
    }
  });
}

for (let i = 0; i < entryCounter.length; i++) {
  const plus = entryCounter[i].children[2];
  const minus = entryCounter[i].children[0];
  const text = entryCounter[i].children[1];
  const input = amountTickets[i].querySelector(".tickets__amount-input");
  const popupTicketCounter = entryCoasts[i].children[0];
  plus.addEventListener("click", () => {
    let value = +popupTicketCounter.textContent;

    if (value < 20) {
      value++;
      popupTicketCounter.textContent = value;
      input.value = value;
      text.textContent = value;
      changeTicketCoast();
    }
  });
  minus.addEventListener("click", () => {
    let value = +popupTicketCounter.textContent;

    if (value > 0) {
      value--;
      popupTicketCounter.textContent = value;
      input.value = value;
      text.textContent = value;
      changeTicketCoast();
    }
  });
}

for (let i = 0; i < welcomeSliderIcons.length; i++) {
  welcomeSliderIcons[i].addEventListener("click", (e) => {
    getCurrentSlide(
      e,
      welcomeSliderData,
      welcomeSliderIcons,
      welcomeSlidePosition
    );
  });
}

for (let i = 0; i < videoPaginationItems.length; i++) {
  videoPaginationItems[i].addEventListener("click", (e) => {
    getCurrentSlide(
      e,
      videoSliderData,
      videoPaginationItems,
      videoSlidePosition
    );
  });
}

for (let i = 0; i < 2; i++) {
  welcomeSliderBtns.children[i].addEventListener("click", () => {
    changeSlide(i, welcomeSliderData);
  });
  videoPaginationBtns[i].addEventListener("click", () => {
    videoSliderData.shift = checkWindowWidth(videoSliderData.pos);
    changeSlide(i, videoSliderData);
  });
}

for (let i = 0; i < entryDateButtons.length; i++) {
  entryDateButtons[i].addEventListener("click", (e) => {
    const parent = e.target.parentElement;
    const input = parent.children[0];
    let max;
    let min;

    if (parent.classList.contains("popup__fieldset-card-date_year")) {
      max = 2026;
      min = 2021;
    } else {
      max = 12;
      min = 1;
    }

    if (!input.value) {
      input.value = min - 1;
    }

    if (i % 2 === 0) {
      if (+input.value < max) {
        input.value = +input.value + 1;
      }
    } else {
      if (+input.value > min) {
        input.value = +input.value - 1;
      }
    }
  });
}

function toggleMobileMenu() {
  const welcomeTextBlock = document.querySelector(".welcome__text-container");
  const navigation = document.querySelector(".navigation");
  welcomeTextBlock.classList.toggle("hidden");
  navigation.classList.toggle("nav_menuOpen");
  mobileMenuBtn.classList.toggle("mobile-menu-btn_close");
}

checkWindowWidth(videoSlidePosition, 1);

mobileMenuBtn.addEventListener("click", toggleMobileMenu);
actionButton.addEventListener("click", playOrPause);
videoPlayer.addEventListener("click", playOrPause);
playButton.addEventListener("click", playOrPause);
videoPlayer.addEventListener("timeupdate", videoProgress);
progressBar.addEventListener("change", videoChangeTime);
muteButton.addEventListener("click", videoMute);
volumeScale.addEventListener("change", videoChangeVolume);
fullscreenButton.addEventListener("click", fullscreenSwitch);
videoPlayer.addEventListener("keypress", keyboardHandler);

for (let i = 0; i < Array.from(radioButton).length; i++) {
  radioButton[i].addEventListener("input", () => {
    ticketType = Array.from(radioButton).find((item) => item.checked).value;
    entryOverviewTicket.textContent = ticketType;
  });
}
ticketsSubmitButton.addEventListener("click", openPopup);
slider.addEventListener("drag", dragSlider);
slider.addEventListener("dragend", dragSlider);
closePopupButton.addEventListener("click", () => {
  closePopup();
  clearInputs();
});
popup.addEventListener("click", checkOverlay);
ticketTypeSelect.addEventListener("change", ticketSelect);
dateInput.addEventListener("input", changeDate);
timeInput.addEventListener("input", changeTime);
cardInput.addEventListener("input", (e) => {
  inputLimiter(e, 16);
});
mounthInput.addEventListener("input", (e) => {
  inputLimiter(e, 2, 12);
});
yearInput.addEventListener("input", (e) => {
  inputLimiter(e, 4, 2026, 2021);
});
cvvInput.addEventListener("input", (e) => {
  inputLimiter(e, 3);
});
window.addEventListener("keyup", checkPopupOpened);
popupSubmit.addEventListener("click", submitForm);
window.addEventListener("resize", (e) => {
  checkWindowWidth(videoSliderData.pos, e);
});
