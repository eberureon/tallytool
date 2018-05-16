// Sticky Navigation
window.onscroll = function() { stickyNav() };

const $href = $('a[href^="#"]');
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');
const sticky = navbar.offsetTop + 150;

function stickyNav() {
  if (window.scrollY >= sticky) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
}

// Highlighted Navigation
$(document).ready(function () {
  $(document).on('scroll', onScroll);
  
  //smoothscroll
  $href.on('click', function (e) {
    e.preventDefault();
    $(document).off('scroll');

    $('a').each(function () {
      $(this).removeClass('active');
    })
      $(this).addClass('active');
    
    let target  = this.hash;
        $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top+2
    }, 700, function () {
      $(document).on('scroll', onScroll);
    });
  });
});

function onScroll(event){
  var scrollPos = $(document).scrollTop();
  $('.navbar a').each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr('href'));
    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
      $('.navbar ul a').removeClass('active');
      currLink.addClass('active');
    }
  });
}

// Burger Menu 'X' animation
hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('is-active');
});

// Close Burger Menu when Link clicked
$href.on('click', function () {
  $('.hamburger').removeClass('is-active');
  $('.navbar ul').removeClass('show');
});