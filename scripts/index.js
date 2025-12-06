// Constants
const initialCards = [
  {
    name: "Berlin",
    link: "./images/berlin.jpg"
  },
  {
    name: "Stuttgart",
    link: "./images/stuttgart.jpg"
  },
  {
    name: "Japan",
    link: "./images/japan.jpg"
  },
  {
    name: "Nagoyan",
    link: "./images/nagoyan.jpg"
  },
  {
    name: "CDMX",
    link: "./images/cdmx.jpg"
  },
  {
    name: "Chichenitza",
    link: "./images/chichenitza.jpg"
  }
];

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// DOM Elements
const profileName = document.querySelector('.nav__name');
const profileDescription = document.querySelector('.nav__job-title');
const profileEditButton = document.querySelector('.nav__button-edit');
const profileAddButton = document.querySelector('.nav__button-add');
const articlesContainer = document.querySelector('.articles');
const editProfilePopup = document.querySelector('#edit-profile-popup');
const addCardPopup = document.querySelector('#add-place-popup');
const imagePopup = document.querySelector('#popup-img-zoom');
const editProfileForm = document.forms['edit-form'];
const addCardForm = document.forms['add-form']; // FIXED: Now selects correct form
const nameInput = document.querySelector('#popup-input-name');
const aboutInput = document.querySelector('#popup-input-description');
const cardTitleInput = document.querySelector('#popup-input-title');
const cardLinkInput = document.querySelector('#form-img-src');
const closeButtons = document.querySelectorAll('.popup__button-close');
const popups = document.querySelectorAll('.popup');

// Form Validators
const editFormValidator = new FormValidator(config, editProfileForm);
const addCardFormValidator = new FormValidator(config, addCardForm);

// Card Management
function handleCardLike(card) {
  const currentState = card.isLiked;
  card.setLikeState(!currentState);
}

function handleCardDelete(card) {
  card.removeCard();
}

function handleCardClick(cardData) {
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__figcaption');

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openPopup(imagePopup);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    '#card-template',
    handleCardClick,
    handleCardDelete,
    handleCardLike
  );
  return card.getView();
}

function renderCard(cardData, container) {
  const cardElement = createCard(cardData);
  container.prepend(cardElement);
}

// Form Handlers
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;

  closePopup(editProfilePopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: cardTitleInput.value,
    link: cardLinkInput.value
  };

  renderCard(newCard, articlesContainer);
  addCardForm.reset();
  addCardFormValidator.resetValidation();
  closePopup(addCardPopup);
}

function renderInitialCards() {
  initialCards.forEach(cardData => {
    renderCard(cardData, articlesContainer);
  });
}

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
  editFormValidator.resetValidation();
}

// Event Listeners
profileEditButton.addEventListener('click', () => {
  fillProfileForm();
  openPopup(editProfilePopup);
});

profileAddButton.addEventListener('click', () => {
  addCardFormValidator.resetValidation();
  addCardForm.reset();
  openPopup(addCardPopup);
});

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// Initialize page
renderInitialCards();
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
