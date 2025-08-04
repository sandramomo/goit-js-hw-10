import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', formLoginSubmitHandler);

function formLoginSubmitHandler(event) {
  event.preventDefault();
  const promiseParams = getUserData();
  createPromise(promiseParams);
  refs.form.reset();
}

function getUserData() {
  const formData = new FormData(refs.form);
  const delay = formData.get('delay');
  const state = refs.form.elements.state.value;
  const userInfo = {
    delay: +delay,
    state: state,
  };
  return userInfo;
}
function createPromise({ delay, state }) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`${delay}`);
      } else {
        reject(`${delay}`);
      }
    }, delay);
  });
  promise
    .then(good =>
      iziToast.show({
        message: `✅ Fulfilled promise in ${good}ms`,
      })
    )
    .catch(err =>
      iziToast.show({
        message: `❌ Rejected promise in ${err} ms`,
      })
    );
}
