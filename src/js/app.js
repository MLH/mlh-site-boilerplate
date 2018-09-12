import Headroom from './lib/headroom.min';
import './login';

const navMenuItems = $('.nav-content .revealed-menu');

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

function hideShowNavOnScroll(className) {
  const nav = document.querySelector(className);
  const headroom = new Headroom(nav);
  headroom.init();
}

// TODO: refactor
// expands sub sections of main nav mobile
// function needs some work,
// - don't like prepending html
// - same function handles both closing and opening the subnav, maybe I should separate them
// - same element with same class in different location gets clicked for both open and close,
// might need to change that
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

function adjustRevealedNavMenuHeight() {
  const windowHeight = $(window).height();

  for (let i = 0, l = navMenuItems.length; i < l; i++) {
    const $revealedMEnu = $(navMenuItems[i]);
    const currentMenuHeight = $revealedMEnu.height();
    if (currentMenuHeight > windowHeight) {
      $revealedMEnu.css('max-height', `${windowHeight}px`);
    } else {
      $revealedMEnu.css('max-height', 'unset');
    }
  }
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

  $('body').on('click', '.mobile-nav .underlineable:not(.secondary-nav-link)', openMobileSubMenu);

  $(window).resize(() => {
    console.log('i werked');
    if ($(window).width() > 1024) {
      hideGlobalMenu();
      hideUserMenu();
    }

    adjustRevealedNavMenuHeight();
  });

  hideShowNavOnScroll('.main-nav');
  hideShowNavOnScroll('.site-nav');

  adjustRevealedNavMenuHeight();
  $('a[href^="#"]').anchorjump();
});
