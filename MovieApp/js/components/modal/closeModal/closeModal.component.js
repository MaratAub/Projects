export function closeModal() {
  const modalEl = document.querySelector(".modal");
  modalEl.classList.remove("modal-show");
  document.body.classList.remove("stop-scrolling");
}
