import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let input = document.querySelector('#datetime-picker');
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
  value = String(value).padStart(2, ['0']);
  return value;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const data = options.defaultDate;
    if (selectedDates[0].getTime() < data.getTime()) {
      window.alert('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled', 'disabled');
    }
    startBtn.addEventListener('click', () => {
      let difference = selectedDates[0].getTime() - data.getTime();
      if (difference <= 0) {
        clearInterval(timerId);
      }
      const time = setTimeout(() => {
        let timerId = null;
        timerId = setInterval(() => {
          difference = difference - 1000;
          let x = convertMs(difference);
          days.textContent = addLeadingZero(x.days);
          hours.textContent = addLeadingZero(x.hours);
          minutes.textContent = addLeadingZero(x.minutes);
          seconds.textContent = addLeadingZero(x.seconds);
        }, 1000);
      }, 0);
    });
  },
};
flatpickr(input, options);