import Headroom from '../js/lib/headroom.min.js'

function show () {
  $('.nav-menu').addClass('is-active')
  $('.hamburger-button').css('display', 'none')
  $('.prevent-overflow').css('overflow', 'hidden')
  $('html').css('position', 'fixed')
  $('body').css('position', 'fixed')
  $('.secondary-nav-link').addClass('lol')
}

function hide () {
  $('.nav-menu').removeClass('is-active')
  $('.hamburger-button').css('display', 'block')
  $('.prevent-overflow').css('overflow', 'auto')
  $('html').css('position', 'relative')
  $('body').css('position', 'relative')
  $('.secondary-nav-link').removeClass('lol')
}

$('body').on('click', '.login', function () {
  $('.signed-out').hide()
  $('.logged-in-btns').css('display', 'flex')
})

$('body').on('click', '.logout', function () {
  $('.signed-out').show()
  $('.logged-in-btns').css('display', 'none')
})

// mobile-nv menu
$('body').on('click', '.mobile-nav .underlineable', function (e) {
  var lol = $(e.target).parent().find('.dropdown-wrapper')
  if (lol.length === 0) {
    lol = $(e.target).parent()
  }

  if (lol.hasClass('menu-open')) {
    lol.removeClass('menu-open')
    lol.find('.underlineable').remove()
    lol.find('.close-menu').remove()
    $('.nav-menu').css('overflow', 'auto')
  } else {
    lol.prepend('<span class="underlineable">' + $(e.target).text() + '</span><div class="close-menu"><div class="close-menu-inner"></div></div>')
    lol.addClass('menu-open')
    $('.nav-menu').css('overflow', 'hidden')
  }
})

$('body').on('click', '.logout', function () {
  $('.account-menu').removeClass('is-active')
})

// account-menu mobile
$('body').on('click', '.mobile-account-circle', function () {
  hide()
  $('.account-menu').addClass('is-active')
  $('.prevent-overflow').css('overflow', 'hidden')
  $('html').css('position', 'fixed')
  $('body').css('position', 'fixed')
})

$('.demo-hero').click(function () {
  hide()
  $('.account-menu').removeClass('is-active')
  $('.prevent-overflow').css('overflow', 'auto')
  $('html').css('position', 'relative')
  $('body').css('position', 'relative')
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
    $('.account-menu').removeClass('is-active')
  })

  $('body').on('click', '.close-menu', function () {
    $('.account-menu').removeClass('is-active')
    hide()
    $('.menu-open').find('.underlineable').remove()
    $('.menu-open').find('.close-menu').remove()
    $('.menu-open').removeClass('menu-open')
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
  var headroom = new Headroom(myElement)
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
