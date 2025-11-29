function openPopup(popupElement) {
  popupElement.classList.remove('popup_hidden');
  document.addEventListener('keydown', handleEscapeKey);
}

function closePopup(popupElement) {
  popupElement.classList.add('popup_hidden');
  document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup:not(.popup_hidden)');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}
