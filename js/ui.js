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
    this.moviesPerPage = 12;
    this.currentPage = 1;
  }

  updateCount = (length) => {
    this.resultCount.textContent = `Number of Movies Result: ${length}`;
  };

  paint() {
    //clear container before painting
    this.container.innerText = '';
    const length = this.data.length;
    this.updateCount(length);
    let page = this.currentPage;
    page--;
    let start = this.moviesPerPage * page;
    let end = start + this.moviesPerPage;
    let paginatedItems = this.data.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {
      let movie = paginatedItems[i];
      let genre = '';
      movie.genres.forEach((g) => {
        genre += `<li class="rounded_border_0">${g}</li>`;
      });

      //clone the template in order to append different duplicates to the container
      const clone = this.movieTemplate.content.cloneNode(true);
      const card = clone.querySelector('.card');
      card.setAttribute('data-id', movie.id);
      card.addEventListener('click', () => {
        this.showSingleMovie(movie.id);
      });
      clone.querySelector('img').src = movie.posterUrl;
      clone.querySelector('img').alt = movie.title;
      clone.querySelector('.title').textContent = movie.title;
      clone.querySelector('.year').textContent = movie.year;
      clone.querySelector('.runtime').textContent = `${movie.runtime} Minutes`;
      clone.querySelector('.genre').innerHTML = genre;
      clone.querySelector('.plot').textContent = movie.plot;
      clone.querySelector('.director').textContent = `Director: ${movie.director}`;
      clone.querySelector('.actors').textContent = `Actors: ${movie.actors}`;
      this.container.appendChild(clone);
    }
    this.setupPagination(length);
  }

  setupPagination(itemsLength) {
    this.pagination.textContent = '';
    let pageCount = Math.ceil(itemsLength / this.moviesPerPage);
    for (let i = 1; i < pageCount + 1; i++) {
      const clone = this.paginationTemplate.content.cloneNode(true);
      let btn = clone.querySelector('button');
      btn.innerText = i;

      btn.addEventListener('click', () => {
        this.currentPage = i;
        this.paint();
      });
      if (i === this.currentPage) {
        btn.classList.add('active');
      }
      this.pagination.appendChild(btn);
    }
  }

  showSingleMovie(id) {
    this.filterSection.classList.add('d_none');
    this.container.classList.add('d_none');
    this.pagination.classList.add('d_none');
    const clone = this.singleMovieTemplate.content.cloneNode(true);
    const singleMovie = movies[id - 1];
    let genre = '';
    singleMovie.genres.forEach((g) => {
      genre += `<li class="rounded_border_0">${g}</li>`;
    });
    console.log(singleMovie);
    clone.querySelector('img').src = singleMovie.posterUrl;
    clone.querySelector('img').alt = singleMovie.title;
    clone.querySelector('.title').textContent = singleMovie.title;
    clone.querySelector('.year').textContent = singleMovie.year;
    clone.querySelector('.runtime').textContent = `${singleMovie.runtime} Minutes`;
    clone.querySelector('.genre').innerHTML = genre;
    clone.querySelector('.plot').textContent = singleMovie.plot;
    clone.querySelector('.director').textContent = `Director: ${singleMovie.director}`;
    clone.querySelector('.actors').textContent = `Actors: ${singleMovie.actors}`;
    clone.querySelector('.back_btn').addEventListener('click', () => {
      this.goBack();
    });
    this.main.appendChild(clone);
  }

  goBack() {
    const singleMovie = document.querySelector('.single_movie');
    singleMovie.remove();
    this.filterSection.classList.remove('d_none');
    this.container.classList.remove('d_none');
    this.pagination.classList.remove('d_none');
  }
}
