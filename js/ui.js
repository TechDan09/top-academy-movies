class UI {
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

  updateCount = (length) => {
    this.resultCount.textContent = `Result: ${length}`;
  };

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

  //helper method to extract genres from genre subArray in movie object
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

  //using arrow function due to statical binding
  renderMovie = (movie) => {
    //clone the template in order to append different duplicates to the container
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

  setupPagination = (itemsLength) => {
    this.pagination.textContent = '';
    let pageCount = Math.ceil(itemsLength / this.moviesPerPage);

    const prevBtn = this.nextPrevTemplate.content.cloneNode(true);
    const prev = prevBtn.querySelector('button');
    prev.classList.add('prev');
    prev.querySelector('img').src = './assets/prev.svg';
    this.pagination.appendChild(prev);

    // let prevButton = document.createElement('button');
    // prevButton.classList.add('pagination_btn', 'previous');
    // prevButton.textContent = 'Previous';
    // this.pagination.appendChild(prevButton);

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

  switchPage = (e) => {
    if (e.target.classList.contains('page_numbers')) {
      let pageNumber = Number(e.target.getAttribute('data-pagenum'));
      this.currentPage = pageNumber;
      this.paint();
    }

    if (e.target.classList.contains('next')) {
      this.currentPage += 1;
      this.paint();
    }

    if (e.target.classList.contains('prev') && this.currentPage > 1) {
      this.currentPage -= 1;
      this.paint();
    }
  };

  showSingleMovie = (e) => {
    let target = e.target.closest('.card');
    console.log(target);
    if (e.target.classList.contains('card')) {
      const id = e.target.getAttribute('data-id');
      this.filterSection.classList.add('d_none');
      this.container.classList.add('d_none');
      this.pagination.classList.add('d_none');

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
    }
  };

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
