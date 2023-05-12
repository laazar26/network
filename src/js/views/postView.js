import View from "./View.js"
import { state } from "../model.js";

class PostView extends View {
    _errorMessage = 'No posts yet'
    _parentEl = document.querySelector('.main--window__right')
    // constructor() {
        //     super()
        // }

    _generateMarkup() {
        const html =  `
        <div class="win-right mt-3">
                    <ul class="post--ul">
                      <li>
                        <div class="border-bottom"></div>
                      </li>
                      <li class="mx-3">
                        <h2 class="pt-1">${state.loggedUser.first_name} posted</h2>
                        <p>${state.postsData.content}</p>
                        <button class="btn--delete_post btn-danger my-3">Delete</button>
                      </li>
                      <li class="post-item mx-3">
                        <button class="btn-like">Like</button> 
                            <input placeholder="comment" class="comment-inp" type="text">
                        <button class="btn btn-secondary mx-3">Comment</button>
                      </li>
                    </ul>
                <div class="d-flex flex-column align-items-start px-3">
            </div>
        </div>
        `;

        this._clearInput()
        return html
      }

      _clearInput() {
        return (this._parentEl.querySelector('.post-inp').value = '');
      }
}

export default new PostView();