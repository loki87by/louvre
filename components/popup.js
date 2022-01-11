const popup = document.querySelector(".popup");
const entryOverviewDescription = document.querySelectorAll(
  ".popup__fieldset-entry-overview-description"
);
const entryOverviewTicket = entryOverviewDescription[2].children[1];
let noSymbolsValue;

export function openPopup() {
  popup.classList.add("popup_opened");

  if (entryOverviewTicket.textContent === "") {
    entryOverviewTicket.textContent = "Permanent exhibition";
  }
  setTimeout(() => {
    popup.setAttribute(
      "style",
      "transition: background-color .3s linear, left .7s .3s linear"
    );
  }, 1000);
}

export function closePopup() {
  popup.classList.remove("popup_opened");
  setTimeout(() => {
    popup.removeAttribute("style");
  }, 1000);
}

export function checkOverlay(e) {
  if (e.target.classList.contains("popup_opened")) {
    closePopup();
  }
}

export function changeDate(e) {
  const dateContainer = document.querySelectorAll(
    ".popup__fieldset-entry-overview-description"
  )[0];
  const date = dateContainer.querySelector(
    ".popup__fieldset-entry-overview-text"
  );
  const text = e.target.value;
  date.textContent = text;
}

export function changeTime(e) {
  const timeContainer = document.querySelectorAll(
    ".popup__fieldset-entry-overview-description"
  )[1];
  const time = timeContainer.querySelector(
    ".popup__fieldset-entry-overview-text"
  );
  const text = e.target.value;
  time.textContent = text;
}

export function checkPopupOpened(e) {
  if (e.key === "Escape") {
    e.preventDefault();
    closePopup();
  }
}

export function inputLimiter(event, max, maxValue, minValue) {
  if (
    event.data === "+" ||
    event.data === "-" ||
    event.data === "." ||
    event.data === "," ||
    event.data === "e"
  ) {
    event.target.value = noSymbolsValue;
  } else {
    noSymbolsValue = event.target.value;
  }

  if (event.target.value.length > max) {
    let maxValue = event.target.value.split("").slice(0, max).join("");
    event.target.value = maxValue;
  }

  if (event.target.value.length === max) {
    if (+event.target.value > maxValue) {
      event.target.value = maxValue;
      event.target.nextElementSibling.textContent = `error: maximum value ${maxValue}`;
      setTimeout(() => {
        event.target.nextElementSibling.textContent = "";
      }, 3000);
    }
  }

  if (event.target.value.length === max) {
    if (+event.target.value < minValue) {
      event.target.value = minValue;
      event.target.nextElementSibling.textContent = `error: minimum value ${minValue}`;
      setTimeout(() => {
        event.target.nextElementSibling.textContent = "";
      }, 3000);
    }
  }
}
