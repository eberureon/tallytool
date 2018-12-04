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
    });
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

function onScroll(){
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

// Get current Year in Imprint
$('.currentYear').html(new Date().getFullYear());

/* MAIL VALIDATION START */
function checkForCloseMatch(entry, domain) {
    // too many false positives with very short strings
    if (domain.length < 3) return '';

    // test if the domain is in the string (so everything is fine)
    if (entry.includes(domain)) return '';

    // split the domain string into two at each postion e.g. g|mail gm|ail gma|il gmai|l
    // and test that each half exists with one gap
    for (let i = 1; i < domain.length; i++) {
        const firstPart = domain.substring(0, i);
        const secondPart = domain.substring(i);

        // test for wrong letter
        const wrongLetterRegEx = new RegExp(`${firstPart}.${secondPart.substring(1)}`);
        if (wrongLetterRegEx.test(entry)) {
            return entry.replace(wrongLetterRegEx, domain);
        }

        // test for extra letter
        const extraLetterRegEx = new RegExp(`${firstPart}.${secondPart}`);
        if (extraLetterRegEx.test(entry)) {
            return entry.replace(extraLetterRegEx, domain);
        }

        // test for missing letter
        if (secondPart !== 'mail') {
            const missingLetterRegEx = new RegExp(`${firstPart}{0}${secondPart}`);
            if (missingLetterRegEx.test(entry)) {
                return entry.replace(missingLetterRegEx, domain);
            }
        }

        // test for switched letters
        const switchedLetters = [
            domain.substring(0, i - 1),
            domain.charAt(i),
            domain.charAt(i - 1),
            domain.substring(i + 1),
        ].join('');

        if (entry.includes(switchedLetters)) {
            return entry.replace(switchedLetters, domain);
        }
    }

    // if nothing was close, then there wasn't a typo
    return '';
}

function checkForDomainTypo(userEmail) {
    const domains = ['googlemail', 'hotmail', 'outlook', 'yahoo', 'icloud', 'mail'];
    const [leftPart, rightPart] = userEmail.split('@');

    for (let i = 0; i < domains.length; i++) {
        const domain = domains[i];

        const result = checkForCloseMatch(rightPart, domain);

        if (result) return `${leftPart}@${result}`;
    }

    return '';
}

function checkForNameTypo(userEmail, name) {
    const [leftPart, rightPart] = userEmail.split('@');
    const result = checkForCloseMatch(leftPart, name);

    if (result) return `${result}@${rightPart}`;

    return '';
}

function checkForCommonTypos(userInput) {
    const commonTypos = [
        {
            pattern: /,(com|de|org|net)$/,
            fix: str => str.replace(/,(com|de|org|net)$/, '.$1'),
        },
        {
            pattern: /,co\.\w{2}$/,
            fix: str => str.replace(/,(co\.\w{2}$)/, '.$1'),
        },
        {
            pattern: /@\w*$/,
            fix: str => str + '.com',
        },
    ];

    let typo = commonTypos.find(typo => typo.pattern.test(userInput));

    if (typo) return typo.fix(userInput);

    return '';
}

function checkForTypo(userInput) {
    const email = userInput.email.trim().toLowerCase();

    return checkForCommonTypos(email)
        || checkForDomainTypo(email)
        || checkForNameTypo(email, userInput.name === "" || userInput.name.split(/[, ]+/g)[0].trim().toLowerCase())
        || checkForNameTypo(email, userInput.name === "" || userInput.name.split(/[, ]+/g)[1].trim().toLowerCase());
}

const getEl = selector => document.querySelector(selector);

const nameEl = getEl('[name="name"]');
const emailEl = getEl('[name="email"]');
const messageEl = getEl('.valMessage');

let suggestedEmail = '';

function gatherDataAndCheck() {
    suggestedEmail = checkForTypo({
        name: nameEl.value,
        email: emailEl.value,
    });

    if (suggestedEmail) {
        messageEl.textContent = `Meinten Sie ${suggestedEmail}?`;
        messageEl.tabindex = 1;
        messageEl.focus();
    } else {
        messageEl.textContent = '';
    }
}

emailEl.addEventListener('blur', gatherDataAndCheck);

messageEl.addEventListener('click', () => {
    if (suggestedEmail) emailEl.value = suggestedEmail;
    emailEl.focus();
    gatherDataAndCheck();
});
/* MAIL VALIDATION END*/