import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onMessageInput, 500));

const STORAGE_KEY = 'feedback-form-state';

populateMessage();

// 1
const formData = {};
function onMessageInput(e) {
  //   console.log(e.target.value);
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// 2

function populateMessage() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parseMessage = JSON.parse(savedMessage);
  if (savedMessage) {
    textarea.value = parseMessage.message;
    input.value = parseMessage.email;
  }
}

// 3
function onFormSubmit(e) {
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  e.preventDefault();
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}
