export default class View {
  _postInp;
  _data;

  constructor() {}

  _generateMarkup(data) {
    this._postInp = document.querySelector('.post-inp').value;
    this._data = data;

    const html = `
    <div class="win-right mt-3 hidden">
                <ul class="post--ul">
                  <li>
                    <div class="border-bottom"></div>
                  </li>
                  <li class="mx-3">
                    <h2 class="pt-1">${_data.first_name} posted</h2>
                    <p>${_postInp}</p>
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
  }
}
