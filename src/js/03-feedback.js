import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onMessageInput, 500));

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

populateMessage();

// 1

function onMessageInput(e) {
  //   console.log(e.target.value);
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// 2

function populateMessage() {
  let savedMessage = localStorage.getItem(STORAGE_KEY);
  // console.log(savedMessage);
  // 1 вытащил строку
  if (savedMessage) {
    const parseMessage = JSON.parse(savedMessage);
    // console.log(parseMessage);
    //2 распарсил( сделал объект)
    Object.entries(parseMessage).forEach(([name, value]) => {
      //4 достал значение ключа (key) и поменять на вхождение (entries )
      console.log(name, value);
      // 5 деструкторизация значений
      formData[name] = value;
      form.elements[name].value = value;
      // console.log(form.elements[name].value);
      // присвоил значения
    });
    // console.log(Object.keys(parseMessage));
    //3 достал значения из объекта
  }
}

// 3
function onFormSubmit(e) {
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  e.preventDefault();
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}
