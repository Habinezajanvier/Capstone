const element = (identifier) => {
  return document.querySelector(identifier);
};

const popupText = (heading, content, confirmation) => {
  return `
      <h5>${heading}</h5>
      <div class='content-wrapper'>${content}</div>
      <div class='decision'><button onclick=cancel()>Cancel</button>
      <button>${confirmation}</button></div>
      `;
};

function togglePopup(popupStatus) {
  if (popupStatus) {
    element('.popup').style.display = 'flex';
    element('.shield').style.display = 'inherit';
  } else {
    element('.popup').style.display = 'none';
    element('.shield').style.display = 'none';
  }
}

const editForm = (title, description) => {
  return `
          <form autocomplete="off" id="edit-article">
            <label for="title">
              <p>Title</p>
              <input type="text" id="edit-title" value='${title}' />
            </label>
            <label for="description">
              <p>Description</p>
              <textarea
                id="edit-description"
                rows="12"
              >${description}</textarea>
            </label>
            <label for="image">
              <p>Add Image</p>
              <input
                type="file"
                name="image"
                id="article-image"
                accept="image/*"
              /> </label
            ><br />
            <input type="submit" value="SAVE" id="submit-article" />
          </form>
        `;
};

function deleteDisplay() {
  let content =
    'The action you want to take on this article is irreversible.<br> Do you really want to continue';

  let popupContent = popupText('Warning', content, 'Delete');
  element('.popup').classList.remove('edit-overlay');
  element('.popup').classList.add('delete-overlay');
  element('.popup').innerHTML = popupContent;
}
