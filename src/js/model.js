import { API_URL, ALERT_SEC } from './config';
import { AJAX, getCurrentUser } from './helpers';
import signUpView from './views/signUpView';
import PostView from './views/postView';
import { setImmediate } from 'core-js';
import { async } from 'regenerator-runtime';
import postView from './views/postView';

const signupPage = document.querySelector('.signup-section');
const app = document.querySelector('.app');

export const state = {
  user: {},
  loggedUser: {},
  postsData: {},
  postId: {},
  likeCount: {},
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

export const getPostData = function (postContent, id) {
  return {
    content: postContent,
    user_id: id,
  };
};

export const sendUserData = async function (userData) {
  try {
    const response = await fetch(`${API_URL}users`);
    const data = await response.json();

    // user with the same email or password can not be made again
    const matchingUser = data.find(
      user => user.email === userData.email && user.name === userData.name
    );

    if (matchingUser) {
      // Popup
      signUpView.toggleUserExistPopup();
      setTimeout(() => signUpView.toggleUserExistPopup(), ALERT_SEC * 1000);
      return matchingUser;
    }

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

    return registerData;
  } catch (err) {
    console.error(`Error sending user details: ${err}`);
  }
};

export const getUserData = async function (email, password) {
  try {
    if (!email && !password) return;
    const res = await fetch(`${API_URL}users`);

    const data = await res.json();
    const user = data.find(
      user => user.email === email && user.password === password
    );

    // if (!user) throw new Error('User doesnt exist');
    // NOTE: User koji se prijavi ubacuje ID u localeStorage i akd se odjavi mora da izbrise taj ID iz localStorage-a2
    localStorage.setItem('userId', JSON.stringify(user));
    getCurrentUser();

    if (user.email === email && user.password === password) {
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

export const sendPostData = async function (data) {
  try {
    const res = await AJAX(`${API_URL}posts`, state.postsData);
  } catch (err) {
    console.error(err);
  }
};

export const getPostId = async function () {
  try {
    const res = await AJAX(`${API_URL}posts`);
    const currentPostId = res.length;
    state.postId = currentPostId;
    // TODO: U STATE UBACI ID KOJI SAM DOBIO OD CURRENTPOSTID I DRUGI PARAMETAR KOJI MI TREBA ZA LIEK API
    // TODO: Znaci res.length treba da bude ID od posta koji se nov pravi, i iz res-a mogu da uzmem ID od usera
  } catch (err) {
    console.error(err);
  }
};

export const sendLikeData = async function (data) {
  try {
    const res = await fetch(`${API_URL}likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

    const resData = await res.json();
  } catch (err) {
    console.error(err);
  }
};

const removeLike = async function (id) {
  try {
    const res = await fetch(`${API_URL}likes/${id}`, { method: 'DELETE' });
    console.log(res);

    if (!res.ok) throw new Error('Object deletion failed');
  } catch (err) {
    console.error(err);
  }
};

export const checklikes = async function (postId) {
  const res = await fetch(`${API_URL}likes`);
  const data = await res.json();

  const counter = data.filter(el => el.post_id === postId);
  const likeCounter = counter.length;

  console.log('model typeof postidL ', typeof postId);
  console.log(counter);
  console.log(likeCounter);

  return (state.likeCount = data.length === 0 ? 0 : likeCounter);
};

export const userAlreadyLiked = async function () {
  try {
    // TODO: logged user se trazi da li je lajkovo post, ako jeste onda treba na sledi klik like button da mu se povuce lajk, ako nije da mu se doda
    const res = await fetch(`${API_URL}likes`);
    const data = await res.json();

    const matchingLike = data.find(el => el.user_id === +state.loggedUser.id);

    if (!matchingLike) {
      await sendLikeData({
        user_id: +state.loggedUser.id,
        post_id: +state.postId,
      });

      checklikes();
      // TODO: 1) UPDATE UI

      return;
    }

    if (matchingLike) {
      // TODO:
      // 1) remove like iz baze bodataka
      console.log('TRUE VALUE', matchingLike.id);
      await removeLike(matchingLike.id);
      // 2) update UI

      console.log(likes);
      return;
    }
  } catch (err) {
    console.error(err);
  }
};
