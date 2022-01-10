const bottomImage = document.querySelector(".explore__bottom-image");
const topImage = document.querySelector(".explore__top-image");
const slider = document.querySelector(".explore__image-slider");
const playlist = document.querySelector(".video__playlist");

export const createElement = (tagName, params, container, text) => {
  const element = document.createElement(tagName);
  if (text) {
    element.textContent = text;
  }
  if (params) {
    Object.entries(params).forEach((param) => {
      element.setAttribute(String(param[0]), String(param[1]));
    });
  }
  if (container) {
    container.appendChild(element);
  }
  return element;
};

export function changeSlide(direction, data) {
  if (direction === 0) {
    data.pos--;
  } else {
    data.pos++;
  }
  for (let i = 0; i < data.slides.length; i++) {
    data.slides[i].style = `transform: translateX(${-data.pos * data.shift}${
      data.shiftUnit
    });`;
    if (i === data.pos) {
      if (
        data.pos < data.slides.length - data.limit &&
        data.pos > data.limit - 1
      ) {
        data.icons[i - data.limit].classList.add(data.activeIconClass);
      }
    } else {
      if (i < data.slides.length - data.limit && i > data.limit - 1) {
        data.icons[i - data.limit].classList.remove(data.activeIconClass);
      }
    }
  }
  if (data.pos === data.slides.length - data.limit) {
    data.icons[data.slides.length - (data.limit + data.pos)].classList.add(
      data.activeIconClass
    );
    setTimeout(() => {
      for (let i = 0; i < data.slides.length; i++) {
        data.slides[i].style = `transition: none; transform: translateX(-${
          data.shift * data.limit
        }${data.shiftUnit})`;
      }
      data.pos = data.limit;
    }, 1100);
  }
  if (data.pos === data.limit - 1) {
    data.icons[data.icons.length - 1].classList.add(data.activeIconClass);
    setTimeout(() => {
      for (let i = 0; i < data.slides.length; i++) {
        data.slides[i].style = `transition: none; transform: translateX(-${
          data.shift * (data.slides.length - (data.limit + 1))
        }${data.shiftUnit})`;
      }
      data.pos = data.slides.length - (data.limit + 1);
    }, 1100);
  }
  if (data.text) {
    let text;
    if (data.pos === data.slides.length - 1) {
      text = 1;
    } else if (data.pos === 0) {
      text = data.slides.length - 2;
    } else {
      text = data.pos;
    }
    data.text.children[0].textContent = `0${text}`;
  }
}

export function getCurrentSlide(e, data, array, startPosition) {
  let currentIndex;
  array.forEach((item, index) => {
    if(item === e.target) {
      currentIndex = index + startPosition
    }
  })
  if(currentIndex > data.pos) {
    let q = currentIndex - data.pos
    for(let i = 0; i < q; i++) {
      changeSlide(1, data)
    }
  }
  if(currentIndex < data.pos) {
    let q = data.pos - currentIndex
    for(let i = 0; i < q; i++) {
      changeSlide(0, data)
    }
  }
}

function setExploreSlider() {
  slider.style = `left: ${bottomImage.clientWidth - 300}px`;
  topImage.style = `width: ${bottomImage.clientWidth - 288}px`;
}

function resetExploreSlider() {
  slider.removeAttribute("style");
  topImage.removeAttribute("style");
}

function resizeVideoItem(arg) {
  for (let i = 0; i < playlist.children.length; i++) {
    playlist.children[i].style = `transform: translateX(${arg}px)`;
  }
}

export function updateElements(slidePosition, width) {
  if (width > 768) {
    setExploreSlider();
  } else {
    resetExploreSlider()
  }
  if (width > 1024 && width < 1490) {
    const res = -((width - 127) / 3 + 42);
    resizeVideoItem(res * slidePosition);
  }
  if (width > 768 && width < 1024) {
    const res = width - 340;
    resizeVideoItem(-res * slidePosition);
  }
  if (width >= 420 && width <= 768){
    const res = (width - 20) / 2
    resizeVideoItem(-res * slidePosition);
  }
  if (width < 420) {
    const res = width - 40
    resizeVideoItem(-res * slidePosition);
  }
}

export function ticketSelect(e) {
  const arr = Array.from(e.target.children)
  const text = document.querySelectorAll('.popup__fieldset-entry-overview-description')[2].children[1]
  arr.forEach((i) => {
    if(i.selected === true) {
      text.textContent = i.textContent
    }
  })
}