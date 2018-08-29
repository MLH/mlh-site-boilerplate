import Headroom from '../js/lib/headroom.min.js'

function show () {
  $('.mobile-nav').addClass('is-active')
  $('.hamburger-button').css('display', 'none')
  $('.mobile-nav').animate({opacity: 1}, 200)
  $('html').css('overflow', 'hidden')
}

function hide () {
  $('.mobile-nav').animate({opacity: 0}, 200, function () {
    $('.mobile-nav').removeClass('is-active')
    $('.hamburger-button').css('display', 'block')
    $('html').css('overflow', 'auto')
  })
}

$('body').on('click', '.login', function () {
  $('.login-btns').hide()
  $('.logged-in-btns').css('display', 'flex')
})

$('body').on('click', '.logout', function () {
  $('.login-btns').show()
  $('.logged-in-btns').css('display', 'none')
})

function showSubNav ($button) {
  $button.addClass('up')
  $('.mobile').animate({top: '72px'}, 250, function () {
    $('.secondary-nav-link').addClass('lol')
  })
}

function hideSubNav ($button) {
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

  var myElement = document.querySelector('.main-nav')
  var headroom = new Headroom(myElement, {offset: '72'})
  headroom.init()

  var siteUrl = window.location.href
  $('.secondary-nav-link').each((i, link) => {
    var a = $(link).attr('href')
    a = a.replace('index.html', '')
    a = a.replace('.html', '')
    if (a[0] === '.') {
      a = a.substr(1)
    }
    if (a && siteUrl.indexOf(a) >= 0) {
      $('.current-active').text($(link).html())
      $(link).addClass('current')
    }
  })
  $('a[href^="#"]').anchorjump()
})
