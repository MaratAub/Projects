import { closeModal } from "../closeModal/closeModal.component.js";

export function closeModalByClick() {
  window.addEventListener("click", (event) => {
    const modalEl = document.querySelector(".modal");
    if (event.target === modalEl) {
      closeModal();
    }
  });
}
