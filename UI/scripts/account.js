//Loging out if someone clicked on logout
element(".logout").addEventListener("click", () => {
  localStorage.removeItem("auth-token");
  window.location = "../login/";
});

function displayImage(photo) {
  return photo
    ? `<img src="${photo}" alt="_avatar_" />`
    : `<img src="../assets/images/dummy-profile-image.png" alt="_avatar_"/>`;
}

function profileData(user) {
  const { fullNames, email, photoURL, phoneNumber, bio } = user;
  return `
          <div class="account-wrapper">
            <div class="profile-reveiw">
              <div class="profile-image">
                ${displayImage(photoURL)}
                <input type="file" name="profile-photo" id="profile-photo" />
              </div>
              <b>${fullNames}</b>
            </div>
            <div class="profile-data">
              <p>${email}</p>
              <p>${phoneNumber || ""}</p>
              <div class="edit-profile" >
                <i class="fas fa-user-plus"></i>Edit profile
              </div>
            </div><!--
            <div class="user-bio">
              <b>Bio</b>
              <p>
                ${bio || ""}
              </p>
            </div>-->
          </div>
  `;
}
function accountSection(user) {
  element("#user-account").innerHTML = profileData(user);
  element(".edit-profile").addEventListener("click", () => {
    profileEdit(user);
  });
}

function profileNavigation(user) {
  const { photoURL, fullNames, email } = user;
  const profile = element("#profile-nav");
  const profilePreview = element(".profile-preview");
  profile.innerHTML = `${displayImage(photoURL)}<span>${
    fullNames || ""
  }</span>`;
  profilePreview.innerHTML = `${displayImage(photoURL)}
  <div class="profile-names">
    <em>${email}</em><br />
    <b>${fullNames || ""}</b>
  </div>`;
}

function profileEditForm(user) {
  const { fullNames, phoneNumber } = user;
  return `
          <form autocomplete="off" id="edit-profile">
          <h3>EDIT YOUR PROFILE</h3>
          <div class='close'><i class="fas fa-window-close"></i></div>
            <label for="Names">
              Full Names
              <input type="text" id="edit-name" value='${
                fullNames || ""
              }' required/>
            </label>
            <!--
            <label for="Names">
              Phone Number
              <input type="text" value='${phoneNumber}' id="edit-phones"/>
            </label>
            -->
            <label for="bio">
              Your Bio
              <textarea
                id="edit-bio"
                rows="10"
              ></textarea>
            </label>
           
            <button>Save Changes</button>
          </form>
`;
}
function profileEdit(user) {
  element("#user-account").innerHTML = profileEditForm(user);
  element(".close").addEventListener("click", () => {
    accountSection(user);
    swithDisplay(
      ".account-wrapper",
      "#adding-article",
      "#dashboard",
      "#articles",
      "#messages"
    );
  });
  element("#edit-profile").addEventListener("submit", (e) => {
    e.preventDefault();
    editProfile(user);
  });
}

function editProfile(user) {
  fullNames = element("#edit-name").value;
  // phoneNumber = element('#edit-phones').value;
  bio = element("#edit-bio").value;
  fetch("https://my-brand-api.herokuapp.com/users/profile", {
    method: "PUT",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
    body: JSON.stringify({
      fullNames,
      // bio,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      accountSection(user);
      swithDisplay(
        ".account-wrapper",
        "#adding-article",
        "#dashboard",
        "#articles",
        "#messages"
      );
    })
    .catch((error) => {
      console.log(error);
    });
}

window.onload = () => {
  const token = localStorage.getItem("auth-token");
  if (!token) {
    window.location = "../login/";
  } else {
    const parseJwt = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
        return null;
      }
    };
    const user = parseJwt(token);
    accountSection(user);
    profileNavigation(user);
  }
};
