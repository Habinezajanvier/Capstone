const signupFrm = document.getElementById('signup_frm');
const names = document.getElementById('names');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordCfrm = document.getElementById('cfrm_password');
const message = document.getElementById('message');

const verify = (name, email, password, cfrmPassword) => {
  const nameFormat = /^[a-z]{2}([a-z][\W]*)/i;
  const emailFormat = /^[a-z][\w-\.]*\@[a-z]+\.[a-z]{2,3}/;
  const passwordFormat = /^[A-Z]\w+\d+\W+/g;

  if (!nameFormat.test(name.value)) {
    message.innerHTML = 'Your name is invalid';
  } else if (emailFormat.test(email.value)) {
    console.log('passed Email');
  } else {
    console.log('Passed');
  }
};

signupFrm.onsubmit = (e) => {
  e.preventDefault();
  verify(names, email, password, passwordCfrm);
};
