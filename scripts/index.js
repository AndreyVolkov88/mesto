import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';
import { 
  closePopupByEsc,
  togglePopup,
  popUp,
  popUpImage,
  formProfile,
  formCard,
  data
} from './utils.js';

const formInputName = document.querySelector(".form__input_name");
const formInputProfession = document.querySelector(".form__input_profession");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const elementsList = document.querySelector(".elements__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const formProfileValidator = new FormValidator(data, ".form_profile");
formProfileValidator.enableValidation();

const formСardValidator = new FormValidator(data, ".form_card");
formСardValidator.enableValidation();

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
      ? formСardValidator.makeClear()
      : formProfileValidator.makeClear();
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
  formProfileValidator.makeClear();
};

//Открытие popUp карточек и закрытие по Esc.
const openPopupFormCard = () => {
  formCard.classList.remove("form_non-active");
  formProfile.classList.add("form_non-active");
  togglePopup(popUp);
  document.addEventListener("keyup", closePopupByEsc);
  formСardValidator.makeClear()
};


//Отправка формы профиля и очистка ошибок.
const submitFormProfile = (e) => {
  e.preventDefault();
  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formInputProfession.value;
  togglePopup(popUp);
  formProfileValidator.makeClear();
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
  formСardValidator.makeClear();
};

 
profileEditButton.addEventListener("click", openPopupFormProfile);

profileAddButton.addEventListener("click", openPopupFormCard);

popUp.addEventListener("click", closePopupForm);

popUpImage.addEventListener("click", closePopupImage);

formProfile.addEventListener("submit", submitFormProfile);

formCard.addEventListener("submit", submitFormCard);
