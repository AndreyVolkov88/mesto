//Показывает сообщение об ошибке ввода.
const showMessageError = (input, errorClass, errorInputSelector) => {
  input.classList.add(errorInputSelector);
  const errorElement = document.querySelector(`#${input.name}-error`);
  errorElement.classList.add(errorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(errorClass);
};

//Скрывает сообщение об ошибке ввода.
const hideMessageError = (input, errorClass, errorInputSelector) => {
  input.classList.remove(errorInputSelector);
  const errorElement = document.querySelector(`#${input.name}-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
};
//Если инпут валиден, разблокировать кнопку, скрывать ошибки, 
//если нет - выводить ошибки и оставить кнопку заблокированной.
const formValid = (
  form,
  inputSelector,
  errorClass,
  submitButtonSelector,
  errorInputSelector
) => {
  const formElement = form;
  const buttonElement = formElement.querySelector(submitButtonSelector);
  const inputsList = formElement.querySelectorAll(inputSelector);
  inputsList.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.checkValidity()) {
        hideMessageError(input, errorClass, errorInputSelector);
        if (form.checkValidity()) {
          buttonElement.removeAttribute("disabled");
        }
      } else {
        showMessageError(input, errorClass, errorInputSelector);
        buttonElement.setAttribute("disabled", true);
      }
    });
  });
};

//Включить валидацию для форм.
const enableValidation = (options) => {
  const formsList = document.querySelectorAll(options.formSelector);
  formsList.forEach((form) => {
     formValid(
      form,
      options.inputSelector,
      options.errorClass,
      options.submitButtonSelector,
      options.errorInputSelector
    );
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  errorInputSelector: "form__input_type_error",
  errorClass: "form__input-error_visible",
  submitButtonSelector: ".form__input-button",
});
