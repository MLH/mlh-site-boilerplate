$(document).ready(function () {
  // Hamburger Menu & Anchor Jump
  // This exists on every page.

  $('.hamburger').click(function () {
    $(this).toggleClass('is-active')
    $('.hamburger-active-menu').fadeToggle()
  })

  $('.hamburger-button').click(function () {
    $('.mobile-nav').toggleClass('is-active')
  })

  $('.close-menu').click(function () {
    $('.mobile-nav').toggleClass('is-active')
  })

  $('a[href^="#"]').anchorjump()
})
