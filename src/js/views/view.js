import icons from 'url:../../img/icons.svg';

export default class View {
    _data;

    render(data, render = true) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();
        if (!render) return markup;
        this._clear();
        this._insertParentElement(markup);
    }

    update(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();

        // create virtual dom
        const newDom = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDom.querySelectorAll('*'));
        const currElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
            const curEl = currElements[i];

            // updates changed text
            if (!newEl.isEqualNode(curEl) && newEl.firstChild && newEl.firstChild.nodeValue.trim() !== '') {
                curEl.textContent = newEl.textContent;
            }

            // updates changed attributes
            if (!newEl.isEqualNode(curEl)) {
                Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
            }
        });
    }

    _insertParentElement(markup) {
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderSpinner() {
        const markup = `
            <div class="spinner">
                <svg>
                <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;
        this._clear();
        this._insertParentElement(markup);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderMessage(message = this._message) {
        const markup = `
            <div class="message">
                <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div> 
        `;
        this._clear();
        this._insertParentElement(markup);
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
        this._clear();
        this._insertParentElement(markup);
    }
}