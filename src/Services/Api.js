const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '6b42b69b9f4552f6c0055bb1ba7f76b5';

async function fetchMovies(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchMoviesTrending() {
  return fetchMovies(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`);
}

export function fetchMovieById(id) {
  return fetchMovies(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
}

export function fetchCredits(id) {
  return fetchMovies(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
}

export function fetchReviews(id) {
  return fetchMovies(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`);
}

export function fetchQuery(value) {
  return fetchMovies(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${value}`,
  );
}
