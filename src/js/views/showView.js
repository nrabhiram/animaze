import { elements } from './base';

export const clearResult = () => {
    elements.resultInfo.innerHTML = '';
}

export const renderDetails = (show) => {
    let markup;
    if (show.type) {
        markup = `
            <div class="anime-details">
                <figure class="anime-fig">
                    <img src="${show.image}" alt="${show.title}" class="anime__img">
                </figure>
                <div class="anime-data">
                    <div class="anime-title">${show.title}</div>
                    <div class="anime-episodes"><span class="highlight">Episodes</span>: ${show.episodes}</div>
                    <div class="anime-episode-duration"><span class="highlight">${show.duration}</span>min per ep</div>
                    <div class="anime-rating"><span class="highlight">Rating</span>: ${show.rating}</div>
                    <div class="anime-score"><span class="highlight">Score</span>: ${show.score}</div>
                    <div class="anime-rank"><span class="highlight">Rank</span>: ${show.rank}</div>
                    <div class="anime-duration">${show.airing === false ? show.aired : ''}</div>
                    <div class="anime-genre"><span class="highlight">Genres</span>: Action, Adventure, Comedy, Drama, Sci-Fi, Space</div>
                    <div class="anime-type"><span class="highlight">Type</span>: ${show.type}</div>
                </div>
            </div>
        `;
    } else {
        markup = `Sorry! We don't have any information on this :(`;
    }
    elements.resultInfo.insertAdjacentHTML('beforeend', markup);
}

export const renderPlot = show => {
    let markup;
    if (show.synopsis) {
        markup = `
            <div class="anime-plot">
                <div class="plot-heading">Plot</div>
                <div class="anime__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart-outlined"></use>
                    </svg>
                </div>
            </div>
            <div class="plot-body">
                ${show.synopsis}
            </div>
        `;
    } else {
        markup = '';
    }
    
    elements.resultInfo.insertAdjacentHTML('beforeend', markup);
}

export const renderTrivia = show => {
    let markup;
    if (show.trivia) {
        markup = `
            <div class="anime-trivia">
                <div class="trivia-heading">Trivia</div>
                <div class="trivia-body">
                    ${show.trivia}
                </div>
            </div>
        `;
    } else {
        markup = '';
    }
    elements.resultInfo.insertAdjacentHTML('beforeend', markup);
}

export const renderSongs = show => {
    const markup = `
        <div class="anime-ost">
            <div class="openings">
                ${renderOpenings(show)}
            </div>
            <div class="endings">
                ${renderEndings(show)}
            </div>
        </div>
    `
    elements.resultInfo.insertAdjacentHTML('beforeend', markup);
}

export const renderTrailer = show => {
    let markup;
    if (show.trailer) {
        markup = `
            <div class="anime-trailer">
                <button class="btn-small anime__btn">
                    <svg>
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>
                    <span>Watch the trailer!</span>
                </button>
            </div>
        `;
    } else {
        markup = '';
    }
    elements.resultInfo.insertAdjacentHTML('beforeend', markup);
}

const renderOpenings = (show) => {
    let markupOpenings;
    if (show.openings.length !== 0 && show.openings[0] !== 'None') {
        markupOpenings = show.openings.map((el, id) => {
            el.replace(/ *\([^)]*\) */g, '');
            return `<div class="opening">${id + 1}. ${el}</div>`
        });
        markupOpenings = markupOpenings.join(' ');
        markupOpenings = `<div class="openings-heading">Openings</div>${markupOpenings}`;
    } else {
        markupOpenings = '';
    }
    return markupOpenings;
}

const renderEndings = (show) => {
    let markupEndings;
    if (show.endings.length !== 0) {
        markupEndings = show.endings.map((el, id) => {
            el.replace(/ *\([^)]*\) */g, '');
            return `<div class="ending">${id + 1}. ${el}</div>`
        });
        markupEndings = markupEndings.join(' ');
        markupEndings = `<div class="endings-heading">Endings</div>${markupEndings}`
    } else {
        markupEndings = '';
    }
    return markupEndings;
}










