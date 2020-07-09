import "./index.css";
import { initialCards } from "../utils/initialCards.js";
import { data, profileEditButton, profileAddButton } from "../utils/utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const selectors = {
  formProfile: ".form_profile",
  formCard: ".form_card",
  profileTitle: ".profile__title",
  profileSubtitle: ".profile__subtitle",
  popUpImage: ".pop-up-image",
  popUpProfile: ".pop-up_profile",
  popUpCloseIcon: ".pop-up__close-icon",
  popUpCard: ".pop-up_card",
  card: "#card",
  popUpImageCloseIcon: ".pop-up-image__close-icon",
  elementsList: ".elements__list",
};

// Создание экземпляра класса проверки формы профиля
const formValidatorProfile = new FormValidator(data, selectors.formProfile);
formValidatorProfile.enableValidation();

// Создание экземпляра класса проверки формы карты 
const formValidatorCard = new FormValidator(data, selectors.formCard);
formValidatorCard.enableValidation();

// Создание экземпляра класса с информацией о пользователе
const userInfo = new UserInfo(selectors.profileTitle, selectors.profileSubtitle);

// Создание экземпляра класса попапа с картикой
const popupWithImage = new PopupWithImage(selectors.popUpImage);
popupWithImage.setEventListeners(selectors.popUpImageCloseIcon);

// Создание экземпляра класса формы профиля
const formProfile = new PopupWithForm(selectors.popUpProfile, {
  handleFormSubmit: (dataForm) => userInfo.setUserInfo(dataForm["input-name"], dataForm["input-profession"]),
});
formProfile.setEventListeners(selectors.popUpCloseIcon);

// Создание экземпляра класса формы карты
const formCard = new PopupWithForm(selectors.popUpCard, {
  handleFormSubmit: (dataForm) => {
    const { "input-name-card": name, "input-link-card": link } = dataForm;
    const item = {};
    item.name = name;
    item.link = link;
    const card = new Card(item, selectors.card, {
      handleCardClick: () => popupWithImage.open(item.link, item.name),
    });
    const cardElement = card.generateCard();
    cardList.prependItem(cardElement);
  },
});
formCard.setEventListeners(selectors.popUpCloseIcon);

// Создание экземпляра класса section
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, selectors.card, {
        handleCardClick: () => popupWithImage.open(item.link, item.name),
      });
      const cardElement = card.generateCard();
      cardList.appendItem(cardElement);
    },
  },
  selectors.elementsList
);
cardList.renderItems();

// Слушатель - кнопки редактирования профиля
profileEditButton.addEventListener("click", () => {
  formProfile.open();
  formValidatorProfile.setButtonDisabled();
  const userData = userInfo.getUserInfo();
  formProfile.setInputValues(userData.user, userData.about);
});

// Слушатель - кнопки добавления фотографий 
profileAddButton.addEventListener("click", () => {
  formCard.open();
  formValidatorCard.setButtonDisabled();
});


