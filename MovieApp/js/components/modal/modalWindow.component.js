// Modal--------------
import { API_URL_MOVIE_DETALS } from "../api/api.component.js";
import { API_KEY } from "../api/api.component.js";
import { buttonClose } from "../modal/btnCloseModal/btnClose.component.js";
import { closeModalByKeydown } from "./closeModal/closeModalByKeydown.component.js";
import { closeModalByClick } from "./closeModal/closeModalByClick.component.js";

export async function openModal(id) {
  const modalEl = document.querySelector(".modal");

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
  buttonClose();
  closeModalByKeydown();
  closeModalByClick();
}
