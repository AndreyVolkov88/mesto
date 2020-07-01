export const popUp = document.querySelector(".pop-up");
export const popUpImage = document.querySelector(".pop-up-image");
export const formProfile = document.querySelector(".form_profile");
export const formCard = document.querySelector(".form_card");

//Открытие и закрытие popUp.
export const togglePopup = (popup) => {
    popup.classList.toggle("pop-up-opened");
  };
  
//Закрытие попап по нажатию на Ecs.
export const closePopupByEsc = (e) => {
    if (e.key === "Escape" && popUp.classList.contains("pop-up-opened")) {
      formProfile.classList.contains("form_non-active") ? formCard.reset() : null;
      formProfile.classList.contains("form_non-active")
        ? formСardValidator.makeClear()
        : formProfileValidator.makeClear();
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