import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const inputDate = document.querySelector('.datetime-input');
const statDate = document.querySelector('button[data-start');
const dayDate = document.querySelector('span[data-days]');
const hourDate = document.querySelector('span[data-hours]');
const minuteDate = document.querySelector('span[data-minutes]');
const secondDate = document.querySelector('span[data-seconds]');

inputDate.disabled = false;
statDate.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      userSelectedDate = selectedDates[0].getTime();

      statDate.disabled = false;
      statDate.classList.remove('disabled');
    } else {
      iziToast.show({
        message: 'Please choose a date in the future!',
        messageColor: '#fff',
        messageSize: '16px',
        position: 'topRight',
        backgroundColor: '#EF4040',
        close: false,
        closeOnClick: true,
        icon: 'error-svg',
      });

      statDate.classList.add('disabled');
    }
  },
};
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  value = String(value);
  return value.length < 2 ? value.padStart(2, '0') : value;
}

statDate.addEventListener('click', event => {
  statDate.classList.add('disabled');

  const timer = setInterval(() => {
    const diffDate = userSelectedDate - Date.now();
    const timeItem = convertMs(diffDate);
    if (diffDate <= 0) {
      clearInterval(timer);
    } else {
      dayDate.textContent = addLeadingZero(timeItem.days);
      hourDate.textContent = addLeadingZero(timeItem.hours);
      minuteDate.textContent = addLeadingZero(timeItem.minutes);
      secondDate.textContent = addLeadingZero(timeItem.seconds);
    }
  }, 1000);
});
