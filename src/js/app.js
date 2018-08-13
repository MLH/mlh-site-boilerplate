$(document).ready(function () {
  // Hamburger Menu & Anchor Jump
  // This exists on every page.

  $('.hamburger').click(function () {
    $(this).toggleClass('is-active')
    $('.hamburger-active-menu').fadeToggle()
  })

  $('.hamburger-button').click(function () {
    $('.mobile-nav').addClass('is-active')
    $('.hamburger-button').css('display', 'none')
    $('html').css('overflow', 'hidden')
  })

  $('.close-menu').click(function () {
    $('.mobile-nav').toggleClass('is-active')
    $('.hamburger-button').css('display', 'block')
    $('html').css('overflow', 'auto')
  })

  $('.sub-nav-control').on('click', function (e) {
    var $button = $(e.target)
    if ($button.hasClass('up')) {
      $button.addClass('down')
      $button.removeClass('up')
      $('.mobile').css('display', 'none')
    } else {
      $button.addClass('up')
      $button.removeClass('down')
      $('.mobile').css('display', 'block')
    }
  })

  var prevScrollpos = window.pageYOffset
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset
    if (prevScrollpos > currentScrollPos) {
      $('.site-nav').css('top', '72px')
      $('.global_nav').css('top', '0')
    } else {
      $('.global_nav').css('top', '-72px')
      $('.site-nav').css('top', '0')
    }
    prevScrollpos = currentScrollPos
  }
  if (window.location.pathname !== '/') {
    $('.current-active').text($('a[href="' + window.location.pathname + '"]').html())
  }
  $('a[href="' + window.location.pathname + '"]').addClass('current')
  $('a[href^="#"]').anchorjump()
})
