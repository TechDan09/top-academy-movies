class UI {
  constructor(data) {
    //expecting an array of movies
    this.data = data;
    this.resultCount = document.querySelector('.result_count');
    this.container = document.querySelector('.movie_list');
    this.movieTemplate = document.querySelector('.movie_template');
    this.pagination = document.querySelector('.pagination');
    this.paginationTemplate = document.querySelector('.pagination_template');
    this.moviesPerPage = 12;
    this.currentPage = 1;
  }

  updateCount = (length) => {
    this.resultCount.textContent = `Number of Movies Displayed: ${length}`;
  };

  paint(movieList = this.data) {
    //clear container before painting
    this.container.innerText = '';
    const length = movieList.length;
    this.updateCount(length);
    let page = this.currentPage;
    page--;
    let start = this.moviesPerPage * page;
    let end = start + this.moviesPerPage;
    console.log(start, end, page);
    let paginatedItems = movieList.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {
      let movie = paginatedItems[i];
      let genre = '';
      movie.genres.forEach((g) => {
        genre += `<li class="rounded_border_0">${g}</li>`;
      });

      //clone the template in order to append different duplicates to the container
      const clone = this.movieTemplate.content.cloneNode(true);
      clone.querySelector('img').src = movie.posterUrl;
      clone.querySelector('.title').textContent = movie.title;
      clone.querySelector('.year').textContent = movie.year;
      clone.querySelector('.runtime').textContent = `${movie.runtime} Minutes`;
      clone.querySelector('.genre').innerHTML = genre;
      clone.querySelector('.plot').textContent = movie.plot;
      clone.querySelector('.director').textContent = movie.director;
      clone.querySelector('.actors').textContent = movie.actors;
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
        console.log('clicked');
        console.log(this.currentPage);
      });
      if (i === this.currentPage) {
        btn.classList.add('active');
      }
      this.pagination.appendChild(clone);
    }
  }
}
