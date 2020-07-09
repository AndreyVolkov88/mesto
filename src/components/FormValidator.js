export default class FormValidator {
  constructor(data, formSelector) {
    this._inputSelector = data.inputSelector;
    this._errorInputSelector = data.errorInputSelector;
    this._errorClass = data.errorClass;
    this._submitButtonSelector = data.submitButtonSelector;
    this._formSelector = formSelector;
  }

  // отображение текста с ошибкой
  _showMessageError(input) {
    input.classList.add(this._errorInputSelector);
    const errorElement = document.querySelector(`#${input.name}-error`);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = input.validationMessage;
  }

  // скрытие текста с ошибкой
  _hideMessageError(input) {
    input.classList.remove(this._errorInputSelector);
    const errorElement = document.querySelector(`#${input.name}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  // проверка инпута на валидность
  _checkInputValidity(input) {
    input.checkValidity()
      ? this._hideMessageError(input)
      : this._showMessageError(input);
  }

  // переключение состояния кнопки в зависимости от валидности всей формы
  _setStateOfButton() {
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._formElement.checkValidity()
      ? this._buttonElement.removeAttribute("disabled")
      : this._buttonElement.setAttribute("disabled", true);
  }

  // состояние кнопки не активное
  setButtonDisabled() {
    this._formElement
      .querySelector(this._submitButtonSelector)
      .setAttribute("disabled", true);
  }

  // включаем валидацию
  enableValidation() {
    this._formElement = document.querySelector(this._formSelector);
    const listInputs = this._formElement.querySelectorAll(this._inputSelector);
    listInputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._setStateOfButton(inputElement);
      });
    });
  }
}
