let cookieBanner = document.querySelector('.cookieBanner');

localStorage.hasOwnProperty('closedCookieBanner') ? cookieBanner.style.display = 'none' : '';

document.querySelector('.closeContainer').addEventListener('click', () => {
  cookieBanner.style.display = 'none';
  localStorage.setItem('closedCookieBanner', '1');
});
