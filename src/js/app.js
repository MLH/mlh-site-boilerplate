import Headroom from './lib/headroom.min';
import './login';

function disableBodyScroll() {
  $('html,body').addClass('position-fixed');
  $('.prevent-overflow').css('overflow', 'hidden');
}

function enableBodyScroll() {
  $('html,body').removeClass('position-fixed');
  $('.prevent-overflow').css('overflow', 'auto');
}

function showGlobalMenu() {
  $('.nav-menu,.secondary-nav-link').addClass('is-active');
  disableBodyScroll();
}

function resetNavigationState() {
  const $menu = $('.menu-open');

  $menu.find('.underlineable').remove();
  $menu.find('.close-menu').remove();
  $menu.removeClass('menu-open');
}

function hideGlobalMenu() {
  $('.nav-menu,.secondary-nav-link').removeClass('is-active');
  enableBodyScroll();
  resetNavigationState();
}

function showUserMenu() {
  hideGlobalMenu();
  $('.account-menu').addClass('is-active');
  disableBodyScroll();
}

function hideUserMenu() {
  $('.account-menu').removeClass('is-active');
}

// TODO: refactor
function openMobileSubMenu(e) {
  let dropdownOpener = $(e.target).parent().find('.dropdown-wrapper');
  if (dropdownOpener.length === 0) {
    dropdownOpener = $(e.target).parent();
  }

  if (dropdownOpener.hasClass('menu-open')) {
    dropdownOpener.removeClass('menu-open');
    dropdownOpener.find('.underlineable').remove();
    dropdownOpener.find('.close-menu').remove();
    $('.nav-menu').css('overflow', 'auto');
  } else {
    dropdownOpener.prepend(`<span class="underlineable">${$(e.target).text()}</span><div class="close-menu"><div class="close-menu-inner"></div></div>`);
    dropdownOpener.addClass('menu-open');
    $('.nav-menu').css('overflow', 'hidden');
  }
}

function sugnUpForNewsLetter(e) {
  e.preventDefault();

  const email = $('.news-letter-email').val();
  $(e.target).parent()[0].reset();
  // eslint-disable-next-line
  console.log(email);
}

$(document).ready(() => {
  $('.hamburger-button').click(() => {
    showGlobalMenu();
    hideUserMenu();
  });

  $('body').on('click', '.mobile-account-circle', showUserMenu);

  $('body').on('click', '.close-menu', () => {
    hideUserMenu();
    hideGlobalMenu();
  });

  $('body').on('click', '.newsletter-sign-up', sugnUpForNewsLetter);

  // expands sub sections of main nav mobile
  // function needs some work,
  // - don't like prepending html
  // - same function handles both closing and opening the subnav, maybe I should separate them
  // - same element with same class in different location gets clicked for both open and close,
  // might need to change that

  $('body').on('click', '.mobile-nav .underlineable:not(.secondary-nav-link)', openMobileSubMenu);

  // if window is resized when mobile nav is open, closes it
  $(window).resize(() => {
    if ($(window).width() > 1024) {
      hideGlobalMenu();
      hideUserMenu();
    }
  });

  // hide/show nav on scroll
  const globalNav = document.querySelector('.main-nav');
  const headroom = new Headroom(globalNav);
  headroom.init();

  const siteNav = document.querySelector('.site-nav');
  const headroom1 = new Headroom(siteNav);
  headroom1.init();

  // TODO: Remove this in the future
  // It adds underline to active subnav page, can be removed in favor of a
  // helper handlebars function.
  const siteUrl = window.location.href;

  $('.secondary-nav-link').each((i, link) => {
    let linkHref = $(link).attr('href');
    linkHref = linkHref.replace('index.html', '');
    linkHref = linkHref.replace('.html', '');
    if (linkHref[0] === '.') {
      linkHref = linkHref.substr(1);
    }
    if (linkHref && siteUrl.indexOf(linkHref) >= 0) {
      $('.current-active').text($(link).html());
      $(link).addClass('current');
    }
  });

  $('a[href^="#"]').anchorjump();
});
