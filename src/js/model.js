import { API_URL, ALERT_SEC } from './config';
import { AJAX, getCurrentUser } from './helpers';
import signUpView from './views/signUpView';
import { setImmediate } from 'core-js';
import { async } from 'regenerator-runtime';

const signupPage = document.querySelector('.signup-section');
const app = document.querySelector('.app');

export const state = {
  user: {},
  loggedUser: {},
  postsData: {},
};

export const getUser = function (data) {
  const user = data;
  return {
    first_name: user.name,
    last_name: user.surname,
    email: user.email,
    password: user.password,
  };
};

export const getPostData = function (data) {
  return {
    content: data.content,
    userId: state.loggedUser.userId,
  };
};

export const sendUserData = async function (userData) {
  try {
    // Check does user exist
    // TODO: NAPRAVITI DA AJAX FUNKCIJA RADI OVDE
    // TODO: Pod znakom pitanja sto AJAX funkcija ne radi, greska je u istoj 90% Ili mozda samo u ovom primeru ence da radi
    // const response = await AJAX(`${API_URL}users`);
    const response = await fetch(`${API_URL}users`);
    const data = await response.json();
    console.log('DEJTA26', data);

    // user with the same email or password can not be made again
    const matchingUser = data.find(
      user => user.email === userData.email && user.name === userData.name
    );

    if (matchingUser) {
      console.log('User already exist');
      // Popup
      signUpView.toggleUserExistPopup();
      setTimeout(() => signUpView.toggleUserExistPopup(), ALERT_SEC * 1000);
      return matchingUser;
    }

    console.log('userData: ', userData);

    const res = await fetch(`${API_URL}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const registerData = await res.json();
    if (registerData) {
      // Popup
      signUpView.toggleUserSuccessPopup();
      setTimeout(() => signUpView.toggleUserSuccessPopup(), ALERT_SEC * 1000);
    }

    console.log('user details sent:', registerData);

    return registerData;
  } catch (err) {
    console.error(`Error sending user details: ${err}`);
  }
};

export const getUserData = async function (email, password) {
  try {
    const res = await fetch(`${API_URL}users`);

    const data = await res.json();
    const user = data.find(
      user => user.email === email && user.password === password
    );

    // if (!user) throw new Error('User doesnt exist');
    console.log(email, password);
    console.log('Data: ', data);
    console.log('user data: ', typeof user);
    // NOTE: User koji se prijavi ubacuje ID u localeStorage i akd se odjavi mora da izbrise taj ID iz localStorage-a2
    localStorage.setItem('userId', JSON.stringify(user));
    getCurrentUser();

    if (user.email === email && user.password === password) {
      console.log('loginnnn');
      // hidde login popup and overlay
      signUpView.toggleLoginPopup();
      // hidde signup page
      signupPage.classList.add('hidden');
      // show app
      app.classList.remove('hidden');
    }
  } catch (err) {
    console.error(`Error finding user: ${err}`);
  }
};

export const createPost = async function (data) {
  const res = await AJAX(`${API_URL}posts`, state.postsData);
  console.log(data);
};
