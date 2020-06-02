const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popUp = document.querySelector('.pop-up');
const formInputName = document.querySelector(".form__input_name");
const formInputProfession = document.querySelector(".form__input_profession");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const formProfile = document.querySelector(".form_profile");
const elementsList = document.querySelector(".elements__list");
const formCard = document.querySelector(".form_card");
const popUpImage = document.querySelector(".pop-up-image");

const openAndClosePopup = (e) => {
  if (e.target.classList.contains("profile__edit-button")) {
    formCard.classList.add("form_non-active");
    formProfile.classList.remove("form_non-active");
    formInputName.value = profileTitle.textContent;
    formInputProfession.value = profileSubtitle.textContent;
    popUp.classList.add("pop-up_opened");
  } else if (e.target.classList.contains("profile__add-button")) {
    formCard.classList.remove("form_non-active");
    formProfile.classList.add("form_non-active");
    popUp.classList.add("pop-up_opened");
  } else if (e.target.classList.contains("elements__image")) {
    popUpImage.classList.add("pop-up-image_opened");
  } else if (e.target.classList.contains("pop-up__close-icon")) {
    popUp.classList.remove("pop-up_opened");
  } else if (e.target.classList.contains("pop-up-image__close-icon")) {
    popUpImage.classList.remove("pop-up-image_opened");
  }
};

//  Закрытие popUp при нажатии клавиши escape на клавиатуре.
const closePopupByEsc = (e) => {
  if (e.keyCode === 27 && popUp.classList.contains("pop-up_opened")) {
    popUp.classList.remove("pop-up_opened");
  } else if (
    e.keyCode === 27 &&
    popUpImage.classList.contains("pop-up-image_opened")
  ) {
    popUpImage.classList.remove("pop-up-image_opened");
  }
};

// Отправка формы профиля.
const submitFormProfile = (e) => {
  e.preventDefault();
  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formInputProfession.value;
  popUp.classList.remove("pop-up_opened");
};


  // Отправка форм карт.
const submitFormCard = (e) => {
  e.preventDefault();
  const formInputNameCard = document.querySelector(".form__input_name-card");
  const formInputLinkCard = document.querySelector(".form__input_link-card");
  elementsList.prepend(
    createCard(formInputNameCard.value, formInputLinkCard.value)
  );
  formInputNameCard.value = "";
  formInputLinkCard.value = "";
  popUp.classList.remove("pop-up_opened");
};

// Переключение состояния кнопки лайк на картинке.
const toggleLike = (e) => {
  if (e.target.classList.contains("elements__like")) {
    e.target.classList.toggle("elements__like_active");
  }
};

    // Удаление карточек с картинками.
  const removeCard = (e) => {
    if (e.target.classList.contains("elements__remove")) {
      e.target.closest(".elements__item").remove();
    }
  };

// Увелечение картинок.
const zoomImage = (e) => {
  if (e.target.classList.contains("elements__image")) {
    const popUpImageImg = document.querySelector(".pop-up-image__img");
    popUpImageImg.src = e.target.style.backgroundImage.slice(5, -2);
    const popUpImageDescription = document.querySelector(
      ".pop-up-image__description"
    );
    popUpImageDescription.textContent = e.target
      .closest(".elements__item")
      .querySelector(".elements__item-title").textContent;
    popUpImage.classList.add("pop-up-image_opened");
  }
};

// Добавление новых карточек.
const createCard = (name, link) => {
  const card = document.querySelector("#card").content.cloneNode(true);
  const elementsImage = card.querySelector(".elements__image");
  elementsImage.style.backgroundImage = `url(${link})`;
  const elementsItemTitle = card.querySelector(".elements__item-title");
  elementsItemTitle.textContent = name;
  return card;
};


initialCards.forEach(({ name, link }) => {
  elementsList.append(createCard(name, link));
});

 


document.addEventListener("click", openAndClosePopup);

document.addEventListener("keyup", closePopupByEsc);

formProfile.addEventListener("submit", submitFormProfile);

formCard.addEventListener("submit", submitFormCard);

elementsList.addEventListener("click", toggleLike);

elementsList.addEventListener("click", removeCard);

elementsList.addEventListener("click", zoomImage);
