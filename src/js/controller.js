import { locale } from 'core-js';
import { async } from 'regenerator-runtime';
// prettier-ignore
import { state, getUser, sendUserData, getUserData, createPost, getPostData } from './model.js';
import { AJAX } from './helpers.js';
import { API_URL } from './config.js';
// import * as model from './model.js';
import SignUpView from './views/signUpView.js';
import PostView from '../js/views/postView.js';
import EditProfileView from '../js/views/editProfileView.js';

const btnRegister = document.querySelector('.btn--register');
const btnLogin = document.querySelector('.btn--login');
const registerForm = document.querySelector('.register-popup');

const btnPopupLogin = document.querySelectorAll('.btn--popup__login');
const btnPopupRegister = document.querySelectorAll('.btn--popup__register');
const btnClosePopup = document.querySelectorAll('.btn--close-modal');

const registerPopup = document.querySelector('.register-wrapper');
const loginPopup = document.querySelector('.login-wrapper');

// TODO:
// samo stavi da mi je email i password uzimaju odmah od ID i ovo mogu da obrisem onda
let mailField;
let passField;

btnRegister.addEventListener('click', function () {
  SignUpView.toggleRegisterWin();
});

btnLogin.addEventListener('click', function () {
  SignUpView.toggleLoginPopup();
});

btnClosePopup.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const clicked = e.target.closest('.popup');
    if (!clicked) return;

    if (clicked.classList.contains('register')) SignUpView.toggleRegisterWin();
    if (clicked.classList.contains('login')) SignUpView.toggleLoginPopup();
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

    if (clicked.classList.contains('register'))
      SignUpView.toggleRegisterLoginPopup();

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

const btnAccount = document.querySelector('.btn--account');
btnAccount.addEventListener('click', function () {
  EditProfileView.generateHtml();
});

const btnPost = document.querySelector('.btn--post');
btnPost.addEventListener('click', async function () {
  // TODO:.
  // Create POST request and fill table
  const contentData = document.querySelector('.post-inp').value;
  state.postsData = getPostData(contentData, state.loggedUser.id);
  const res = await AJAX(`${API_URL}posts`, state.postsData);
  console.log('🚀 ~ file: controller.js:149 ~ $:', state.postsData);
  // Render POST on site
  console.log('Render post in container');
  PostView.render();
});

const controlPasswordShowHide = function () {
  const passwordInput = document.getElementById('pass');
  const passwordIcon = document.querySelector('.passwordIcon');
  console.log('handler clicked');
  const type =
    passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';

  passwordInput.setAttribute('type', type);
  passwordIcon.classList.toggle('active');
};

const init = function () {
  localStorage.clear();
  EditProfileView.addHandlerCloseWindow();
  EditProfileView.showHidePassword(controlPasswordShowHide);
};
init();
// getUserData('email@gmail.com', 123);
// alert('test');
