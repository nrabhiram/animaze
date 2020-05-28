export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    results: document.querySelector('.results'),
    resultsList: document.querySelector('.results__list'),
    resultsPagination: document.querySelector('.results__pages'),
    resultInfo: document.querySelector('.anime'),
    resultsOpening: document.querySelector('.openings'),
    resultsTrailer: document.querySelector('.trailer'),
    trailerVideo: document.querySelector('.video'),
    trailerCross: document.querySelector('.close')
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