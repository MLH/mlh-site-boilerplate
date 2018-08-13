$(document).ready(function () {
  // Hamburger Menu & Anchor Jump
  // This exists on every page.

  $('.hamburger').click(function () {
    $(this).toggleClass('is-active')
    $('.hamburger-active-menu').fadeToggle()
  })

  $('a[href^="#"]').anchorjump()

  var location = window.location
  var pathname = location.pathname.replace('index.html', '')
  var canonicalUrl = location.protocol + '//' + location.host + pathname

  $("meta[property='og:url']").attr('content', canonicalUrl)
  $('link[rel=canonical]').attr('href', canonicalUrl)
})
