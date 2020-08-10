//Loging out if someone clicked on logout
element('.logout').addEventListener('click', () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location = '../login/';
    })
    .catch((error) => {
      console.log(error);
    });
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    profileNavigation(user);
    accountSection(user);
  }
});

function displayImage(photo) {
  return photo
    ? `<img src="${photo}" alt="_avatar_" />`
    : `<img src="../assets/images/dummy-profile-image.png" alt="_avatar_"/>`;
}

function profileData(user) {
  const { displayName, email, photoURL, phoneNumber, bio } = user;
  return `
          <div class="account-wrapper">
            <div class="profile-reveiw">
              <div class="profile-image">
                ${displayImage(photoURL)}
                <input type="file" name="profile-photo" id="profile-photo" />
              </div>
              <b>${displayName}</b>
            </div>
            <div class="profile-data">
              <p>${email}</p>
              <p>${phoneNumber || ''}</p>
              <div class="edit-profile" >
                <i class="fas fa-user-plus"></i>Edit profile
              </div>
            </div><!--
            <div class="user-bio">
              <b>Bio</b>
              <p>
                ${bio || ''}
              </p>
            </div>-->
          </div>
  `;
}
function accountSection(user) {
  element('#user-account').innerHTML = profileData(user);
  element('.edit-profile').addEventListener('click', () => {
    profileEdit(user);
  });
}

function profileNavigation(user) {
  const { photoURL, displayName, email } = user;
  const profile = element('#profile-nav');
  const profilePreview = element('.profile-preview');
  profile.innerHTML = `${displayImage(photoURL)}<span>${
    displayName || ''
  }</span>`;
  profilePreview.innerHTML = `${displayImage(photoURL)}
  <div class="profile-names">
    <em>${email}</em><br />
    <b>${displayName || ''}</b>
  </div>`;
}

function profileEditForm(user) {
  const { displayName, phoneNumber } = user;
  return `
          <form autocomplete="off" id="edit-profile">
          <h3>EDIT YOUR PROFILE</h3>
          <div class='close'><i class="fas fa-window-close"></i></div>
            <label for="Names">
              Full Names
              <input type="text" id="edit-name" value='${
                displayName || ''
              }' required/>
            </label>
            <!--
            <label for="Names">
              Phone Number
              <input type="text" value='${phoneNumber}' id="edit-phones"/>
            </label>
            <label for="bio">
              Your Bio
              <textarea
                id="edit-bio"
                rows="10"
              ></textarea>
            </label>
            -->
            <button>Save Changes</button>
          </form>
`;
}
function profileEdit(user) {
  element('#user-account').innerHTML = profileEditForm(user);
  element('.close').addEventListener('click', () => {
    accountSection(user);
    swithDisplay(
      '.account-wrapper',
      '#adding-article',
      '#dashboard',
      '#articles',
      '#messages'
    );
  });
  element('#edit-profile').addEventListener('submit', (e) => {
    e.preventDefault();
    editProfile(user);
  });
}

function editProfile(user) {
  displayName = element('#edit-name').value;
  // phoneNumber = element('#edit-phones').value;
  // bio = element('#edit-bio').value;
  user
    .updateProfile({
      displayName,
    })
    .then(() => {
      console.log('user updated successfully');
    })
    .catch((error) => {
      console.log(error);
    });
}
