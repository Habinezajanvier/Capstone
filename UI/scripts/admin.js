const title = document.getElementById('title');
const description = document.getElementById('article-description');
const articleForm = document.getElementById('add-article');
const submitBtn = document.getElementById('submit-article');

var firebaseConfig = {
  apiKey: 'AIzaSyDXjzhhVxgmcQocADJS8slT0Pi4505RTPU',
  authDomain: 'my-brand-project.firebaseapp.com',
  databaseURL: 'https://my-brand-project.firebaseio.com',
  projectId: 'my-brand-project',
  storageBucket: 'my-brand-project.appspot.com',
  messagingSenderId: '629243722483',
  appId: '1:629243722483:web:661c344ca741d192d51586',
  measurementId: 'G-LM25CW2JGQ',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

articleForm.onsubmit = (e) => {
  e.preventDefault();
  submitBtn.value = 'Loading ...';
  fetch('https://my-brand-project.firebaseio.com/article.json', {
    method: 'POST',
    body: JSON.stringify({
      title: title.value,
      description: description.value,
    }),
  })
    .then((res) => {
      if (res.status != 200) {
        description.style.color = 'red';
        description.value = 'Something went wrong try Again';
      } else {
        res.json();
      }
    })
    .then((data) => {
      articleForm.reset();
      submitBtn.value = 'Success';
      setTimeout(() => {
        submitBtn.value = 'SAVE';
      }, 3000);
    });
};

fetch('https://my-brand-project.firebaseio.com/article.json/', {
  method: 'get',
})
  .then((res) => res.json())
  .then((data) => console.log(data));
