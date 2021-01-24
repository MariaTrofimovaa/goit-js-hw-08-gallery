import galleryItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".gallery"),
  lightbox: document.querySelector(".lightbox"),
  lightboxImg: document.querySelector(".lightbox__image"),
  button: document.querySelector(".lightbox__button"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
  leftArrow: document.querySelector(".lightbox__left"),
  rightArrow: document.querySelector(".lightbox__right"),
};

refs.gallery.addEventListener("click", openModal);
refs.button.addEventListener("click", closeModal);
refs.leftArrow.addEventListener("click", changeImg);
refs.rightArrow.addEventListener("click", changeImg);
refs.lightboxOverlay.addEventListener("click", closeModal);
window.addEventListener("keydown", (event) =>
  event.code === "Escape" ? closeModal() : null
);
window.addEventListener("keydown", changeImg);

let currentImg;

const createGallery = () => {
  const addImg = ({ preview, original, description }, index) =>
    `<li class="gallery__item">
        <a class="gallery__link">
            <img class="gallery__image" src="${preview}"
            data-source="${original}" alt="${description}" data-index ="${index}"/>
            
        </a>
    </li>`;

  const galleryRef = galleryItems
    .map((item, index) => addImg(item, index))
    .join("");

  refs.gallery.insertAdjacentHTML("afterbegin", galleryRef);
};

function openModal(event) {
  const target = event.target;

  if (target.nodeName === "IMG") {
    refs.lightbox.classList.add("is-open");
    refs.lightboxImg.src = target.dataset.source;
    refs.lightboxImg.alt = target.alt;
    refs.lightboxImg.dataset.index = target.dataset.index;
    currentImg = +target.dataset.index;
    return;
  }
}

function closeModal() {
  refs.lightbox.classList.remove("is-open");
  refs.lightboxImg.src = "";
  refs.lightboxImg.alt = "";
  return;
}

function changeImg(event) {
  let len = galleryItems.length - 1;

  if (
    event.target.classList.value.includes("left") ||
    event.code === "ArrowLeft"
  ) {
    currentImg === 0 ? (currentImg = len) : (currentImg -= 1);
    refs.lightboxImg.src = galleryItems[currentImg].original;
  }
  if (
    event.target.classList.value.includes("right") ||
    event.code === "ArrowRight"
  ) {
    currentImg === len ? (currentImg = 0) : (currentImg += 1);
    refs.lightboxImg.src = galleryItems[currentImg].original;
  }
}

createGallery(galleryItems);
