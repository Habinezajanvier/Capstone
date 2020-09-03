const signupFrm = document.getElementById("signup_frm");
const names = document.getElementById("names");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordCfrm = document.getElementById("cfrm_password");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

const verify = (name, email, password, cfrmPassword, form) => {
  const nameFormat = /^[a-z]{2}([a-z][\W]*)/i;
  const emailFormat = /^[a-z][\w-\.]*\@[a-z]+\.[a-z]{2,3}$/;
  const passwordFormat = /^[a-z]{4,}\d+/i;

  if (!nameFormat.test(name.value)) {
    message.style.color = "#88040a";
    message.innerHTML = "Your name is invalid";
  } else if (!emailFormat.test(email.value)) {
    message.style.color = "#88040a";
    message.innerHTML = "Your Email is invalid";
  } else if (!passwordFormat.test(password.value)) {
    message.style.color = "#88040a";
    message.innerHTML = "Your Password should be 4 letter long + digit number";
  } else if (password.value !== cfrmPassword.value) {
    message.style.color = "#88040a";
    message.innerHTML = "Your passwords don't match";
  } else {
    submitBtn.innerHTML = "Loading...";
    signup(email.value, names.value, password.value, form);
  }
};

signupFrm.onsubmit = (e) => {
  e.preventDefault();
  verify(names, email, password, passwordCfrm, signupFrm);
};

let signupSucceed = false;
async function signup(email, names, password, form) {
  let status;
  const user = {
    fullNames: names,
    email,
    password,
  };
  fetch("https://my-brand-api.herokuapp.com/users/signup", {
    method: "POST",
    headers: {
      accept: "application/json, texp/plain",
      "content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      form.reset();
      if (status != 201) {
        message.style.color = "#88040a";
        message.innerHTML = data.msg || data.error;
        submitBtn.innerHTML = "Sign up";
      } else {
        localStorage.setItem("auth-token", data.token);
        message.innerHTML = data.msg;
        setTimeout(() => {
          window.location = "../admin/";
          message.innerHTML = "";
        }, 4000);
      }
    });
}
