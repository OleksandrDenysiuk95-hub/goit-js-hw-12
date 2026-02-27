import axios from 'axios';

const API_KEY = '54780103-b22ef04994d9984d9528d48dd'; // Встав сюди свій ключ без дужок
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  // Використовуємо об'єкт params, щоб Axios сам правильно зібрав URL
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data);
}
