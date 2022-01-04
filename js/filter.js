export class Filter {
  /**
   * fitler class for user search and filter
   * @param {object} ui - UI object which will be used to display filtered array
   * @param {array} movies - array of movies to be filtered
   */
  constructor(ui, movies) {
    this.ui = ui;
    this.movies = movies;
    this.timeout = -1;

    this.yearFilterBtn = document.querySelector('.year_btn');
    this.yearFilterBtn.addEventListener('click', this.filterByYear);

    this.genreFilter = document.querySelector('.genre_dropdown');
    this.genreFilter.addEventListener('change', this.filterByGenre);

    this.searchFilter = document.querySelector('.search_input');
    this.searchFilter.addEventListener('keyup', this.search);
  }

  /**
   * Filters movies array by year based on user input
   * @method
   */
  filterByYear = () => {
    const yearFrom = document.querySelector('.from_input');
    const yearTo = document.querySelector('.to_input');

    // const yearBtn = document.querySelector('year_btn');
    const from = Number(yearFrom.value);
    const to = Number(yearTo.value);
    const filtered = this.movies.filter((movie) => {
      return movie.year >= from && movie.year <= to;
    });

    //set new data array for object and reset page to 1
    this.ui.data = filtered;
    this.ui.currentPage = 1;
    this.ui.paint();
  };

  /**
   * Filters movies array based on user selected genre
   * @method
   */
  filterByGenre = () => {
    const select = document.querySelector('.genre_dropdown');

    if (select.value !== '') {
      const filtered = this.movies.filter((movie) => {
        return movie.genres.includes(select.value);
      });
      this.ui.data = filtered;
      this.ui.currentPage = 1;
      this.ui.paint();
    } else {
      this.ui.data = this.movies;
      this.ui.currentPage = 1;
      this.ui.paint();
    }
  };

  /**
   * delays search filter on user input
   * @method
   * @param {string} target
   */
  delayKeyUp = (target) => {
    this.timeout = setTimeout(() => {
      const value = target.value;
      const filtered = this.movies.filter((movie) => {
        return (
          movie.plot.includes(value) ||
          movie.title.includes(value) ||
          movie.actors.includes(value) ||
          movie.director.includes(value) ||
          movie.genres.includes(value)
        );
      });
      this.ui.data = filtered;
      this.ui.currentPage = 1;
      this.ui.paint();
    }, 300);
  };

  /**
   * filters movies array based on input from search box
   * @method
   */
  search = () => {
    const target = document.querySelector('.search_input');
    clearTimeout(this.timeout);
    this.delayKeyUp(target);
  };

  /**
   * Gets all genres in movies array, to be appended to genre dropdown
   * @method
   */
  getAllGenres = () => {
    const result = [...new Set(this.movies.flatMap(({genres}) => genres))].sort();
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
}
