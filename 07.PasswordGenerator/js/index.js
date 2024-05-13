// Создать input
// Добавить class
// Добавить placeholder
// Сбросить стандартное поведение инпута
// Добавить обработчик по нажатию
// Добавить Кнопку скопировать
// Добавить кнопку сгенерировать
// Создать функцию генерации пароля

const mainEl = document.querySelector(".main");

const passwordEl = document.createElement("input");
passwordEl.classList.add("password");
passwordEl.setAttribute("placeholder", "Сгенерировать пароль");
passwordEl.addEventListener("keypress", (e) => {
  e.preventDefault(); //сбрасываем стандартное поведение(не можем писать в инпут)
});
passwordEl.addEventListener("focus", (e) => {
  navigator.clipboard.writeText(passwordEl.value);
});

//-----Button copy-----

const btnCopy = document.createElement("button");
btnCopy.innerText = "Copy";
btnCopy.classList.add("password-button");
btnCopy.addEventListener("click", () => {
  passwordEl.select(); //выделение элемента
  passwordEl.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(passwordEl.value);
});

//-----Button generate-----

const btnGenerate = document.createElement("button");
btnGenerate.innerText = "Generate";
btnGenerate.classList.add("password-button");
btnGenerate.addEventListener("click", (e) => {
  // Вызов функции генерации пароля
  let password = generatePassword(12);
  passwordEl.value = password;
});

mainEl.appendChild(passwordEl);
mainEl.appendChild(btnCopy);
mainEl.appendChild(btnGenerate);

// Функции генерации пароля------------------------------

function generatePassword(length) {
  // Список всех возможных символов для пароля
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

  // Инициализация пустой строки для пароля
  let password = "";

  // Создание цикла для генерации случайных символов
  for (let i = 0; i < length; i++) {
    // Получение случайного числа в диапазоне от 0 до длины списка символов
    const randomIndex = Math.floor(Math.random() * characters.length);

    // Добавление случайного символа к паролю
    password += characters[randomIndex];
  }

  // Возвращение сгенерированного пароля
  return password;
}
