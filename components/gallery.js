import { createElement } from '../consts/helpers.js'
import { GALLERY_ARRAY } from '../consts/consts.js'

const pictureContainer = document.querySelector('.gallery-container')

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(GALLERY_ARRAY)

export default function addGallery() {
for(let i=0; i<GALLERY_ARRAY.length; i++) {
  const splitedImageName = GALLERY_ARRAY[i].split('/')
  const imageData = {
    alt: splitedImageName[splitedImageName.length - 1].replace('.jpg', ''),
    src: GALLERY_ARRAY[i],
    style: 'margin-bottom: 24px'
  }
  createElement('img', imageData, pictureContainer)
}
}
