console.log(movies);
const ui = new UI(movies);
ui.paint();

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

const init = () => {
  getAllGenres();
};

document.addEventListener('DOMContentLoaded', init);
