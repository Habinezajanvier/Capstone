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
