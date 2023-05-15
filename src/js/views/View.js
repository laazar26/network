import { mark } from 'regenerator-runtime';
import icons from '../../img/icons.svg';

export default class View {
  render(render = true) {
    const markup = this._generateMarkup();

    if (!render) return markup;

    // this._clear();
    this._parentEl.insertAdjacentHTML('beforeend', markup);
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
