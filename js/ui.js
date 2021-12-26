class UI {
  constructor(data) {
    //expecting an array of movies
    this.data = data;
    this.resultCount = document.querySelector('.result_count');
    this.container = document.querySelector('.container');
    this.template = document.querySelector('.template');
  }

  updateCount = (length) => {
    this.resultCount.textContent = `Number of Movies Displayed: ${length}`;
  };

  paint(movie = this.data) {
    //clear container before painting
    this.container.innerText = '';
    const length = movie.length;
    this.updateCount(length);
    for (let i = 0; i < length; i++) {
      let genre = '';
      movie[i].genres.forEach((g) => {
        genre += `<li class="rounded_border_0">${g}</li>`;
      });

      //clone the template in order to append different duplicates to the container
      const clone = this.template.content.cloneNode(true);
      clone.querySelector('img').src = movie[i].posterUrl;
      clone.querySelector('.title').textContent = movie[i].title;
      clone.querySelector('.year').textContent = movie[i].year;
      clone.querySelector('.runtime').textContent = `${movie[i].runtime} Minutes`;
      clone.querySelector('.genre').innerHTML = genre;
      clone.querySelector('.plot').textContent = movie[i].plot;
      clone.querySelector('.director').textContent = movie[i].director;
      clone.querySelector('.actors').textContent = movie[i].actors;
      this.container.appendChild(clone);
    }
  }
}
