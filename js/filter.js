export class Filter {
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

  // move code in settimeout to separate method
  search = () => {
    const target = document.querySelector('.search_input');
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      const value = target.value;
      const filtered = this.movies.filter((movie) => {
        return (
          movie.plot.includes(value) ||
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
}
