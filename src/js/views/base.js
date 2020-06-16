export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchButton: document.querySelector('.search__btn'),
    results: document.querySelector('.results'),
    resultsList: document.querySelector('.results__list'),
    resultsPagination: document.querySelector('.results__pages'),
    resultContainer: document.querySelector('.anime-container'),
    resultInfo: document.querySelector('.anime'),
    resultsOpening: document.querySelector('.openings'),
    resultsTrailer: document.querySelector('.trailer'),
    trailerVideo: document.querySelector('.video'),
    trailerCross: document.querySelector('.close'),
    likedShows: document.querySelector('.likes__list'),
    likeMenu: document.querySelector('.likes__field'),
    likesResultsPagination: document.querySelector('.likes__pages'),
    likesPanel: document.querySelector('.likes__panel'),
    animeGenres: document.querySelector('.anime-genres'),
    content: document.querySelector('body')
}

export const renderLoader = (parent) => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
}

