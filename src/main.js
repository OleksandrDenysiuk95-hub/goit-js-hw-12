import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import * as render from './js/render-functions.js';

let query = '';
let page = 1;
const perPage = 15;

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const input = event.currentTarget.elements['search-text'].value.trim();

  if (!input) return;

  query = input;
  page = 1;
  render.clearGallery();
  render.hideLoadMoreButton();
  render.showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, no images found matching your query.',
      });
      return;
    }
    render.createGallery(data.hits);
    if (data.totalHits > perPage) render.showLoadMoreButton();
  } catch (err) {
    iziToast.error({ message: 'Error fetching data!' });
  } finally {
    render.hideLoader();
    event.target.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  render.hideLoadMoreButton();
  render.showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    render.createGallery(data.hits);

    // Плавний скрол
    const card = document.querySelector('.gallery-item');
    if (card) {
      const { height } = card.getBoundingClientRect();
      window.scrollBy({ top: height * 2, behavior: 'smooth' });
    }

    const totalPages = Math.ceil(data.totalHits / perPage);
    if (page >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      render.showLoadMoreButton();
    }
  } catch (err) {
    iziToast.error({ message: 'Error loading more images!' });
  } finally {
    render.hideLoader();
  }
});
