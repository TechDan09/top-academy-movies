class UI {
  constructor(data) {
    this.data = data;
  }
  //expecting an array of movies

  paint(movie = this.data) {
    let result = '';
    const length = movie.length;
    for (let i = 0; i < length; i++) {
      let output = ``;
      let genre = ``;
      movie[i].genres.forEach((g) => {
        genre += `<li class="rounded_border_0">${g}</li>`;
      });

      output = `
      	<div class="card">
      	<img
      		src="${movie[i].posterUrl}"
      		alt="${movie[i].title}"
      	/>
      	<div class="movie_info">
      		<p class="title">${movie[i].title}</p>
      		<div class="movie_details d_flex">
      			<p class="year">${movie[i].year}</p>
      			<p class="runtime">${movie[i].runtime} Minutes</p>
      		</div>
      		<ul class="genre d_flex">
						${genre}
      		</ul>
      		<p class="plot">
						${movie[i].plot}
      		</p>
      		<p class="director">Director: ${movie[i].director}</p>
      		<p class="actors">Cast: ${movie[i].actors}</p>
      	</div>
      </div>
      </div>
      `;
      result += output;
    }
    const container = document.querySelector('.container');
    container.insertAdjacentHTML('afterbegin', result);
  }
}

const ui = new UI(movies);

ui.paint();
