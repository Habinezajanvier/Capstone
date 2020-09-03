let popStatus = false;

function cancel() {
  popStatus = false;
  togglePopup(popStatus);
}

document.onclick = (e) => {
  if (e.target.closest(".fa-edit")) {
    popStatus = true;
    editDisplay(e);
    togglePopup(popStatus);
  } else if (e.target.closest(".fa-trash-alt")) {
    popStatus = true;
    deleteDisplay(e);
    togglePopup(popStatus);
  } else if (!e.target.closest(".popup")) {
    popStatus = false;
    togglePopup(popStatus);
  }
};

function editDisplay(e) {
  const title =
    e.target.parentNode.parentNode.parentNode.childNodes[0].innerText;
  const articleId = e.target.parentNode.parentNode.parentNode.childNodes[0].id;
  const description = e.target.parentNode.parentNode.childNodes[1].innerHTML;
  let editFormcontent = editForm(title, description);
  let popupContent = popupText(
    "Edit Article",
    editFormcontent,
    "edit-btn",
    "Save Changes"
  );
  element(".popup").classList.remove("delete-overlay");
  element(".popup").classList.add("edit-overlay");
  element(".popup").innerHTML = popupContent;
  element(".edit-btn").onclick = () => {
    editArticle(articleId);
  };
}

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // console.log(user);
//     return true;
//   } else {
//     window.location = '../login/';
//   }
// });
/**
 * function to upload photo for an article to firebase
 */
let url;

element("#article-image").addEventListener("change", (e) => {
  const file = e.target.files[0];
  let storage = firebase.storage();
  let storeageRef = storage.ref(file.name);

  storeageRef.put(file).on(
    "state_changed",
    (snap) => {
      let progress = (snap.bytesTransferred / snap.totalBytes) * 100;
      element("#upload").innerHTML = progress + " %";
      console.log(progress + "%");
    },
    (error) => {
      element("#upload").innerHTML = error.message;
      console.log(error);
    },
    async () => {
      url = await storeageRef.getDownloadURL();
      element("#upload").innerHTML = `<img src='${url}' alt="article-photo">`;
      console.log(url);
    }
  );
});
/**
 * Function to upload an article
 */

element("#add-article").onsubmit = (e) => {
  e.preventDefault();
  let status;
  const article = {
    title: element("#title").value,
    body: element("#article-description").value,
    // imageUrl: url ? url : null,
  };
  element("#submit-article").value = "loading...";
  fetch("https://my-brand-api.herokuapp.com/articles", {
    method: "POST",
    headers: {
      accept: "appliction/json",
      "content-type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
    body: JSON.stringify(article),
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      if (status != 201) {
        alert(`Error: ${data.error || data.msg}`);
      } else {
        element("#submit-article").value = "SAVE";
        element("#upload").innerHTML = "";
        element("#add-article").reset();
      }
    })
    .catch((error) => console.log(error));
  // const newRef = postRef.push();

  // newRef.set(
  //   {
  //     title: element("#title").value,
  //     body: element("#article-description").value,
  //     imageUrl: url ? url : null,
  //     views: [],
  //     likes: 0,
  //     unlikes: 0,
  //     shares: 0,
  //     comments: [],
  //     time: new Date(),
  //   },
  //   (error) => {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       element("#submit-article").value = "SAVE";
  //       element("#upload").innerHTML = "";
  //       element("#add-article").reset();
  //     }
  //   }
  // );
};
/**
 * Appending all articles from DB on Admin dashboard,
 */
function appendArticle(articleId, article) {
  const parentElem = document.createElement("div");
  parentElem.classList.add("one-article");
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
/**
 * Function to display article on admin dashboard
 */
function displayArticle() {
  element("#article-section").innerHTML = "waiting ...";
  let status;
  fetch("https://my-brand-api.herokuapp.com/articles", {
    method: "GET",
    headers: {
      accept: "appliction/json",
      "content-typ": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      if (status === 200) {
        element("#article-section").innerHTML = "";
        data.forEach((arr) => {
          element("#article-section").append(appendArticle(arr._id, arr));
        });
      } else if (status === 404) {
        element("#article-section").innerHTML = data.msg;
      } else {
        alert(`error: ${data.msg || data.error}`);
      }
    })
    .catch((error) => console.log(error));
}

/**
 * Deleting an article from the firebase
 */
function deleteArticle(id) {
  fetch(`https://my-brand-api.herokuapp.com/articles/${id}`, {
    method: "DELETE",
    headers: {
      accept: "appliction/json",
      "content-typ": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
  })
    .then((res) => res.json())
    .then(() => {
      cancel();
      displayArticle();
    })
    .catch((error) => {
      console.log(error);
    });
}

function swithDisplay(show, hide1, hide2, hide3, hide4) {
  element(show).style.display = "flex";

  //Hide everithing that I don't want to display
  element(hide1).style.display = "none";
  element(hide2).style.display = "none";
  element(hide3).style.display = "none";
  element(hide4).style.display = "none";
}

/**
 * Functions to display messages on admin dashboard
 */
// const messageRef = database.ref("messages");

function displayOneMessage(id, elementObj) {
  let messageElement = document.createElement("div");
  messageElement.innerHTML = `<div id='${id}' class="message-view">
    <b>${elementObj.names}</b><br><em>${elementObj.email}</em>
    <p>
      ${elementObj.message}
    </p>
    <div class='message-delete' onclick='deleteMessage("${id}")'><i class="fas fa-trash"></i></div>
  </div>`;
  return messageElement;
}

function displayMessages() {
  let status;
  element("#message-display").innerHTML = "waiting ...";
  fetch("https://my-brand-api.herokuapp.com/messages", {
    method: "GET",
    headers: {
      accept: "appliction/json",
      "content-typ": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      if (status === 404) {
        element("#message-nber").innerHTML = 0;
        element("#message-display").innerHTML = data.msg;
      } else if (status === 200) {
        element("#message-display").innerHTML = "";
        element("#message-nber").innerHTML = data.length;
        data.forEach((arr) => {
          element("#message-display").append(displayOneMessage(arr._id, arr));
        });
      }
    });
}
/**
 * Function to delete message
 */
function deleteMessage(id) {
  fetch(`https://my-brand-api.herokuapp.com/messages/${id}`, {
    method: "DELETE",
    headers: {
      accept: "appliction/json",
      "content-typ": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
  })
    .then((res) => res.json())
    .then(() => {
      element("#message-display").innerHTML = "message Deleted";
      setTimeout(() => {
        displayMessages();
      }, 3500);
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * Function to edit any article from firebase database
 */
function editArticle(id) {
  const title = element("#edit-title").value;
  const body = element("#edit-description").value;
  let data = {
    title,
    body,
  };
  fetch(`https://my-brand-api.herokuapp.com/articles/${id}`, {
    method: "PUT",
    headers: {
      accept: "appliction/json",
      "content-typ": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
    body: JSON.stringify(data),
  });
  // postRef.child(id).update(data, (error) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     cancel();
  //     displayArticle();
  //   }
  // });
}

element(".new-article").addEventListener("click", () => {
  swithDisplay(
    "#adding-article",
    "#dashboard",
    "#articles",
    "#messages",
    ".account-wrapper"
  );
});

element(".dashboard-point").addEventListener("click", () => {
  swithDisplay(
    "#dashboard",
    "#adding-article",
    "#articles",
    "#messages",
    ".account-wrapper"
  );
});

element(".messages-point").addEventListener("click", () => {
  swithDisplay(
    "#messages",
    "#dashboard",
    "#adding-article",
    "#articles",
    ".account-wrapper"
  );
  displayMessages();
});

element(".articles-point").addEventListener("click", () => {
  displayArticle();
  swithDisplay(
    "#articles",
    "#messages",
    "#dashboard",
    "#adding-article",
    ".account-wrapper"
  );
});

element(".article-heads").addEventListener("click", () => {
  swithDisplay(
    "#adding-article",
    "#dashboard",
    "#articles",
    "#messages",
    ".account-wrapper"
  );
});

window.onclick = (e) => {
  if (e.target.matches(".account-point") || e.target.matches(".account")) {
    swithDisplay(
      ".account-wrapper",
      "#adding-article",
      "#dashboard",
      "#articles",
      "#messages"
    );
  }
};
