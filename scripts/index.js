import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from "./initialCards.js";

const popUp = document.querySelector('.pop-up');
const formInputName = document.querySelector(".form__input_name");
const formInputProfession = document.querySelector(".form__input_profession");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const formProfile = document.querySelector(".form_profile");
const elementsList = document.querySelector(".elements__list");
const formCard = document.querySelector(".form_card");
const popUpImage = document.querySelector(".pop-up-image");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const data = {
  inputSelector: ".form__input",
  errorInputSelector: "form__input_type_error",
  errorClass: "form__input-error_visible",
  submitButtonSelector: ".form__input-button",
}

const formValidator1 = new FormValidator(data, ".form_profile");
formValidator1.enableValidation();

const formValidator2 = new FormValidator(data, ".form_card");
formValidator2.enableValidation();

//Открытие и закрытие popUp.
const togglePopup = (popup) => {
  popup.classList.toggle("pop-up-opened");
};

//Очищаем от ошибок.
const clearErrors = (formElement) => {
  formElement.querySelectorAll(".form__input-error").forEach((span) => {
    span.textContent = "";
  });
  formElement.querySelectorAll(".form__input").forEach((input) => {
    input.classList.remove("form__input_type_error");
  });
  formElement
    .querySelector(".form__input-button")
    .setAttribute("disabled", true);
};

//Закрытие попап по нажатию на Ecs.
export const closePopupByEsc = (e) => {
  if (e.key === "Escape" && popUp.classList.contains("pop-up-opened")) {
    formProfile.classList.contains("form_non-active") ? formCard.reset() : null;
    formProfile.classList.contains("form_non-active")
      ? clearErrors(formCard)
      : clearErrors(formProfile);
    togglePopup(popUp);
    document.removeEventListener("keyup", closePopupByEsc);
  } else if (
    e.key === "Escape" &&
    popUpImage.classList.contains("pop-up-opened")
  ) {
    togglePopup(popUpImage);
    document.removeEventListener("keyup", closePopupByEsc);
  }
};
//Закрытие popup редактирования профиля и сброс ошибок.
const closePopupForm = (e) => {
  if (
    e.target.classList.contains("pop-up") ||
    e.target.classList.contains("pop-up__close-icon")
  ) {
    togglePopup(popUp);
    formProfile.classList.contains("form_non-active") 
      ? formCard.reset() 
      : null;
    formProfile.classList.contains("form_non-active")
      ? clearErrors(formCard)
      : clearErrors(formProfile);
    document.removeEventListener("keyup", closePopupByEsc);
  }
};

//Закрытие popup картинок и закрытие по Esc.
const closePopupImage = (e) => {
  if (
    e.target.classList.contains("pop-up-image") ||
    e.target.classList.contains("pop-up-image__close-icon")
  ) {
    togglePopup(popUpImage);
    document.removeEventListener("keyup", closePopupByEsc);
  }
};

//Добавление карточек в ДОМ
initialCards.forEach((data) => {
  const card = new Card(data, "#card", ".pop-up-image");
  elementsList.append(card.generateCard());
});

//Открытие попап профиль и закрытие по Esc.
const openPopupFormProfile = () => {
  formCard.classList.add("form_non-active");
  formProfile.classList.remove("form_non-active");
  formInputName.value = profileTitle.textContent;
  formInputProfession.value = profileSubtitle.textContent;
  togglePopup(popUp);
  document.addEventListener("keyup", closePopupByEsc);
};

//Открытие popUp карточек и закрытие по Esc.
const openPopupFormCard = () => {
  formCard.classList.remove("form_non-active");
  formProfile.classList.add("form_non-active");
  togglePopup(popUp);
  document.addEventListener("keyup", closePopupByEsc);
};


//Отправка формы профиля и очистка ошибок.
const submitFormProfile = (e) => {
  e.preventDefault();
  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formInputProfession.value;
  togglePopup(popUp);
  clearErrors(formProfile);
};

const submitFormCard = (e) => {
  e.preventDefault();
  const data = {};
  data.name = document.querySelector(".form__input_name-card").value;
  data.link = document.querySelector(".form__input_link-card").value;
  const card = new Card(data, "#card", ".pop-up-image");
  elementsList.prepend(card.generateCard());
  formCard.reset();
  togglePopup(popUp);
  clearErrors(formCard);
};

 
profileEditButton.addEventListener("click", openPopupFormProfile);

profileAddButton.addEventListener("click", openPopupFormCard);

popUp.addEventListener("click", closePopupForm);

popUpImage.addEventListener("click", closePopupImage);

formProfile.addEventListener("submit", submitFormProfile);

formCard.addEventListener("submit", submitFormCard);
