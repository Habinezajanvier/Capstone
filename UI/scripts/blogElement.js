const database = firebase.database();
const postRef = database.ref("articles");

const selector = (identifier) => {
  return document.querySelector(identifier);
};

const displayImage = (url) => {
  return url
    ? `<img class='image';
    src="${url}"
    alt="article_avatar"
  />`
    : "";
};

function mostLikedArticle(photo, obj, id) {
  return `<div class='most-liked'>
              ${displayImage(photo)}
            <div class="content-wrapper">
              <h3>Most liked</h3>
              <h2 id='${id}'>${obj.title}</h2>
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

function preveiwArticle(id, photo, title, time, views) {
  const preveiwSection = document.createElement("div");
  preveiwSection.classList.add("single-article-preview");
  preveiwSection.setAttribute("id", `${id}`);
  preveiwSection.innerHTML = `
    ${displayImage(photo)}
    <div class="article-preveiw">
      <h3 class='title'>${title}</h3>
      <div class="article-infos">
        <div class="last-edit">
          <i class="fas fa-edit"></i>
          <p>${time || "12-jul-202"}</p>
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

function singleArticleRedirection(e) {
  let ids = "";
  switch (e.target.className) {
    case "fas fa-edit":
      ids = e.target.parentNode.parentNode.parentNode.parentNode.id;
      window.location.href = `./article.html?id=${ids}`;
      break;
    case "fas fa-share-alt":
      ids = e.target.parentNode.parentNode.parentNode.parentNode.id;
      window.location.href = `./article.html?id=${ids}`;
      break;
    case "last-edit":
      ids = e.target.parentNode.parentNode.parentNode.id;
      window.location.href = `./article.html?id=${ids}`;
      break;
    case "article-infos":
      ids = e.target.parentNode.parentNode.id;
      window.location.href = `./article.html?id=${ids}`;
      break;
    case "title":
      ids = e.target.parentNode.parentNode.id;
      window.location.href = `./article.html?id=${ids}`;
      break;
    case "image":
      ids = e.target.parentNode.id;
      window.location.href = `./article.html?id=${ids}`;
      break;
    default:
      if (e.target.id != "") {
        ids = e.target.id;
        window.location.href = `./article.html?id=${ids}`;
      }
  }
}
