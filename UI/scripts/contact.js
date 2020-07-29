const contactForm = document.getElementById('contact-frm');
const names = document.getElementById('names');
const contactEmail = document.getElementById('email');
const comment = document.getElementById('comment');

const verify = (names, email, comment, form) => {
  const namesRegex = /^[a-z]{2}([a-z][\W]*)/i;
  const emailFormat = /^[a-z]([\w-\.]|\d)*\@[a-z]+\.[a-z]{2,3}$/;

  if (!namesRegex.test(names.value)) {
    names.setAttribute('placeholder', 'Enter a valid names');
  } else if (!emailFormat.test(email.value)) {
    email.setAttribute('placeholder', 'Enter a valid email');
  } else if (comment.value.length === 0) {
    comment.style.color = '#88040a';
    comment.value = "Empty message can't be sent";
  } else {
    names.setAttribute('placeholder', '');
    email.setAttribute('placeholder', '');
    form.reset();
  }
};

contactForm.onsubmit = (e) => {
  e.preventDefault();
  verify(names, contactEmail, comment, contactForm);
};
