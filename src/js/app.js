$(document).ready(function () {
  // Hamburger Menu & Anchor Jump
  // This exists on every page.

  $('.hamburger').click(function () {
    $(this).toggleClass('is-active')
    $('.hamburger-active-menu').fadeToggle()
  })

  $('a[href^="#"]').anchorjump()

  var url = window.location.href

  $("meta[property='og:url']").attr('href', url)
  $('link[rel=canonical]').attr('content', url)
})
