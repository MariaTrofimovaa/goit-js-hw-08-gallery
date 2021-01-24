import galleryItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".gallery"),
  lightbox: document.querySelector(".lightbox"),
  lightboxImg: document.querySelector(".lightbox__image"),
  button: document.querySelector(".lightbox__button"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
};

refs.gallery.addEventListener("click", openModal);
refs.button.addEventListener("click", closeModal);
refs.lightboxOverlay.addEventListener("click", closeModal);
window.addEventListener("keydown", (event) =>
  event.code === "Escape" ? closeModal() : null
);

const createGallery = () => {
  const addImg = ({ preview, original, description }) =>
    `<li class="gallery__item">\
        <a class="gallery__link">\
            <img class="gallery__image" src="${preview}"\
            data-source="${original}" alt="${description}"/>\
        </a>\
    </li>`;

  const galleryRef = galleryItems.map(addImg).join("");

  refs.gallery.insertAdjacentHTML("afterbegin", galleryRef);
};

function openModal(event) {
  const target = event.target;
  if (target.nodeName === "IMG") {
    refs.lightbox.classList.add("is-open");
    refs.lightboxImg.src = target.dataset.source;
    refs.lightboxImg.alt = target.alt;
    return;
  }
}

function closeModal() {
  refs.lightbox.classList.remove("is-open");
  refs.lightboxImg.src = "";
  refs.lightboxImg.alt = "";
  return;
}

createGallery(galleryItems);
