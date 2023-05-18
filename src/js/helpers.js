import { API_URL, TIMEOUT_SEC } from './config';
import { state } from './model';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // console.log(res);
    return data;
  } catch (err) {
    // throw err;
  }
};

export const getCurrentUser = function () {
  const userString = localStorage.getItem('userId');
  const user = JSON.parse(userString);

  if (!user) return;
  state.loggedUser = user;

  console.log('CurrentUser', state.loggedUser);
  // return (state.userId = data.id);
};
