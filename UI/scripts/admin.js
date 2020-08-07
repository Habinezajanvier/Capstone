let popStatus = false;

function cancel() {
  popStatus = false;
  togglePopup(popStatus);
}

document.onclick = (e) => {
  if (e.target.closest('.fa-edit')) {
    popStatus = true;
    editDisplay();
    togglePopup(popStatus);
  } else if (e.target.closest('.fa-trash-alt')) {
    popStatus = true;
    deleteDisplay();
    togglePopup(popStatus);
  } else if (!e.target.closest('.popup')) {
    popStatus = false;
    togglePopup(popStatus);
  }
};

function editDisplay() {
  const description = element('.fa-trash-alt').parentNode.parentNode
    .childNodes[1].innerHTML;
  let editFormcontent = editForm('Lorem Ipsum', description);
  let popupContent = popupText('Edit Article', editFormcontent, 'Save Changes');
  element('.popup').classList.remove('delete-overlay');
  element('.popup').classList.add('edit-overlay');
  element('.popup').innerHTML = popupContent;
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // console.log(user);
    return true;
  } else {
    window.location = '../login/';
  }
});

/**
 * function to upload photo for an article to firebase
 */
let url;

element('#article-image').addEventListener('change', (e) => {
  const file = e.target.files[0];
  let storage = firebase.storage();
  let storeageRef = storage.ref(file.name);

  storeageRef.put(file).on(
    'state_changed',
    (snap) => {
      let progress = (snap.bytesTransferred / snap.totalBytes) * 100;
      element('#upload').innerHTML = progress + ' %';
      console.log(progress + '%');
    },
    (error) => {
      element('#upload').innerHTML = error.message;
      console.log(error);
    },
    async () => {
      url = await storeageRef.getDownloadURL();
      element('#upload').innerHTML = `<img src='${url}' alt="article-photo">`;
      console.log(url);
    }
  );
});
/**
 * Function to upload an article on firebase
 */

element('#add-article').onsubmit = (e) => {
  e.preventDefault();
  element('#submit-article').value = 'loading...';
  const database = firebase.database();
  const postRef = database.ref('articles').push();

  postRef.set(
    {
      title: element('#title').value,
      body: element('#article-description').value,
      imageUrl: url ? url : null,
      views: {
        locations: 'none',
        number: 0,
      },
      likes: 0,
      unlikes: 0,
      shares: 0,
      comments: 0,
    },
    (error) => {
      if (error) {
        console.log(error);
      } else {
        element('#submit-article').value = 'SAVE';
        element('#add-article').reset();
      }
    }
  );
};
