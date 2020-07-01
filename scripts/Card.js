import { 
  closePopupByEsc, 
  popupImageImg, 
  popUpImageDescription 
} from "./utils.js";

export class Card {
  constructor(data, templateSelector, popupSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._popupSelector = popupSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true)
      .querySelector(".elements__item");

    return cardElement;
  }

  // Cоздание карточки из шаблона и наполнение содержимым.
  generateCard() {
    this._element = this._getTemplate();
    this._elementRemove = this._element.querySelector(".elements__remove");
    this._elementLike = this._element.querySelector(".elements__like");
    this._elementPopup = document.querySelector(this._popupSelector);
    this._elementImage = this._element.querySelector(".elements__image");
    this._setEventListeners();
    this._element.querySelector(
      ".elements__item-title"
    ).textContent = this._name;
    this._element.querySelector(
      ".elements__image"
    ).style.backgroundImage = `url(${this._link})`;

    return this._element;
  }

  // Удаление карточки при нажатии на "корзину".
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Включение/выключение лайков при нажатии.
  _toggleLike() {
    this._elementLike.classList.toggle("elements__like_active");
  }

  //Открытие || закрытие 
  _openPopup() {
    this._elementPopup.classList.add("pop-up-opened");
    popupImageImg.src = this._link;
    popUpImageDescription.textContent = this._name;
    document.addEventListener("keyup", closePopupByEsc);
  }

  //Устанавливаем слушателей событий.
  _setEventListeners() {
    this._elementRemove.addEventListener("click", () => {
      this._deleteCard();
    });
    this._elementLike.addEventListener("click", () => {
      this._toggleLike();
    });
    this._elementImage.addEventListener("click", () => {
      this._openPopup();
    });
  }
}
