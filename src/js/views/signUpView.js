class SignUpView {
  _loginPopup = document.querySelector('.login-wrapper');
  _overlay = document.querySelector('.overlay');
  _userExistPopup = document.querySelector('.user--exist_popup');
  _userSuccessPopup = document.querySelector('.user--success_popup');
  _registerPopup = document.querySelector('.register-wrapper');
  _btnLogout = document.querySelector('.btn--logout');
  _body = document.querySelector('body');
  _app = document.querySelector('.app');

  addHandlerLogout(handler) {
    this._btnLogout.addEventListener('click', function () {
      console.log('handler click');
      handler();
    });
  }

  toggleLoginPopup() {
    this._loginPopup.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  toggleRegisterLoginPopup() {
    this._registerPopup.classList.toggle('hidden');
    this._loginPopup.classList.toggle('hidden');
  }

  toggleUserExistPopup() {
    this._userExistPopup.classList.toggle('hidden');
    this._userExistPopup.classList.toggle('show');
  }

  toggleUserSuccessPopup() {
    this._userSuccessPopup.classList.toggle('hidden');
    this._userSuccessPopup.classList.toggle('show');
  }

  toggleRegisterWin() {
    this._registerPopup.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  toggleRegister() {
    this._loginPopup = document.querySelector('.login-wrapper');
    this._registerPopup = document.querySelector('.register-wrapper');
  }
}

export default new SignUpView();
