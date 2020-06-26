export const popUp = document.querySelector(".pop-up");
export const popUpImage = document.querySelector(".pop-up-image");
export const formProfile = document.querySelector(".form_profile");
export const formCard = document.querySelector(".form_card");

//Открытие и закрытие popUp.
export const togglePopup = (popup) => {
    popup.classList.toggle("pop-up-opened");
  };
  
  //Очищаем от ошибок.
 export const clearErrors = (formElement) => {
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