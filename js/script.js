import {UI} from './ui.js';
import {Filter} from './filter.js';
const Url = 'http://localhost:3000/movies';

/**
 * Method to fetch movies from api
 * @param {string} url
 * @returns {json}
 */
async function getMovies(url) {
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

//QUESTION: why does this cause my init function not to run
const movies = await getMovies(Url);

(function () {
  /**
   * Initialization function for method and classes, runs after dom loaded
   * @function
   */
  const init = () => {
    const ui = new UI(movies);
    ui.paint();
    const filter = new Filter(ui, movies);
    filter.getAllGenres();
  };

  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
