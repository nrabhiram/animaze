import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.resultsList.innerHTML = '';
}

export const clearButtons = () => {
    elements.resultsPagination.innerHTML = '';
}

const formatTitle = (title, limit = 18) => {
    const newTitle = [];
    if (title.length > 20) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0)

        return `${newTitle.join(' ')} ...`;
    }

    return title;
}

const renderShow = (show) => {
    const markup = `
        <a class="results__link" href="#${show.mal_id}">
            <figure class="results__fig">
                <img src="${show.image_url}" alt="${show.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${formatTitle(show.title)}</h4>
                <p class="results__type">${show.type}</p>
            </div>
        </a>
    `;

    elements.resultsList.insertAdjacentHTML('beforeend', markup);
}

const createButton = (type, page) => `
        <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
            <svg>
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
            <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        </button>
`;

const renderButtons = (totalNumResults, page, resultsPerPage) => {
    const pages = Math.ceil(totalNumResults / resultsPerPage);
    let button;

    if (page === 1 && pages > 1) {
        button = createButton('next', page);
    } else if (page < pages) {
        button = `
            ${createButton('prev', page)}
            ${createButton('next', page)}
        `;
    } else if (page === pages && pages > 1) {
        button = createButton('prev', page);
    }

    elements.resultsPagination.insertAdjacentHTML('afterbegin', button);
}


export const renderResults = (shows, page = 1, resultsPerPage = 8) => {
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;
    shows.slice(start, end).forEach(show => renderShow(show));

    // Render the buttons for pagination
    renderButtons(shows.length, page, resultsPerPage);
}