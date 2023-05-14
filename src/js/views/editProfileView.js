import View from './View';
import { state } from '../model.js';

class EditProfileView extends View {
  _parentEl = document.querySelector('.app');
  _modal = document.querySelector('.edit-profile-window');

  _generateMarkup() {
    const html = `
    <div class="edit-profile-window">
        <button class="btn--close-modal">×</button>
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
                <input value="${state.loggedUser.password}" type="password" name="password">
            </div>
        </form>
        <div class="d-flex justify-content-center">
        <button class="btn--save-changes">
            <span>Save Changes</span>
        </button>
        </div>
    </div>
    `;
    return html;
  }

  _closeModal() {
    this._modal.classList.toggle('hidden');
  }
}

export default new EditProfileView();
