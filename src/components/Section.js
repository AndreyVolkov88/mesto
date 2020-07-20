export default class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  renderItems(arrData, renderer) {
    arrData.forEach((item) => renderer(item));
  }

  appendItem(element) {
    this._container.append(element);
  }
}

