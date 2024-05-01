const btnNode = document.querySelector(".random-btn");
const imgNode = document.querySelector(".img");
const url = "https://dog.ceo/api/breeds/image/random";

async function fetchHandler() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    imgNode.src = data.message;
  } catch (error) {
    console.log(error);
  }
}

btnNode.addEventListener("click", () => {
  let isLoaded = imgNode.complete;
  if (isLoaded) {
    fetchHandler();
  }
});
