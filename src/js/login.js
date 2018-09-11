import Cookies from './lib/js.cookie-2.2.0.min';
import CryptoJS from './lib/cryptojs.md5-3.1.2.min';

function updateUserInfo(user) {
  $('.username').text(`${user.first_name} ${user.last_name}`);
  $('.username-short').text(`${user.first_name} ${user.last_name.charAt(0)}.`);
  $('.account-circle').attr('src', user.gravatar);
}

function login(currentUser) {
  updateUserInfo(currentUser);
  $('.logged-in-btns').addClass('active');
  $('.signed-out').addClass('active');
}

function logout() {
  Cookies.remove('mymlh');
  $('.logged-in-btns').removeClass('active');
  $('.signed-out').removeClass('active');
  $('.account-menu').removeClass('is-active');
}

function parseURLHash() {
  const hash = {};

  if (window.location.hash && window.location.hash.length > 0) {
    const params = window.location.hash.substr(1).split('&');
    let param;

    for (let i = 0; i < params.length; i += 1) {
      param = params[i].split('=');
      hash[param[0]] = param[1];
    }

    if (window.history.pushState) {
      window.history.pushState('', '/', window.location.pathname);
    } else {
      window.location.hash = '';
    }
  }

  return hash;
}


$(document).ready(() => {
  const hash = parseURLHash();
  const currentUser = Cookies.getJSON('mymlh');

  if (currentUser) {
    login(currentUser);
  } else if (hash && hash.access_token) {
    const url = `https://my.mlh.io/api/v2/user.json?access_token=${hash.access_token}`;
    $.getJSON(url).done((res) => {
      res.data.gravatar = `https://www.gravatar.com/avatar/${CryptoJS.MD5(res.data.email)}?d=retro`;
      Cookies.set('mymlh', res.data);
      login(res.data);
    }).fail(console.log);
  }

  $('.logout').click(logout);
});
