import View from './View';
import { state } from '../model.js';

class EditProfileView extends View {
  _parentEl = document.querySelector('.edit-user-profile');
  _btnCloseModal = document.querySelector('.btn--close__modal');
  _modal;

  generateHtml() {
    const html = `
    <div class="edit-profile-window">
        <button class="btn--close__modal">×</button>
            <div class="text-center mb-5">
                <span>Account</span>
                <p>set you account settings down below</p>
            </div>
        <form class="edit-profile-form">
            <div class="data-column">
                <h3 class="user-profile-heading"></h3>
                <label>First Name</label>
                <input value="${state.loggedUser.first_name}" type="text" name="name">
                <label>Last Name</label>
                <input value="${state.loggedUser.last_name}" type="text" name="surname">
                <label>Email</label>
                <input value="${state.loggedUser.email}" type="email" name="email">
                <label>Password</label>
                <div class="password-container">
                  <input class="w-100" id="pass" value="${state.loggedUser.password}" type="password" name="password">
                  <span class="passwordIcon">
                    <i class="fa fa-eye eye" aria-hidden="true"></i>
                  </span>
                </div>
            </div>
        </form>
        <div class="d-flex justify-content-center">
        <button class="btn--save-changes">
            <span>Save Changes</span>
        </button>
        </div>
    </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML('beforeend', html);
  }

  addHandlerCloseWindow(handler) {
    // TODO: Napraviti event delegation za btn element da bih mogao da zatvroim
    this._parentEl.addEventListener('click', function (e) {
      const clicked = e.target;

      if (clicked.classList.contains('btn--close__modal')) {
        console.log(clicked);
        this._modal = document.querySelector('.edit-profile-window');
        this._modal.classList.add('hidden');
      }
    });
  }

  showHidePassword(handler) {
    // TODO: EVENT DELEGATION OR PROPAGATION
    this._parentEl.addEventListener('click', function (e) {
      const clicked = e.target;
      if (clicked.classList.contains('eye')) {
        console.log('contain eye:');
        handler();
      }
    });
  }
}

export default new EditProfileView();
