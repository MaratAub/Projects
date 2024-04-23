const buttonNode = document.getElementById("btn");
const colorNode = document.getElementById("color");

buttonNode.addEventListener("click", () => {
  document.body.style.backgroundColor = generateRandomColor();
  colorNode.textContent = generateRandomColor();
});

function generateRandomColor() {
  const hexCodes = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return "#" + color;
}
