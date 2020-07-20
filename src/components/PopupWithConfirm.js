import Popup from "./Popup.js"

import { selectors } from "../utils/constants.js"

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
    }
  
    _close() {
      super.close();
      this._button.removeEventListener("click", this._deleteCard);
    }
  
    _deleteCard(handleApiData) {
      handleApiData();
      this._close();
    }
  
    handleButton(cb) {
      this._button = this._popup.querySelector(selectors.formInputButtonComfirm);
      this._button.addEventListener("click", this._deleteCard.bind(this, cb));
    }
}
  
