import { selectors, classes } from "../utils/constants.js";

export default class Card {
  constructor(
    data,
    templateSelector,
    { handleCardClick, handleButtonRemove, handleButtonLike }
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleButtonRemove = handleButtonRemove;
    this._handleButtonRemove = this._handleButtonRemove.bind(this);
    this._handleButtonLike = handleButtonLike;
    this._handleButtonLike = this._handleButtonLike.bind(this);
  }

  //Получить шаблон разметки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true)
      .querySelector(selectors.element);

    return cardElement;
  }

  // создание карточки из шаблона и наполнение содержимым
  generateCard(id) {
    this._element = this._getTemplate();
    this._elementLikeCounter = this._element.querySelector(
      selectors.elementLikeCounter
    );
    this._elementRemove = this._element.querySelector(selectors.elementRemove);
    if (id === "68d75b0661b87ec7db6ef84c") {
      this._elementRemove.classList.add("element__remove_active");
    }
    this._elementLike = this._element.querySelector(selectors.elementLike);
    this._setColorLike("68d75b0661b87ec7db6ef84c", this._likes);
    this._elementImage = this._element.querySelector(selectors.elementImage);
    this._setEventListeners();
    this._element.querySelector(
      selectors.elementTitle
    ).textContent = this._name;
    this._element.querySelector(
      selectors.elementImage
    ).style.backgroundImage = `url(${this._link})`;

    return this._element;
  }

  // Удаление карточки при нажатии на "корзину"
  deleteCard() {
    this._element.remove();
    this._element = null;
    this._removeEventListeners();
  }

  // Удаление слушателей
  _removeEventListeners() {
    this._elementLike.removeEventListener("click", this._handleButtonLike);
    this._elementRemove.removeEventListener("click", this._handleButtonRemove);
    this._elementImage.removeEventListener("click", this._handleCardClick);
  }

  // включение/выключение лайков при нажатии на сердечко
  toggleLike() {
    this._elementLike.classList.toggle(classes.elementLikeActive);
  }

  //Установить цвет лайка
  _setColorLike(userId, arrLikes) {
    arrLikes.forEach((element) => {
      element._id === userId
        ? this._elementLike.classList.add("element__like_active")
        : null;
    });
  }

   //Набор лайков
   setLikes(arrLikes) {
    this._elementLikeCounter.textContent = arrLikes.length;
    this._elementLikeCounter.dataset.people = arrLikes
      .reduce((acc, item) => {
        acc.push(item.name);
        return acc;
      }, [])
      .join(", ");
    arrLikes.length > 0
      ? this._elementLikeCounter.dataset.people
      : null;
  }

   //Получить лайк
  getElementLike() {
    return this._elementLike;
  }
  
  // Добавить слушатели
  _setEventListeners() {
    this._elementLike.addEventListener("click", this._handleButtonLike);
    this._elementRemove.addEventListener("click", this._handleButtonRemove);
    this._elementImage.addEventListener("click", this._handleCardClick);
  }
}
