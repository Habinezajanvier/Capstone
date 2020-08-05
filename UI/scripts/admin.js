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
const database = firebase.database();
const postRef = database.ref('articles');
element('#add-article').onsubmit = (e) => {
  e.preventDefault();
  element('#submit-article').value = 'loading...';
  const newRef = postRef.push();

  newRef.set(
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
/**
 * inserting all articles on Admin dashboard,
 */
function appendArticle(articleId, article) {
  const parentElem = document.createElement('div');
  parentElem.classList.add('one-article');
  parentElem.innerHTML = `<div id="${articleId}" class="article-heads">
    <b>${article.title}</b>
    </div>
    <div class="article-description">
    <p>
      ${article.body}
    </p>
    <div class="article-infos">
      <a href="./info.html"><i class="fas fa-info-circle"></i></a>
      <i class="far fa-edit"></i><i class="far fa-trash-alt"></i>
    </div>
    </div>
    </div>`;
  return parentElem;
}

function displayArticle() {
  element('#article-section').innerHTML = 'waiting ...';
  postRef.once('value').then(function (snapshot) {
    let snapshotKeys = Object.keys(snapshot.val());
    if (snapshotKeys.length === 0) {
      element('#article-section').innerHTML = 'No Article is found';
    } else {
      element('#article-section').innerHTML = '';
      snapshotKeys.forEach((arr) => {
        element('#article-section').append(
          appendArticle(arr, snapshot.val()[arr])
        );
      });
    }
  });
}

function swithDisplay(show, hide1, hide2, hide3) {
  element(show).style.display = 'flex';

  //Hide everithing that is not arrArticle element;
  element(hide1).style.display = 'none';
  element(hide2).style.display = 'none';
  element(hide3).style.display = 'none';
}

element('.new-article').addEventListener('click', () => {
  swithDisplay('#adding-article', '#dashboard', '#articles', '#messages');
});

element('.dashboard-point').addEventListener('click', () => {
  swithDisplay('#dashboard', '#adding-article', '#articles', '#messages');
});

element('.messages-point').addEventListener('click', () => {
  swithDisplay('#messages', '#dashboard', '#adding-article', '#articles');
});

element('.articles-point').addEventListener('click', () => {
  displayArticle();
  swithDisplay('#articles', '#messages', '#dashboard', '#adding-article');
});

element('.article-heads').addEventListener('click', () => {
  swithDisplay('#adding-article', '#dashboard', '#articles', '#messages');
});
