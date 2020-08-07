function cancel() {
  popupStatus = false;
  togglePopup(popupStatus);
}

let popupStatus = false;

document.onclick = (e) => {
  if (e.target.closest('.delete')) {
    popupStatus = true;
    deleteDisplay();
    togglePopup(popupStatus);
  } else if (e.target.closest('.edit')) {
    popupStatus = true;
    editDisplay();
    togglePopup(popupStatus);
  } else if (!e.target.closest('.popup')) {
    popupStatus = false;
    togglePopup(popupStatus);
  }
};

function editDisplay() {
  let editFormcontent = editForm(
    element('h2').innerHTML,
    element('article').innerHTML
  );
  let popupContent = popupText('Edit Article', editFormcontent, 'Save Changes');
  element('.popup').classList.remove('delete-overlay');
  element('.popup').classList.add('edit-overlay');
  element('.popup').innerHTML = popupContent;
}
