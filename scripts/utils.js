export const popUp = document.querySelector(".pop-up");
export const popUpImage = document.querySelector(".pop-up-image");
export const formProfile = document.querySelector(".form_profile");
export const formCard = document.querySelector(".form_card");
export const popupImageImg = document.querySelector(".pop-up-image__img");
export const popUpImageDescription = document.querySelector(".pop-up-image__description");
export const data = {
  inputSelector: ".form__input",
  errorInputSelector: "form__input_type_error",
  errorClass: "form__input-error_visible",
  submitButtonSelector: ".form__input-button",
}

//Открытие и закрытие popUp.
export const togglePopup = (popup) => {
    popup.classList.toggle("pop-up-opened");
  };
  


//Закрытие попап по нажатию на Ecs.
export const closePopupByEsc = (e) => {
    if (e.key === "Escape" && popUp.classList.contains("pop-up-opened")) {
      formProfile.classList.contains("form_non-active") ? formCard.reset() : null;
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

  