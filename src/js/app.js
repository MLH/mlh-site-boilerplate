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

function openMobileSubMenu(e) {
  const dropdownOpener = $(e.target).parent().find('.dropdown-wrapper');
  dropdownOpener.addClass('menu-open');
  $('.nav-menu').css('overflow', 'hidden');
}

function closeMobileSubMenu(e) {
  const dropdownOpener = $(e.target).parent();
  dropdownOpener.removeClass('menu-open');
  $('.nav-menu').css('overflow', 'auto');
}

function adjustRevealedNavMenuHeight() {
  const windowHeight = $(window).height();

  for (let i = 0, l = navMenuItems.length; i < l; i += 1) {
    const $revealedMEnu = $(navMenuItems[i]);
    const currentMenuHeight = $revealedMEnu.height();
    if (currentMenuHeight > windowHeight) {
      $revealedMEnu.css('max-height', `${windowHeight - 72}px`);
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
  $('body').on('click', '.nav-section-title', closeMobileSubMenu);

  $(window).resize(() => {
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
