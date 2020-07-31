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

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDXjzhhVxgmcQocADJS8slT0Pi4505RTPU',
  authDomain: 'my-brand-project.firebaseapp.com',
  databaseURL: 'https://my-brand-project.firebaseio.com',
  projectId: 'my-brand-project',
  storageBucket: 'my-brand-project.appspot.com',
  messagingSenderId: '629243722483',
  appId: '1:629243722483:web:661c344ca741d192d51586',
  measurementId: 'G-LM25CW2JGQ',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
