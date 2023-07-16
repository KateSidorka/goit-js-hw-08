import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";
import { galleryItems } from './gallery-items';

const gallery = document.querySelector('.gallery');

const galleryList = galleryItems.map(({preview, original, description}) => {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
      </a>
    </li>
  `;
}).join('');

gallery.insertAdjacentHTML('afterbegin', galleryList);

gallery.addEventListener('click', onClick);

function onClick(event) {
  event.preventDefault();
  
  if (event.target.tagName !== 'IMG') {
    return;
  }
  
  const instance = SimpleLightbox.create(`
    <img width="1400" height="900" src="${event.target.dataset.source}">
  `, {
    onShow: () => {
      document.addEventListener('keydown', closeModal);
    },
    onClose: () => {
      document.removeEventListener('keydown', closeModal);
    },
  });
  
  instance.show();
}

function closeModal(event) {
  if (event.code !== 'Escape') {
    return;
  } 
  instance.close();
}

console.log(galleryItems);
