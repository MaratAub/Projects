const API_KEY = "3c389bfc-caa5-456b-bdc6-e150ab1456ae";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

// Меняем класс для рейтинга
function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  // отлавливаем элемент где будут находиться все фильмы
  const moviesEl = document.querySelector(".movies");
  // очищаем предыдущие фильмы
  document.querySelector(".movies").innerHTML = "";

  data.items.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <div class="movie">
        <div class="movie-cover-inner">
            <img class="movie-cover"
                src="${movie.posterUrlPreview}"
            alt="${movie.nameRu}">
            <div class="movie-cover-darkend"></div>
        </div>
        <div class="movie-info">
            <div class="movie-title">${movie.nameRu}</div>
            <div class="movie-category">${movie.genres.map(
              (genre) => ` ${genre.genre}`
            )}</div>
            <div class="movie-average movie-average-${getClassByRate(
              movie.ratingKinopoisk
            )}">${movie.ratingKinopoisk}</div>
        </div>
    </div>
    `;
    moviesEl.appendChild(movieEl);
  });
}

// отлавливаем поиск

const form = document.querySelector("form");
const search = document.querySelector(".header-search");

form.addEventListener("submit", (e) => {
  e.preventDefault(); //сбрасываем перезагрузку страницы после поиска

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});
