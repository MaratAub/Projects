import { closeModal } from "../closeModal/closeModal.component.js";

export function buttonClose() {
  const btnClose = document.querySelector(".modal-btn-close");
  btnClose.addEventListener("click", closeModal);
}
