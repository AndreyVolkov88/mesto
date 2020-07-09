const selectors = {
  elementsItem: ".elements__item",
  elementsRemove: ".elements__remove",
  elementsLike: ".elements__like",
  elementsImage: ".elements__image",
  elementsItemTitle: ".elements__item-title",
};

const classes = {
  elementsLikeActive: "elements__like_active",
};

export default class Card {
  constructor(data, templateSelector, { handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true)
      .querySelector(selectors.elementsItem);

    return cardElement;
  }

  // создание карточки из шаблона и наполнение содержимым
  generateCard() {
    this._element = this._getTemplate();
    this._elementRemove = this._element.querySelector(selectors.elementsRemove);
    this._elementLike = this._element.querySelector(selectors.elementsLike);
    this._elementImage = this._element.querySelector(selectors.elementsImage);
    this._setEventListeners();
    this._element.querySelector(selectors.elementsItemTitle).textContent = this._name;
    this._element.querySelector(selectors.elementsImage).style.backgroundImage = `url(${this._link})`;

    return this._element;
  }

  // удаление карточки при нажатии на "корзину"
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // включение/выключение лайков при нажатии на сердечко
  _toggleLike() {
    this._elementLike.classList.toggle(classes.elementsLikeActive);
  }

  _setEventListeners() {
    this._elementRemove.addEventListener("click", () => this._deleteCard());
    this._elementLike.addEventListener("click", () => this._toggleLike());
    this._elementImage.addEventListener("click", () => this._handleCardClick());
  }
}
