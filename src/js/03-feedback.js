import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onMessageInput, 500));

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

populateMessage();

function onMessageInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateMessage() {
  let savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    const parseMessage = JSON.parse(savedMessage);

    Object.entries(parseMessage).forEach(([name, value]) => {
      formData[name] = value;
      form.elements[name].value = value;
    });
    console.log(Object.keys(parseMessage));
    //3 достал значения из объекта
  }
}

// 3
function onFormSubmit(e) {
  if (input.value === '' || textarea.value === '') {
    window.alert('please fill in all input fields');
    return;
  }

  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  e.preventDefault();
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}
