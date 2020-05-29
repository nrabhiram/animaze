import { elements } from './base';
import { formatTitle } from './searchView';

export const toggleLikeButton = (isLiked) => {
    const likeString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.anime__love use').setAttribute('href', `img/icons.svg#${likeString}`);
}

export const toggleLikeMenu = (numLikes) => {
    elements.likeMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
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

