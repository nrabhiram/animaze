import { elements } from './base';
import { formatTitle } from './searchView';

export const toggleLikeButton = (isLiked) => {
    const likeString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.anime__love use').setAttribute('href', `img/icons.svg#${likeString}`);
}

export const toggleLikeMenu = (numLikes) => {
    elements.likeMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

export const renderLikes = (likes, page = 1, likesPerPage = 5) => {
    const start = (page - 1) * likesPerPage;
    const end = page * likesPerPage;
    likes.slice(start, end).forEach(like => renderLike(like));

    // Render the buttons
    renderButtons(likes.length, page, likesPerPage);
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

    elements.likesResultsPagination.insertAdjacentHTML('afterbegin', button);
}

export const renderLike = (like) => {
    const markup = `
        <a class="likes__link likes__link--active" href="#${like.id}">
            <figure class="results__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${formatTitle(like.title)}</h4>
                <p class="results__type">${like.type}</p>
            </div>
        </a>
    `;
    elements.likedShows.insertAdjacentHTML('beforeend', markup);
}

export const deleteLike = id => {
    const like = document.querySelector(`.likes__link[href="#${id}"]`);
    if (like) {
        like.parentElement.removeChild(like);
    }
}

