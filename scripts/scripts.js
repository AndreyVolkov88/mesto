const page = document.querySelector(".page");
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
const popUpCloseIcon = document.querySelector(".pop-up__close-icon");


//Очищаем ошибоки.
const clearErrors = () => {
  document.querySelectorAll(".form__input-error").forEach((span) => {
    span.textContent = "";
  });
  document.querySelectorAll(".form__input").forEach((input) => {
    input.classList.remove("form__input_type_error");
  });
  document.querySelectorAll(".form__input-button").forEach((button) => {
    button.setAttribute("disabled", true);
  });
};

//Сброс формы
const formReset = () => {
  Array.from(document.forms).forEach((form) => form.reset());
};

//Заполнение профиля после закрытия.
const fillOutProfileAfterCloseForm = () => {
  formInputName.value = profileTitle.textContent;
  formInputProfession.value = profileSubtitle.textContent;
};

//Закрытие попап по нажатию на Ecs.
const closePopupByEsc = (e) => {
  if (e.key === "Escape" && popUp.classList.contains("pop-up_opened")) {
    popUp.classList.remove("pop-up_opened");
    formReset();
    clearErrors();
  } else if (
    e.key === "Escape" &&
    popUpImage.classList.contains("pop-up-image_opened")
  ) {
    popUpImage.classList.remove("pop-up-image_opened");
  }
  document.removeEventListener("keyup", closePopupByEsc);
};

//Закрытие popup редактирования профиля и сброс ошибок.
const closePopupForm = (e) => {
  if (
    e.target.classList.contains("pop-up") ||
    e.target.classList.contains("pop-up__close-icon")
  ) {
    popUp.classList.remove("pop-up_opened");
    formReset();
    clearErrors();
  }
};

//Закрытие popup картинок и закрытие по Esc.
const closePopupImage = (e) => {
  if (
    e.target.classList.contains("pop-up-image") ||
    e.target.classList.contains("pop-up-image__close-icon")
  )
    popUpImage.classList.remove("pop-up-image_opened");
    document.removeEventListener("keyup", closePopupByEsc);
};

//Открытие popup картинок и закрытие по Esc.
const openPopupImage = () => {
  popUpImage.classList.add("pop-up-image_opened");
  document.addEventListener("keyup", closePopupByEsc);
};

//Добавляем обработчик событий, клик по картинке - открыть картинку.
const addEventClickForImage = () => {
  document.querySelectorAll(".elements__image").forEach((image) => {
    image.addEventListener("click", openPopupImage);
  });
};
// Добавление новых карточек.
const createCard = (name, link) => {
  const card = document.querySelector("#card").content.cloneNode(true);
  const elementsImage = card.querySelector(".elements__image");
  elementsImage.src = `${link}`;
  const elementsItemTitle = card.querySelector(".elements__item-title");
  elementsItemTitle.textContent = name;
  elementsImage.alt = `Фотография места под названием ${name}`;
  return card;
};

//Добавление карточек в ДОМ
initialCards.forEach(({ name, link }) => {
  elementsList.append(createCard(name, link));
  addEventClickForImage();
});

//Открытие попап профиль и закрытие по Esc.
const openPopupFormProfile = () => {
  formCard.classList.add("form_non-active");
  formProfile.classList.remove("form_non-active");
  fillOutProfileAfterCloseForm();
  popUp.classList.add("pop-up_opened");
  document.addEventListener("keyup", closePopupByEsc);
};

//Открытие попап карточек и закрытие по Esc.
const openPopupFormCard = () => {
  formCard.classList.remove("form_non-active");
  formProfile.classList.add("form_non-active");
  popUp.classList.add("pop-up_opened");
  document.addEventListener("keyup", closePopupByEsc);
};


//Отправка формы профиля и очистка ошибок.
const submitFormProfile = (e) => {
  e.preventDefault();
  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formInputProfession.value;
  popUp.classList.remove("pop-up_opened");
  clearErrors();
};

//Добавление карточек в список
const createCardInList = (card, elementsList) => { 
  elementsList.prepend(card);
};

  // Отправка форм карт и очистка от ошибок.
const submitFormCard = (e) => {
  e.preventDefault();
  const formInputNameCard = document.querySelector(".form__input_name-card");
  const formInputLinkCard = document.querySelector(".form__input_link-card");
  const card = createCard(formInputNameCard.value, formInputLinkCard.value); //Добавление пременной card.

  createCardInList(card, elementsList);//Добавление в качестве аргумента карточки и контейнера в которую её добавляем.

  formInputNameCard.value = "";
  formInputLinkCard.value = "";
  popUp.classList.remove("pop-up_opened");
  clearErrors();
  addEventClickForImage();
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



 
profileEditButton.addEventListener("click", openPopupFormProfile);

profileAddButton.addEventListener("click", openPopupFormCard);

popUp.addEventListener("click", closePopupForm);

popUpImage.addEventListener("click", closePopupImage);

formProfile.addEventListener("submit", submitFormProfile);

formCard.addEventListener("submit", submitFormCard);

elementsList.addEventListener("click", toggleLike);

elementsList.addEventListener("click", removeCard);

elementsList.addEventListener("click", zoomImage);
