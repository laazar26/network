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
    if (!email && !password) return;
    const res = await fetch(`${API_URL}users`);

    const data = await res.json();
    const user = data.find(
      user => user.email === email && user.password === password
    );

    // if (!user) throw new Error('User doesnt exist');
    console.log(email, password);
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
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

export const getPostId = async function () {
  try {
    const res = await AJAX(`${API_URL}posts`);
    const currentPostId = res.length;
    state.postId = currentPostId;
    console.log('getPostIdState:', res.length);
    // TODO: U STATE UBACI ID KOJI SAM DOBIO OD CURRENTPOSTID I DRUGI PARAMETAR KOJI MI TREBA ZA LIEK API
    // TODO: Znaci res.length treba da bude ID od posta koji se nov pravi, i iz res-a mogu da uzmem ID od usera
  } catch (err) {
    console.log(err);
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
    console.log(resData);
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

      // TODO: 1) UPDATE UI
    }

    if (matchingLike) {
      // TODO:
      // 1) remove like iz baze bodataka
      console.log('TRUE VALUE', matchingLike.id);
      await removeLike(matchingLike.id);
      // 2) update UI
      const likeRes = await fetch(`${API_URL}likes`);
      const likeData = await likeRes.json();
      const likes = likeData.length;
      state.likeCount = likes;
      console.log(likes);
      console.log('update UI');
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
