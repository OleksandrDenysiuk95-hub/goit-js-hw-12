import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" />
          <div class="info">
            <div class="info-item"><b>Likes</b><p>${likes}</p></div>
            <div class="info-item"><b>Views</b><p>${views}</p></div>
            <div class="info-item"><b>Comments</b><p>${comments}</p></div>
            <div class="info-item"><b>Downloads</b><p>${downloads}</p></div>
          </div>
        </a>
      </li>`
    )
    .join('');

  gallery.innerHTML = markup; // Додавання за одну операцію
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-active'); // Клас бібліотеки css-loader
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.remove('is-active');
  loader.classList.add('is-hidden');
}
