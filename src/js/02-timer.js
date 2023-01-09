import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

startBtn.setAttribute('disabled', 'disabled');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, ['0']);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    validateDatetime(selectedDates, options);
    startBtn.addEventListener('click', () => {
      let difference = selectedDates.getTime() - options.defaultDate;

      setTimeout(() => {
        let timerId = null;
        tick(difference);
      }, 0);
    });
  },
};

function validateDatetime(selectedDates, options) {
  if (selectedDates.getTime() < options.defaultDate) {
    alert('Please choose a date in the future');
  } else {
    startBtn.removeAttribute('disabled', 'disabled');
  }
}

function tick(difference) {
  timerId = setInterval(() => {
    difference = difference - 1000;

    if (difference <= 1000) {
      clearInterval(timerId);
    }
    transformValues(difference);
  }, 1000);
}

function transformValues(difference) {
  const x = convertMs(difference);
  days.textContent = addLeadingZero(x.days);
  hours.textContent = addLeadingZero(x.hours);
  minutes.textContent = addLeadingZero(x.minutes);
  seconds.textContent = addLeadingZero(x.seconds);
}

flatpickr(input, options);
