import { closeModal } from "../closeModal/closeModal.component.js";

export function closeModalByKeydown() {
  window.addEventListener("keydown", (event) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  });
}
