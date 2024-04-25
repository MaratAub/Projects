const itemsNode = document.querySelectorAll(".days");
const countdownNode = document.querySelector(".countdown");

// Назначаем дату отчета
let countdownDate = new Date(2024, 5, 5, 0, 0, 0).getTime();

function getCoundownTime() {
  //Получить текущее время
  const now = new Date().getTime();

  //Найти разницу времени

  const distance = countdownDate - now;

  //1c = 1000mc
  //1m = 60c
  //1h = 60m
  //1d = 24h
  //Создаем переданные в милисекундах

  const oneDay = 1000 * 60 * 60 * 24;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // Подсчет для дней, часов, минут и секунд

  let days = Math.floor(distance / oneDay);
  let hours = Math.floor((distance % oneDay) / oneHour);
  let minutes = Math.floor((distance % oneHour) / oneMinute);
  let seconds = Math.floor((distance % oneMinute) / 1000);

  //Создаем массив с переменными

  const values = [days, hours, minutes, seconds];

  //Добавляем значение переменных на  страницу

  itemsNode.forEach(function (item, index) {
    item.textContent = values[index];
  });

  if (distance < 0) {
    clearInterval(countdown);
    countdownNode.innerHTML = "<h4 class = 'expired' >Время вышло</h4>";
  }
}
//Обновление счетчика кажлую секунду
let countdown = setInterval(getCoundownTime, 1000);

// Инициализация текущего времени
getCoundownTime();
