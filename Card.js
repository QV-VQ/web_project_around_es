class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  _updateLikeState() {
    if (this._isLiked) {
      this._likeIcon.src = './images/heart-active.svg';
      this._likeIcon.setAttribute('data-is-liked', 'true');
    } else {
      this._likeIcon.src = './images/heart.svg';
      this._likeIcon.setAttribute('data-is-liked', 'false');
    }
  }

  setLikeState(isLiked) {
    this._isLiked = isLiked;
    this._updateLikeState();
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  getView() {
    this._element = this._getTemplate();
    
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__icon-container');
    this._deleteButton = this._element.querySelector('.card__delete-icon');
    this._likeIcon = this._element.querySelector('.card__like-icon');
    
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__place-title').textContent = this._name;
    
    this.setLikeState(false);
    this._setEventListeners();

    return this._element;
  }
}