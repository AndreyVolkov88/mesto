// const initialCards = [
//   {
//       name: 'Архыз',
//       link: 'https://turgeek.ru/upload/tour/images_more/6393/big-4-trekking-v-arhyze-komfort-tur-s-gostinicej.jpg'
//   },
//   {
//       name: 'Казань',
//       link: 'https://avatars.mds.yandex.net/get-zen_doc/51081/pub_5c0f925ad60cb600aae80ce4_5c0f94eb46ef5c00aaa819e6/scale_1200'
//   },
//   {
//       name: 'Рязань',
//       link: 'https://www.onetwotrip.com/ru/blog/wp-content/uploads/2018/02/ryazan-kremlin.jpg'
//   },
//   {
//       name: 'Камчатка',
//       link: 'https://avatars.mds.yandex.net/get-pdb/1789050/6613b2fe-3409-437f-8c30-28c8ed76f7a8/s1200?webp=false'
//   },
//   {
//       name: 'Кубань',
//       link: 'https://avatars.mds.yandex.net/get-pdb/245485/bb6af271-5c29-4628-959b-2787246068f8/s1200?webp=false'
//   },
//   {
//       name: 'Байкал',
//       link: 'https://avatars.mds.yandex.net/get-pdb/1748217/bdbcce6e-2f47-4f69-8e21-34137b716576/s1200?webp=false'
//   }
// ];

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
    popUpImageImg.src = e.target.src;
    const popUpImageDescription = document.querySelector(
      ".pop-up-image__description"
    );
    popUpImageDescription.textContent = e.target
      .closest(".elements__item")
      .querySelector(".elements__item-title").textContent;
    popUpImage.classList.add("pop-up-image_opened");
  }
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
