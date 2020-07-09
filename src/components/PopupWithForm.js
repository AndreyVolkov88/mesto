import Popup from "./Popup.js";

const selectors = {
  formInputName: ".form__input_name",
  formInput: ".form__input",
  formInputProfession: ".form__input_profession",
  formInputError: ".form__input-error",
  form: ".form",
};

const classes = {
  formInputTypeError: "form__input_type_error",
};

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setInputValues(userInfo, aboutUser) {
    const formInputName = this._formElement.querySelector(selectors.formInputName);
    const formInputProfession = this._formElement.querySelector(selectors.formInputProfession);
    formInputName.value = userInfo;
    formInputProfession.value = aboutUser;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(selectors.formInput);
    this._formValues = {};
    this._inputList.forEach((input) => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  close() {
    super.close();
    this._formElement.reset();
    this._formElement
      .querySelectorAll(selectors.formInputError)
      .forEach((item) => item.textContent = "");
    this._formElement.querySelectorAll(selectors.formInput).forEach((item) => {
      item.classList.remove(classes.formInputTypeError);
    });
  }

  setEventListeners(popupCloseIconSelector) {
    super.setEventListeners(popupCloseIconSelector);
    this._formElement = this._popup.querySelector(selectors.form);
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
