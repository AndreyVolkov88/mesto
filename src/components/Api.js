export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //Обработчик ответа от сервера
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Получить данные пользователя
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
  }


  //Получить начальные карточки пользователя
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //Обновление данных пользователя на сервере
  patchUserData(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
    .then(this._handleResponse);
  }

  //Отправка данных карточек на сервер
  postCard(name, link) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name,
          link,
        }),
      })
      .then(this._handleResponse);
  }

  //Удалние карточек с сервера
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._handleResponse);
  }

  //Обновление данные лайка на сервере
  putLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      })
      .then(this._handleResponse);
  }

  // Удаление лайка с карточки на сервере
  deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._handleResponse);
    }

  //Обновить аватар на сервере
  patchAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    })
    .then(this._handleResponse);
  }

}