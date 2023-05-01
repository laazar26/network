import { locale } from 'core-js';
import { getCurrentUser } from './helpers.js';
// prettier-ignore
import { state, getUser, sendUserData, getUserData, createPost } from './model.js';
// import * as model from './model.js';
import 'core-js/stable';
import { async } from 'regenerator-runtime';
import 'regenerator-runtime/runtime';
import { API_URL } from './config.js';

const btnRegister = document.querySelector('.btn--register');
const btnLogin = document.querySelector('.btn--login');
const registerForm = document.querySelector('.register-popup');
// const loginForm

const name = document.querySelector('.name_field').value;
const surname = document.querySelector('.surname_field').value;
const email = document.querySelector('.email_field').value;
const password = document.querySelector('.password_field').value;

const btnPopupLogin = document.querySelectorAll('.btn--popup__login');
const btnPopupRegister = document.querySelectorAll('.btn--popup__register');
const btnClosePopup = document.querySelectorAll('.btn--close-modal');

const registerPopup = document.querySelector('.register-wrapper');
const popup = document.querySelector('.popup');
const loginPopup = document.querySelector('.login-wrapper');
const overlay = document.querySelector('.overlay');

// samo stavi da mi je email i password uzimaju odmah od ID i ovo mogu da obrisem onda
let mailField;
let passField;

const toggleRegisterWin = function () {
  registerPopup.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
  // loginPopup.classList.add('hidden');
};

const toggleLoginWin = function () {
  loginPopup.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

btnRegister.addEventListener('click', function () {
  // registerPopup.classList.remove('hidden');
  // Blur background
  // overlay.classList.toggle('hidden');
  toggleRegisterWin();
});

btnLogin.addEventListener('click', function () {
  // loginPopup.classList.remove('hidden');
  // // Blur background
  // overlay.classList.toggle('hidden');
  toggleLoginWin();
});

btnClosePopup.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const clicked = e.target.closest('.popup');
    if (!clicked) return;

    if (clicked.classList.contains('register')) toggleRegisterWin();
    if (clicked.classList.contains('login')) toggleLoginWin();
  });
});

////////////////////////////////////////////////
////////////////////////////////////////////////

btnPopupLogin.forEach(btn => {
  btn.addEventListener('click', async function (e) {
    e.preventDefault();
    const clicked = e.target.closest('.popup');
    if (!clicked) return;
    // console.log(clicked);

    if (clicked.classList.contains('register')) {
      registerPopup.classList.toggle('hidden');
      loginPopup.classList.toggle('hidden');
    }
    if (clicked.classList.contains('login')) {
      console.log('botton clicked');
      mailField = document.querySelector('#email').value;
      passField = document.querySelector('#password').value;
      console.log(typeof mailField, typeof +passField);
      // Sifra mora da bude string da bi radio login
      await getUserData(mailField, passField);

      // Clear input fields
      mailField = passField = '';
    }
  });
});

////////////////////////////////////////////////
////////////////////////////////////////////////

btnPopupRegister.forEach(btn => {
  btn.addEventListener('click', async function (e) {
    e.preventDefault();
    const clicked = e.target.closest('.popup');
    if (!clicked) return;
    // console.log(clicked);

    if (clicked.classList.contains('register')) {
      const dataArr = [...new FormData(registerForm)];
      const data = Object.fromEntries(dataArr);

      state.user = getUser(data);
      console.log('DEJTA', state.user);

      // Promeni funkciju
      await sendUserData(state.user);
      console.log('send data to database', state.user);
    }
    if (clicked.classList.contains('login')) {
      loginPopup.classList.toggle('hidden');
      registerPopup.classList.toggle('hidden');
    }
  });
});

// getUserData('email@gmail.com', 123);
// alert('test');
const btnLogout = document.querySelector('.btn--logout');
btnLogout.addEventListener('click', function () {
  console.log('click');

  localStorage.removeItem('userId');

  const signupPage = document.querySelector('.signup-section');
  const app = document.querySelector('.app');

  // Show signup page
  signupPage.classList.remove('hidden');
  // Hide app
  app.classList.add('hidden');
});

const btnPost = document.querySelector('.btn--post');
btnPost.addEventListener('click', async function () {
  console.log(state.loggedUser);
  // TODO:
  // 1) Send data to state.postData
  // 2) POST data to mockAPI
  // 3) Render post with user details
});
