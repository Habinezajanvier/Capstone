const urlParams = new URLSearchParams(location.search);
const id = urlParams.get('id');
let comments = [];
let views = [];
let article = {};
let position;

const getArticle = (id) => {
  fetch(`https://my-brand-project.firebaseio.com/articles/${id}.json`)
    .then((res) => res.json())
    .then((data) => {
      if (data.comments) {
        comments = [...data.comments];
      }
      if (data.views) {
        views = [...data.views];
      }
      article = data;
      const displayImage = (url) => {
        return url
          ? `<img class='image';
              src="${url}"
              alt="article_avatar"
            />`
          : '';
      };
      selector('.article-wrap').innerHTML = `
        <h1>${data.title}</h1>
        
        <p>
          ${displayImage(data.imageUrl)}
          ${data.body}
        </p>
        `;
    })
    .catch((error) => console.log(error));
};

function updateAllList(id, photo, title, lastEdit, views) {
  const preveiwSection = document.createElement('div');
  preveiwSection.classList.add('preveiw-wrap');
  preveiwSection.setAttribute('id', `${id}`);
  preveiwSection.innerHTML = `
    ${displayImage(photo)}
    <div class="article-preveiw">
      <h3 class="title">${title}</h3>
      <div class="article-infos">
        <div class="last-edit">
          <i class="fas fa-edit"></i>
          <p>${lastEdit || '12-jul-202'}</p>
        </div>
        <div class="views">
          <i class="far fa-eye"></i>
          <p>${views}</p>
        </div>
      </div>
    </div>
  `;
  return preveiwSection;
}

const updatePreviewSection = () => {
  postRef.on('value', (snap) => {
    selector('.article-lists').innerHTML = '';
    const articleIds = Object.keys(snap.val());
    articleIds.forEach((a) => {
      selector('.article-lists').append(
        updateAllList(
          a,
          snap.val()[a].imageUrl,
          snap.val()[a].title,
          snap.val()[a].lastEdit,
          snap.val()[a].views.length
        )
      );
    });
    document.querySelectorAll('.preveiw-wrap').forEach((element) => {
      element.addEventListener('click', singleArticleRedirection);
    });
  });
};
/**
 * Function to enable comment on article
 */
function submitComment(id, form) {
  const commentsValue = {
    name: selector('#userName').value,
    comment: selector('#comments').value,
  };
  comments.push(commentsValue);
  article.comments = comments;
  article.views = views;
  database.ref('/articles/' + id).set(article, (error) => {
    if (error) {
      console.log(error);
    } else {
      form.reset();
    }
  });
}
selector('#commentFrm').onsubmit = (e) => {
  e.preventDefault();
  const form = selector('#commentFrm');
  submitComment(id, form);
};

/**
 * Getting user location
 */
function userLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      fetch(
        `http://api.positionstack.com/v1/reverse?access_key=86453e71ccf48e07455a05c0b48957e0&query=${pos.coords.latitude},${pos.coords.longitude}`
      )
        .then((res) => res.json())
        .then((data) => {
          position = data.data[0].county;
          updteView(id, position);
          selector(
            '.user-position'
          ).innerHTML = `<i class="fas fa-street-view"></i>${position}`;
        })
        .catch((error) => console.log(error));
    });
  } else {
    return false;
  }
}

/**
 * Update views of article;
 */
function updteView(id, position) {
  views.push(position);
  article.views = views;
  database.ref('/articles/' + id).set(article, (error) => {
    if (error) {
      console.log(error);
    } else {
      return true;
    }
  });
}

/**
 * Return back if back arrow is clicked on
 */
selector('.back-arrow').onclick = () => {
  window.location = './';
};
window.onload = () => {
  getArticle(id);
  updatePreviewSection();
  userLocation();
};
