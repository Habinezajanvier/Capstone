const element = (identifier) => {
  return document.querySelector(identifier);
};

element("#login_frm").onsubmit = (e) => {
  e.preventDefault();
  const email = element("#email").value;
  const password = element("#password").value;
  const form = element("#login_frm");
  element("#frm_submit").innerHTML = "loading...";
  signin(email, password, form);
};

async function signin(email, password, form) {
  let status;
  fetch("https://my-brand-api.herokuapp.com/users/login", {
    method: "POST",
    headers: {
      accept: "application/json, text/plain",
      "content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      form.reset();
      if (status != 200) {
        alert(`Error: ${data.msg || data.error}`);
        element("#frm_submit").innerHTML = "Login";
      } else {
        localStorage.setItem("auth-token", data.token);
        element("#frm_submit").innerHTML = "Login";
        const user = parseJwt(data.token);
        // if (user.isAdmin) {
        //   window.location = "../admin/";
        // }
        window.location = "../admin/";
      }
    })
    .catch((error) => console.log(error));
}
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
