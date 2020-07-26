const menu = document.querySelector('.fa-bars');
const nav = document.querySelector('nav');
const span = document.querySelector('.span');

let menuStatus = false;
const toggleMenu = () => {
  if (menuStatus) {
    nav.classList.add('static');
    nav.style.display = 'inherit';
    span.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    nav.classList.remove('static');
    nav.style.display = 'none';
    span.innerHTML = '<i class="fas fa-bars">';
  }
};

span.onclick = () => {
  menuStatus = !menuStatus;
  toggleMenu();
};
