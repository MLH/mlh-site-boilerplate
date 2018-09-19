import './_sass/main.scss';

import 'mlh-styles/index';

import './js/app';

import MLHAuth from 'mlh-javascript';

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
  $('.logged-in-btns').removeClass('active');
  $('.signed-out').removeClass('active');
  $('.account-menu').removeClass('is-active');
}

$(document).ready(() => {
  MLHAuth.login(login);

  $('body').on('click', '.logout', logout);
});
