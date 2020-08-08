const updatePreviewSection = () => {
  postRef.on('value', (snap) => {
    const articleIds = Object.keys(snap.val());
    articleIds.forEach((a) => {
      selector('.all-article-list').append(
        preveiwArticle(
          a,
          snap.val()[a].imageUrl,
          snap.val()[a].title,
          snap.val()[a].lastEdit,
          snap.val()[a].views.number
        )
      );
    });
    document.querySelectorAll('.single-article-preview').forEach((element) => {
      element.addEventListener('click', singleArticleRedirection);
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
