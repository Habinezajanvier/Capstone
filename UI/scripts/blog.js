const database = firebase.database();
const postRef = database.ref('articles');

const selector = (identifier) => {
  return document.querySelector(identifier);
};

const displayImage = (url) => {
  return url
    ? `<img
    src="${url}"
    alt="article_avatar"
  />`
    : '';
};

function mostLikedArticle(photo, obj) {
  return `<div class='most-liked'>
              ${displayImage(photo)}
            <div class="content-wrapper">
              <h3>Most liked</h3>
              <h2>${obj.title}</h2>
              <div class="like-wrap">
                <p>
                ${obj.body}
                </p>
              </div>
              <div class="article-reactions">
                <div class="likes">
                  <i class="far fa-thumbs-up"></i>
                  ${obj.likes}
                </div>
                <div class="unlikes">
                  <i class="far fa-thumbs-down"></i>
                  ${obj.unlikes}
                </div>
                <div class="comments">
                  <i class="far fa-comments"></i>
                  ${obj.comments}
                </div>
                <div class="share">
                  <i class="fas fa-share-alt"></i>
                  ${obj.shares}
                </div>
              </div>
            </div>
          </div>
    `;
}

function preveiwArticle(photo, title, time, views) {
  const preveiwSection = document.createElement('div');
  preveiwSection.classList.add('single-article-preview');
  preveiwSection.innerHTML = `
    ${displayImage(photo)}
    <div class="article-preveiw">
      <h3>${title}</h3>
      <div class="article-infos">
        <div class="last-edit">
          <i class="fas fa-edit"></i>
          <p>${time || '12-jul-202'}</p>
        </div>
        <div class="views">
          <i class="far fa-eye"></i>
          <p>${views || 0}</p>
        </div>
      </div>
    </div>
  `;
  return preveiwSection;
}

const popularArticle = (photo, obj) => {
  return `<h3>${obj.title}</h3>
            <div class="article-description">
                ${displayImage(photo)}
                <div class="paragraphs">
                ${obj.body}
                </div>
            </div>
            <div class="article-reactions">
                <div class="likes">
                <i class="far fa-thumbs-up"></i>
                ${obj.likes}
                </div>
                <div class="unlikes">
                <i class="far fa-thumbs-down"></i>
                ${obj.unlikes}
                </div>
                <div class="comments">
                <i class="far fa-comments"></i>
                ${obj.comments}
                </div>
                <div class="share">
                <i class="fas fa-share-alt"></i>
                ${obj.shares}
                </div>
            </div>
    `;
};

const updatePreviewSection = () => {
  postRef.on('value', (snap) => {
    const articleIds = Object.keys(snap.val());
    articleIds.forEach((a) => {
      selector('.all-article-list').append(
        preveiwArticle(
          snap.val()[a].imageUrl,
          snap.val()[a].title,
          snap.val()[a].lastEdit,
          snap.val()[a].views.number
        )
      );
    });
  });
};

const updatePopularStory = () => {
  postRef.on('value', (snapshot) => {
    const allViews = [];
    const viewedArticle = [];
    const ids = Object.keys(snapshot.val());
    if (ids.length != 0) {
      ids.forEach((article) => {
        allViews.push(snapshot.val()[article].views.number);
        allViews.sort((a, b) => b - a);

        viewedArticle.push(snapshot.val()[article]);
        const firstArticle = viewedArticle.filter(
          (article) => article.views.number === allViews[0]
        );
        const secondArticle = viewedArticle.filter(
          (article) => article.views.number === allViews[1]
        );
        if (allViews.length > 3) {
          selector('#pop-story-2').innerHTML = '';
          selector('#pop-story-2').innerHTML = popularArticle(
            secondArticle[0].imageUrl,
            secondArticle[0]
          );
        }
        selector('#pop-story-1').innerHTML = '';
        selector('#pop-story-1').innerHTML = popularArticle(
          firstArticle[0].imageUrl,
          firstArticle[0]
        );
      });
    }
  });
};

const updateLikedSection = () => {
  postRef.on('value', (snap) => {
    let likes = [];
    let likedArticle = [];
    const articleIds = Object.keys(snap.val());
    if (articleIds != 0) {
      articleIds.forEach((article) => {
        likes.push(snap.val()[article].likes);
        likedArticle.push(snap.val()[article]);

        const mostLiked = likedArticle.filter(
          (a) => a.likes === Math.max(...likes)
        );

        selector('.w-100').innerHTML = '';
        selector('.w-100').innerHTML = mostLikedArticle(
          mostLiked[0].imageUrl,
          mostLiked[0]
        );
      });
    }
  });
};

window.onload = () => {
  updatePreviewSection();
  updatePopularStory();
  updateLikedSection();
};
