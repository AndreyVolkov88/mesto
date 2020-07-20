import Popup from "./Popup.js";

import { selectors, classes } from "../utils/constants.js";

export default class PopupWithAvatar extends Popup {
    constructor(popupSelector, { handleFormSubmit } ) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
    }

    // Получить данные 
    _getInputValue() {
        const input = this._popup.querySelector(selectors.formInput);
        return input.value;
    }

    // Установить Аватар
    setAvatar(link) {
        const img = document.querySelector(selectors.profileAvatar);
        img.src = link;
    }

    // Закрытие и сброс ошибок
    close() {
        super.close();
        this._formElement.reset();
        this._formElement.querySelector(selectors.formInputError).textContent = "";
        this._formElement.querySelector(selectors.formInput).classList.remove(classes.formInputTypeError);
    }

     // Установка слушателей событий
     setEventListeners(popupCloseIconSelector) {
        super.setEventListeners(popupCloseIconSelector);
        this._formElement = this._popup.querySelector(selectors.form);
        this._formElement.addEventListener("submit", (e) => {
          e.preventDefault();
          this._handleFormSubmit(this._getInputValue());
        });
    }

}