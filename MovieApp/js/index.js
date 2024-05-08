const API_KEY = "3c389bfc-caa5-456b-bdc6-e150ab1456ae";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETALS =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

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
    movieEl.addEventListener("click", () => openModal(movie.kinopoiskId));
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

// Modal--------------

const modalEl = document.querySelector(".modal");

async function openModal(id) {
  const resp = await fetch(API_URL_MOVIE_DETALS + id, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();

  modalEl.classList.add("modal-show");
  document.body.classList.add("stop-scrolling");

  modalEl.innerHTML = `
  <div class="modal-card">
    <img class="modal-movie-backdrop" src="${respData.posterUrl}" alt="${
    respData.nameRu
  }">
    <h2>
        <span class="modal-movie-title">${respData.nameRu} - </span>
        <span class="modal-movie-year">${respData.year} г.</span>
    </h2>
    <ul class="modal-movie-info">
        <div class="loader"></div>
        <li class="movie-modal-genre">Жанр - ${respData.genres.map(
          (el) => `<span>${el.genre}</span>`
        )}</li>
        <li class="movie-modal-runtime ">Время - ${
          respData.filmLength
        } минут</li>
        <li>Сайт : <a class="movie-modal-site" href="${respData.webUrl}">${
    respData.webUrl
  }</a></li>
        <li class="modal-movi-overview">Описание - ${respData.description}</li>
    </ul>
    <button type="button" class="modal-btn-close">Закрыть</button>
  </div>
`;
  const btnClose = document.querySelector(".modal-btn-close");
  btnClose.addEventListener("click", closeModal);
}

function closeModal() {
  modalEl.classList.remove("modal-show");
  document.body.classList.remove("stop-scrolling");
}

window.addEventListener("click", (event) => {
  if (event.target === modalEl) {
    closeModal();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.keyCode === 27) {
    closeModal();
  }
});
