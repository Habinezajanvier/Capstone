const signupFrm = document.getElementById('signup_frm');
const names = document.getElementById('names');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordCfrm = document.getElementById('cfrm_password');
const message = document.getElementById('message');

const verify = (name, email, password, cfrmPassword, form) => {
  const nameFormat = /^[a-z]{2}([a-z][\W]*)/i;
  const emailFormat = /^[a-z][\w-\.]*\@[a-z]+\.[a-z]{2,3}$/;
  const passwordFormat = /^[a-z]{4,}\d+/i;

  if (!nameFormat.test(name.value)) {
    message.style.color = '#88040a';
    message.innerHTML = 'Your name is invalid';
  } else if (!emailFormat.test(email.value)) {
    message.style.color = '#88040a';
    message.innerHTML = 'Your Email is invalid';
  } else if (!passwordFormat.test(password.value)) {
    message.style.color = '#88040a';
    message.innerHTML = 'Your Password should be 4 letter long + digit number';
  } else if (password.value !== cfrmPassword.value) {
    message.style.color = '#88040a';
    message.innerHTML = "Your passwords does't match";
  } else {
    message.innerHTML = '';
    form.reset();
  }
};

signupFrm.onsubmit = (e) => {
  e.preventDefault();
  verify(names, email, password, passwordCfrm, signupFrm);
};
