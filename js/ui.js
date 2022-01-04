import {movies} from './movies.js';

export class UI {
  /**
   * Class for dom manipulation and display
   * @param {Array} data
   */
  constructor(data) {
    //expecting an array of movies
    this.data = data;
    this.resultCount = document.querySelector('.result_count');
    this.main = document.querySelector('main');
    this.container = document.querySelector('.movie_list');
    this.movieTemplate = document.querySelector('.movie_template');
    this.pagination = document.querySelector('.pagination');
    this.paginationTemplate = document.querySelector('.pagination_template');
    this.filterSection = document.querySelector('.filter');
    this.singleMovieTemplate = document.querySelector('.single_movie_template');
    this.genresTemplate = document.querySelector('.genres_template');
    this.nextPrevTemplate = document.querySelector('.next_prev_template');
    this.moviesPerPage = 12;
    this.currentPage = 1;
    this.container.addEventListener('click', this.showSingleMovie);
    this.main.addEventListener('click', this.goBack);
    this.main.addEventListener('click', this.switchPage);
  }

  /**
   * Method to update number of items being displayed
   * @method
   * @param {number} length
   */
  updateCount = (length) => {
    this.resultCount.textContent = `Result: ${length}`;
  };

  /**
   * Method for rendering movie cards on the dom
   * @method
   */
  paint = () => {
    const length = this.data.length;
    this.updateCount(length);

    //clear container before painting
    this.container.innerText = '';

    let page = this.currentPage;
    page--;
    let start = this.moviesPerPage * page;
    let end = start + this.moviesPerPage;
    let paginatedItems = this.data.slice(start, end);
    paginatedItems.forEach(this.renderMovie);

    this.setupPagination(length);
  };

  /**
   * Method to extract individual genres as li from movie.genres array
   * @param {Array} data movie genre sub array
   * @returns {documentFragment}
   */
  getGenres = (data) => {
    const genres = document.createDocumentFragment();

    data.forEach((item) => {
      const clone = this.genresTemplate.content.cloneNode(true);
      const li = clone.querySelector('li');
      li.textContent = item;
      genres.appendChild(clone);
    });

    return genres;
  };

  /**
   * Method to render a single card, this will be called withing paint method
   * @param {Array} movie Array of movies to be rendered
   */
  renderMovie = (movie) => {
    //using arrow function due to statical binding
    const clone = this.movieTemplate.content.cloneNode(true);
    const card = clone.querySelector('.card');
    card.setAttribute('data-id', movie.id);

    clone.querySelector('img').src = movie.posterUrl;
    clone.querySelector('img').alt = movie.title;
    clone.querySelector('.title').textContent = movie.title;
    clone.querySelector('.year').textContent = movie.year;
    clone.querySelector('.runtime').textContent = `${movie.runtime} Minutes`;
    clone.querySelector('.genre').appendChild(this.getGenres(movie.genres));
    clone.querySelector('.director').textContent = `Director: ${movie.director}`;
    clone.querySelector('.actors').textContent = `Actors: ${movie.actors}`;

    this.container.appendChild(clone);
  };

  /**
   * Method to setup pagination buttons
   * @param {number} itemsLength total number of movie items to be displayed
   */
  setupPagination = (itemsLength) => {
    this.pagination.textContent = '';
    let pageCount = Math.ceil(itemsLength / this.moviesPerPage);

    const prevBtn = this.nextPrevTemplate.content.cloneNode(true);
    const prev = prevBtn.querySelector('button');
    prev.classList.add('prev');
    prev.querySelector('img').src = './assets/prev.svg';
    this.pagination.appendChild(prev);

    for (let i = 1; i < pageCount + 1; i++) {
      const clone = this.paginationTemplate.content.cloneNode(true);
      let btn = clone.querySelector('button');
      btn.innerText = i;
      btn.setAttribute('data-pagenum', i);

      if (i === this.currentPage) {
        btn.classList.add('active');
      }

      this.pagination.appendChild(btn);
    }

    const nextBtn = this.nextPrevTemplate.content.cloneNode(true);
    const next = nextBtn.querySelector('button');
    next.classList.add('next');
    next.querySelector('img').src = './assets/next.svg';
    this.pagination.appendChild(next);
  };

  /**
   * Method to change page on click based on event delegation through the main element
   * @param {object} e
   */
  switchPage = (e) => {
    const element = e.target.classList.length ? e.target : e.target.parentElement;

    if (element.classList.contains('page_numbers')) {
      let pageNumber = Number(e.target.getAttribute('data-pagenum'));
      this.currentPage = pageNumber;
      this.paint();
    } else if (element.classList.contains('next')) {
      this.currentPage += 1;
      this.paint();
    } else if (element.classList.contains('prev') && this.currentPage > 1) {
      this.currentPage -= 1;
      this.paint();
    }
  };

  /**
   * Method to display more info about a movie onclick
   * Used event delegation to target card click
   * @param {object} e
   */
  showSingleMovie = (e) => {
    let target = e.target.closest('.card');
    if (!target) {
      return;
    }
    const id = target.getAttribute('data-id');

    //Hide filter, container and pagination section
    this.filterSection.classList.add('d_none');
    this.container.classList.add('d_none');
    this.pagination.classList.add('d_none');

    //clone template for rendering
    const clone = this.singleMovieTemplate.content.cloneNode(true);
    const singleMovie = movies[id - 1];

    clone.querySelector('img').src = singleMovie.posterUrl;
    clone.querySelector('img').alt = singleMovie.title;
    clone.querySelector('.title').textContent = singleMovie.title;
    clone.querySelector('.year').textContent = singleMovie.year;
    clone.querySelector('.runtime').textContent = `${singleMovie.runtime} Minutes`;
    clone.querySelector('.genre').appendChild(this.getGenres(singleMovie.genres));
    clone.querySelector('.plot').textContent = singleMovie.plot;
    clone.querySelector('.director').textContent = `Director: ${singleMovie.director}`;
    clone.querySelector('.actors').textContent = `Actors: ${singleMovie.actors}`;

    const viewImdbBtn = clone.querySelector('.view_on_imdb');
    viewImdbBtn.href = `https://www.imdb.com/find?q=${singleMovie.title}`;
    viewImdbBtn.setAttribute('target', '_blank');

    this.main.appendChild(clone);
  };

  /**
   * Method to switch page from single movie page
   * @param {object} e
   */
  goBack = (e) => {
    if (e.target.classList.contains('back_btn')) {
      const singleMovie = document.querySelector('.single_movie');
      singleMovie.remove();
      this.filterSection.classList.remove('d_none');
      this.container.classList.remove('d_none');
      this.pagination.classList.remove('d_none');
    }
  };
}
