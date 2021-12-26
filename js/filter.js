const filterByYear = () => {
  const yearFrom = document.querySelector('.from_input');
  const yearTo = document.querySelector('.to_input');
  // const yearBtn = document.querySelector('year_btn');
  const from = Number(yearFrom.value);
  const to = Number(yearTo.value);
  const filtered = movies.filter((movie) => {
    return movie.year >= from && movie.year <= to;
  });
  ui.paint(filtered);
};

const filterByGenre = () => {
  const select = document.querySelector('.genre_dropdown');
  if (select.value !== '') {
    console.log(select.value);
    const filtered = movies.filter((movie) => {
      return movie.genres.includes(select.value);
    });
    ui.paint(filtered);
  } else {
    ui.paint();
  }
};

const search = () => {
  const target = document.querySelector('.search_input').value;
  const filtered = movies.filter((movie) => {
    return (
      movie.plot.includes(target) ||
      movie.actors.includes(target) ||
      movie.director.includes(target) ||
      movie.genres.includes(target)
    );
  });
  ui.paint(filtered);
};
