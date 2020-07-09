const selectors = {
  popupSelector: "pop-up-opened",
};

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add(selectors.popupSelector);
    this._popup.addEventListener("click", (e) =>
      e.target === this._popup ? this.close() : null
    );
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(selectors.popupSelector);
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(e) {
    e.key === "Escape" ? this.close() : null;
  }

  setEventListeners(popupCloseIconSelector) {
    this._popupCloseIcon = this._popup.querySelector(popupCloseIconSelector);
    this._popupCloseIcon.addEventListener("click", () => this.close());
  }
}
