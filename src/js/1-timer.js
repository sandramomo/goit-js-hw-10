import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  inputText: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};
refs.startButton.disabled = true;
const timer = {
  intervalId: null,
  userDate: 0,
  start() {
    if (this.intervalId) {
      return;
    }
    this.intervalId = setInterval(() => {
      this.count();
    }, 1000);
    refs.inputText.disabled = true;
    refs.startButton.disabled = true;
  },
  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    refs.inputText.disabled = false;
  },
  count() {
    const currentTime = Date.now();
    const diff = this.userDate.getTime() - currentTime;
    if (diff <= 0) {
      this.stop();
    } else {
      const timeLeft = convertMs(diff);
      console.log(timeLeft);
      timeOnScreen(timeLeft);
    }
  },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timer.userDate = selectedDates[0];
    if (timer.userDate <= Date.now()) {
      iziToast.show({
        message: 'Please choose a date in the future',
      });
      refs.startButton.disabled = true;
      return;
    } else {
      refs.startButton.disabled = false;
    }
  },
};
flatpickr(refs.inputText, options);

refs.startButton.addEventListener('click', () => {
  timer.start();
});

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
function timeOnScreen({ days, hours, minutes, seconds }) {
  refs.timerDays.textContent = pad(days);
  refs.timerHours.textContent = pad(hours);
  refs.timerMinutes.textContent = pad(minutes);
  refs.timerSeconds.textContent = pad(seconds);
}
function pad(value) {
  return String(value).padStart(2, '0');
}