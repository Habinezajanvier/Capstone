const contactForm = document.getElementById("contact-frm");
const names = document.getElementById("names");
const contactEmail = document.getElementById("email");
const comment = document.getElementById("comment");
const submitBtn = document.getElementById("cmt_submit");
const error = document.getElementById("error");

const verify = async (names, email, comment, form) => {
  const namesRegex = /^[a-z]{2}([a-z][\W]*)/i;
  const emailFormat = /^[a-z]([\w-\.]|\d)*\@[a-z]+\.[a-z]{2,3}$/;

  if (!namesRegex.test(names.value)) {
    error.innerText = "Your name is not valid";
    names.style.borderColor = "red";
    email.style.borderColor = "black";
  } else if (!emailFormat.test(email.value)) {
    error.innerText = "Your email is not valid";
    email.style.borderColor = "red";
    names.style.borderColor = "black";
  } else if (comment.value.length === 0) {
    email.style.borderColor = "black";
    names.style.borderColor = "black";
    error.innerText = "Empty message can't be submitted";
  } else {
    error.innerHTML = "";
    email.style.borderColor = "black";
    names.style.borderColor = "black";
    await submitMessage(names, email, comment, form);
  }
};

contactForm.onsubmit = (e) => {
  e.preventDefault();
  verify(names, contactEmail, comment, contactForm);
};

async function submitMessage(name, email, message, form) {
  submitBtn.value = "loading...";
  fetch("https://my-brand-api.herokuapp.com/messages", {
    method: "POST",
    headers: {
      accept: "application/json, texp/plain",
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      names: name.value,
      email: email.value,
      message: message.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      submitBtn.value = data.msg;
      setTimeout(() => {
        submitBtn.value = "Send";
        form.reset();
      }, 4000);
    })
    .catch((error) => console.log(error));
}
