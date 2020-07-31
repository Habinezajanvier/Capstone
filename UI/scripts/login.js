const element = (identifier) => {
  return document.querySelector(identifier);
};

let signedInSucceed = false;

element('#login_frm').onsubmit = (e) => {
  e.preventDefault();
  const email = element('#email').value;
  const password = element('#password').value;
  const form = element('#login_frm');
  element('#frm_submit').innerHTML = 'loading...';
  signin(email, password, form);
};

async function signin(email, password, form) {
  signedInSucceed = true;

  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function (error) {
      signedInSucceed = false;
      var errorMessage = error.message;
      alert('Error: ' + errorMessage);
    });
  checkSignip(form);
}
function checkSignip(form) {
  element('#frm_submit').innerHTML = 'Login';
  if (signedInSucceed) {
    form.reset();
    window.location = '../admin/';
  }
}
