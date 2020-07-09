import Popup from "./Popup.js";

const selectors = {
  popUpImageImg: ".pop-up-image__img",
  popUpImageDescription: ".pop-up-image__description",
};

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(imageURL, description) {
    super.open();
    const popupImageImg = this._popup.querySelector(selectors.popUpImageImg);
    popupImageImg.src = imageURL;
    popupImageImg.alt = description;
    const popupImageDescription = this._popup.querySelector(
      selectors.popUpImageDescription
    );
    popupImageDescription.textContent = description;
  }
}
