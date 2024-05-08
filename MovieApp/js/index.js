import { API_URL_POPULAR } from "./components/api/api.component.js";
import { API_KEY } from "./components/api/api.component.js";
import { getClassByRate } from "./components/rating.component.js";
import { openModal } from "./components/modal/modalWindow.component.js";

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
    movieEl.addEventListener("click", () => openModal(movie.kinopoiskId));
    moviesEl.appendChild(movieEl);
  });
}
