export class FormValidator {
    constructor(data, formSelector) {
      this._inputSelector = data.inputSelector;
      this._errorInputSelector = data.errorInputSelector;
      this._errorClass = data.errorClass;
      this._submitButtonSelector = data.submitButtonSelector;
      this._formSelector = formSelector;
      this._formElement = document.querySelector(this._formSelector);
    }
    
    //Показывает сообщение об ошибке ввода.
    _showMessageError(input) {
      input.classList.add(this._errorInputSelector);
      const errorElement = document.querySelector(`#${input.name}-error`);
      errorElement.classList.add(this._errorClass);
      errorElement.textContent = input.validationMessage;
      }

    //Скрывает все сообщения об ошибке ввода.
    hideMessageErrors() {
      this._formElement.querySelectorAll(".form__input").forEach((input) => {
        this._hideMessageError(input)
      });
    }
   
    
    //Скрывает сообщение об ошибке ввода.
    _hideMessageError(inputElement) {
      inputElement.classList.remove(this._errorInputSelector);
      const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
      this._setStateOfButton();
    }
    

      //Проверка вводимых данных на валидность.
      _checkInputValidity(input) {
        if (input.checkValidity()) {
          this._hideMessageError(input);
        } else {
          this._showMessageError(input);
        }
      }

      // Установить  состояния кнопки в зависимости от валидности формы.
      _setStateOfButton() {
        this._buttonElement = this._formElement.querySelector(
          this._submitButtonSelector
        );
        if (this._formElement.checkValidity()) {
          this._buttonElement.removeAttribute("disabled");
        } else {
          this._buttonElement.setAttribute("disabled", true);
        }
      }
    
      //Включить валидацию форм.
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