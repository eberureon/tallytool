let closeContainer = document.querySelector('.closeContainer');
let cookieBanner = document.querySelector('.cookieBanner');

closeContainer.addEventListener('click', () => {
  cookieBanner.style.display = 'none';
});
