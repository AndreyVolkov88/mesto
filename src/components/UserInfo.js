export default class UserInfo {
  constructor(userNameSelector, aboutUserSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._aboutUser = document.querySelector(aboutUserSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.user = this._userName.textContent;
    userInfo.about = this._aboutUser.textContent;
    return userInfo;
  }

  setUserInfo(user, about) {
    this._userName.textContent = user;
    this._aboutUser.textContent = about;
  }
}
