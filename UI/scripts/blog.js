const updatePreviewSection = () => {
  let status;
  fetch("https://my-brand-api.herokuapp.com/articles")
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      if (status === 200) {
        data.forEach((a) => {
          selector(".all-article-list").append(
            preveiwArticle(a._id, a.imageUrl, a.title, a.date, a.views)
          );
        });
        document
          .querySelectorAll(".single-article-preview")
          .forEach((element) => {
            element.addEventListener("click", singleArticleRedirection);
          });
      } else {
        selector(".all-article-list").innerHTML = data.error || data.msg;
      }
    })
    .catch((error) => console.log(error));
};

const updatePopularStory = () => {
  postRef.on("value", (snapshot) => {
    const allViews = [];
    const viewedArticle = [];
    const ids = Object.keys(snapshot.val());
    if (ids.length != 0) {
      ids.forEach((article) => {
        allViews.push(snapshot.val()[article].views.length);
        allViews.sort((a, b) => b - a);

        viewedArticle.push(snapshot.val()[article]);
        const firstArticle = viewedArticle.filter(
          (article) => article.views.length === allViews[0]
        );
        const secondArticle = viewedArticle.filter(
          (article) => article.views.length === allViews[1]
        );
        if (allViews.length >= 3) {
          selector("#pop-story-2").innerHTML = "";
          selector("#pop-story-2").innerHTML = popularArticle(
            secondArticle[0].imageUrl,
            secondArticle[0]
          );
        }
        selector("#pop-story-1").innerHTML = "";
        selector("#pop-story-1").innerHTML = popularArticle(
          firstArticle[0].imageUrl,
          firstArticle[0]
        );
      });
    }
  });
};

const updateLikedSection = () => {
  postRef.on("value", (snap) => {
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

        selector(".w-100").innerHTML = "";
        selector(".w-100").innerHTML = mostLikedArticle(
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
