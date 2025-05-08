const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const navBar = document.querySelector('.barra-nav');

let lastScrollY = window.scrollY;

function closeMenu() {
  menuToggle.checked = false;
  navLinks.classList.remove('active');
}

function handleMenuToggle() {
  if (menuToggle.checked) {
    navLinks.classList.add('active');
  } else {
    navLinks.classList.remove('active');
  }
}

function handleOutsideClick(event) {
  if (!navLinks.contains(event.target) && !document.getElementById('menu-btn').contains(event.target)) {
    closeMenu();
  }
}

menuToggle.addEventListener('change', handleMenuToggle);
document.addEventListener('click', handleOutsideClick);
document.addEventListener('touchstart', handleOutsideClick);
navLinks.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    closeMenu();
  }
});