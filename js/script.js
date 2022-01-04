import {UI} from './ui.js';
import {movies} from './movies.js';
import {Filter} from './filter.js';

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

document.addEventListener('DOMContentLoaded', init);
