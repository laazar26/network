import { mark } from 'regenerator-runtime';
import icons from '../../img/icons.svg';
import { getCurrentUser } from '../helpers';

export default class View {
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();

    if (!data) return markup;

    // this._clear();
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));

    console.log(curElements);
    console.log(newElements);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }
}
