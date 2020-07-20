import "./index.css";
import {
  data,
  profileEditButton,
  profileAddButton,
  profileAvatar,
  selectors,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm";
import PopupWithAvatar from "../components/PopupWithAvatar";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-13",
  headers: {
    authorization: "a26e47fc-d895-46d4-92e3-3c8a80a24cd7",
    "Content-Type": "application/json;charset=utf-8",
  },
});

// Создание экземпляра класса проверки формы профиля
const formValidatorProfile = new FormValidator(data, selectors.formProfile);
formValidatorProfile.enableValidation();

// Создание экземпляра класса проверки формы карты 
const formValidatorCard = new FormValidator(data, selectors.formCard);
formValidatorCard.enableValidation();

// Создание экземпляра класса проверки формы Аватар
const formValidatorAvatar = new FormValidator(data, selectors.formAvatar);
formValidatorAvatar.enableValidation();

// Создание экземпляра класса с информацией о пользователе
const userInfo = new UserInfo(selectors.profileTitle, selectors.profileSubtitle);

// Создание экземпляра класса попапа Image
const popupWithImage = new PopupWithImage(selectors.popUpImage);
popupWithImage.setEventListeners(selectors.popUpImageCloseIcon);

// Создание экземпляра класса попап Confirm
const popupWithConfirm = new PopupWithConfirm(selectors.popUpConfirm);
popupWithConfirm.setEventListeners(selectors.popUpCloseIcon);

// Создание экземпляра класса попап Avatar
const popupWithAvatar = new PopupWithAvatar(selectors.popUpAvatar, {
  handleFormSubmit: (dataForm) => {
    popupWithAvatar.handleButtonForm("Загрузка...");
    api.patchAvatar(dataForm)
      .then((res) => {
        popupWithAvatar.setAvatar(res.avatar);
        popupWithAvatar.close();
      })
      .catch((err) => console.log(err));
  },
});
popupWithAvatar.setEventListeners(selectors.popUpCloseIcon);

// Создание экземпляра класса формы профиля
const formProfile = new PopupWithForm(selectors.popUpProfile, {
  handleFormSubmit: (dataForm) => {
    formProfile.handleButtonForm("Загрузка...");
    api.patchUserData(dataForm["input-name"], dataForm["input-profession"])
      .then(() => {
        userInfo.setUserInfo(
          dataForm["input-name"],
          dataForm["input-profession"]
        );
        formProfile.close();
      })
      .catch((err) => console.log(err));
  },
});
formProfile.setEventListeners(selectors.popUpCloseIcon);

// Список карточек
const cardList = new Section(selectors.elementsList);

// Обработка данных
const handleData = (data) => {
  const card = new Card(data, selectors.card, {
    handleCardClick: () => popupWithImage.open(data.link, data.name),
    handleButtonRemove: () => {
      popupWithConfirm.open();
      popupWithConfirm.handleButton(function () {
        api
          .deleteCard(data._id)
          .then(() => {
            card.deleteCard();
          })
          .catch((err) => console.log(err));
      });
    },
    handleButtonLike: () => {
      if (!card.getElementLike().classList.contains("elements__like_active")) {
        api.putLike(data._id)
          .then((res) => {
            card.setLikes(res.likes);
            card.toggleLike();
          })
          .catch((err) => console.log(err));
      } else {
        api.deleteLike(data._id)
          .then((res) => {
            card.setLikes(res.likes);
            card.toggleLike();
          })
          .catch((err) => console.log(err));
      }
    },
  });
  const cardElement = card.generateCard(data.owner._id);
  cardElement.querySelector(".elements__like-counter ").textContent =
    data.likes.length;
  cardList.appendItem(cardElement);
  formCard.close();
};

// Создание экземпляра класса формы карты
const formCard = new PopupWithForm(selectors.popUpCard, {
  handleFormSubmit: (dataForm) => {
    formCard.handleButtonForm("Загрузка...");
    api
      .postCard(dataForm["input-name-card"], dataForm["input-link-card"])
      .then(handleData)
      .catch((err) => console.log(err));
  },
});
formCard.setEventListeners(selectors.popUpCloseIcon);

Promise.all([api.getInitialCards(), api.getUserData()])
  .then((result) => {
    userInfo.setUserInfo(result[1].name, result[1].about);
    document.querySelector(selectors.profileAvatar).src = result[1].avatar;

    cardList.renderItems(result[0], handleData);
  })
  .catch((err) => console.log(err));

profileEditButton.addEventListener("click", () => {
  formProfile.open();
  formProfile.handleButtonForm("Сохранить");
  formValidatorProfile.setButtonDisabled();
  const userData = userInfo.getUserInfo();
  formProfile.setInputValues(userData.user, userData.about);
});

// Слушатель кнопки профайл
profileAddButton.addEventListener("click", () => {
  formCard.open();
  formCard.handleButtonForm("Создать");
  formValidatorCard.setButtonDisabled();
});

// Слушатель кнопки аватар
profileAvatar.addEventListener("click", () => {
  popupWithAvatar.open();
  popupWithAvatar.handleButtonForm("Сохранить");
  formValidatorAvatar.setButtonDisabled();
});
