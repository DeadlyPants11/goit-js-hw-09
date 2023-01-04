import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

const LOCALSTORAGE_KEY = 'feedback-form-state';

const formData = {};

populateForm();

function onInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onSubmit(evt) {
  evt.preventeDefault();
  console.log(formData);

  evt.target.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function populateForm() {
  const savedFormParams = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedFormParams === null) {
    return;
  } 
  try {
    formData = JSON.parse(savedFormParams);
    Object.entries(formData).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  } catch (error) {}
}
