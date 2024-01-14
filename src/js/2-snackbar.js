import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const snackForm = document.querySelector('.form-snack');

snackForm.addEventListener('submit', event => {
  event.preventDefault();
  const delayValue = snackForm.delay.value;
  const stateValue = snackForm.state.value;

  const promiseValue = async ({ value, delay, state }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        state === 'fulfilled' ? resolve(value) : reject(value);
      }, delay);
    });
  };
  promiseValue({ value: delayValue, delay: delayValue, state: stateValue })
    .then(value =>
      iziToast.show({
        class: 'access-svg',
        position: 'topRight',
        icon: 'access-svg',
        message: `Fulfilled promise in ${delayValue} ms!`,
        messageColor: '#fff',
        messageSize: '16px',
        backgroundColor: '#59A10D',
        close: false,
        closeOnClick: true,
      })
    )
    .catch(error =>
      iziToast.show({
        class: 'error-svg',
        position: 'topRight',
        icon: 'error-svg',
        message: `Rejected promise in ${delayValue} ms!`,
        messageColor: '#fff',
        messageSize: '16px',
        backgroundColor: '#EF4040',
        close: false,
        closeOnClick: true,
      })
    );
  snackForm.reset();
});
