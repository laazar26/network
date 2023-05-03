class View {
  _loginPopup = document.querySelector('.login-wrapper');
  _overlay = document.querySelector('.overlay');
  _userExistPopup = document.querySelector('.user--exist_popup');
  _userSuccessPopup = document.querySelector('.user--success_popup');

  toggleLoginPopup() {
    this._loginPopup.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  toggleUserExistPopup() {
    this._userExistPopup.classList.toggle('hidden');
    this._userExistPopup.classList.toggle('show');
  }

  toggleUserSuccessPopup() {
    this._userSuccessPopup.classList.toggle('hidden');
    this._userSuccessPopup.classList.toggle('show');
  }
}

export default new View();
