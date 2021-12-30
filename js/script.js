import {UI} from './ui.js';
import {movies} from './movies.js';
import {Filter} from './filter.js';
// console.log(movies);
const ui = new UI(movies);
const filter = new Filter(ui, movies);

const getAllGenres = () => {
  const result = [...new Set(movies.flatMap(({genres}) => genres))].sort();
  const length = result.length;
  const select = document.querySelector('.genre_dropdown');
  for (let i = 0; i < length; i++) {
    let option = result[i];
    let el = document.createElement('option');
    el.textContent = option;
    el.value = option;
    select.appendChild(el);
  }
};

//creating a separete function to call all initial functions and methods to load after dom has rendered
const init = () => {
  ui.paint();
  getAllGenres();
};

document.addEventListener('DOMContentLoaded', init);
