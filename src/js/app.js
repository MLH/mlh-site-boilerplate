function show () {
  $('.mobile-nav').addClass('is-active')
  $('.hamburger-button').css('display', 'none')
  $('html').css('overflow', 'hidden')
  $('.mobile-nav').animate({opacity: 1}, 200)
}

function hide () {
  $('.mobile-nav').animate({opacity: 0  }, 200, function () {
    $('.mobile-nav').removeClass('is-active')
    $('.hamburger-button').css('display', 'block')
    $('html').css('overflow', 'auto')
  })
}

function showSubNav ($button) {
  $button.addClass('up')
  $button.removeClass('down')
  $('.mobile').animate({top: '75px'}, 250, function () {
    $('.secondary-nav-link').addClass('lol')
  })
}

function hideSubNav ($button) {
  $button.addClass('down')
  $button.removeClass('up')
  $('.mobile').animate({top: '-300px'}, 250)
  $('.secondary-nav-link').removeClass('lol')
}

$(document).ready(function () {
  // Hamburger Menu & Anchor Jump
  // This exists on every page.

  $('.hamburger').click(function () {
    $(this).toggleClass('is-active')
    $('.hamburger-active-menu').fadeToggle()
  })

  $('.hamburger-button').click(function () {
    show()
  })

  $('.close-menu').click(function () {
    hide()
  })

  $(window).resize(function () {
    if ($(window).width() > 1024) {
      hide()
      hideSubNav($('.sub-nav-control'))
    }
  })

  $('.sub-nav-control').on('click', function (e) {
    var $button = $(e.target)
    if ($button.hasClass('up')) {
      hideSubNav($button)
    } else {
      showSubNav($button)
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
