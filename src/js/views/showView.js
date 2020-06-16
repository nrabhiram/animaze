import { elements } from './base';

export const clearResult = () => {
    elements.resultInfo.innerHTML = '';
}

export const clearTrailer = () => {
    elements.resultsTrailer.innerHTML = '';
}

const renderDetails = (show) => {
    let markup;
    if (show.type && show.type !== 'Unknown') {
        markup = `
            <div class="anime-details">
                <figure class="anime-fig">
                    <img src="${show.image}" alt="${show.title}" class="anime__img">
                </figure>
                <div class="anime-data">
                    <div class="anime-title">${show.title}</div>

                    <div class="details-container anime-episodes">
                        <div class="highlight">Episodes:</div>
                        <div> ${show.episodes ? show.episodes : 'N/A'} (${show.duration})</div>
                    </div>
                    <div class="details-container anime-rating">
                        <div class="highlight">Rating:</div>
                        <div> ${show.rating ? show.rating : 'N/A'}</div>
                    </div>
                    <div class="details-container anime-score">
                        <div class="highlight">Score:</div>
                        <div> ${show.score ? show.score : 'N/A'}</div>
                    </div>
                    <div class="details-container anime-rank">
                        <div class="highlight">Rank:</div>
                        <div> ${show.rank ? show.rank : 'N/A'}</div>
                    </div>
                    <div class="details-container anime-duration">
                        <div class="highlight">Aired:</div>
                        <div> ${show.airing === false ? show.aired : 'Airing'}</div>
                    </div>
                    <div class="details-container anime-genre">
                        <div class="highlight">Genres:</div>
                        <div> ${renderGenres(show)}</div>
                    </div>
                    <div class="details-container anime-type">
                        <div class="highlight">Type:</div>
                        <div> ${show.type}</div>
                    </div>
                </div>
            </div>
        `;
    } else {
        markup = `Sorry! We don't have any information on this :(`;
    }
    return markup;
}

const renderPlot = (show, isLiked) => {
    let markup;
    if (show.synopsis) {
        markup = `
            <div class="anime-plot">
                <div class="plot-heading">Plot</div>
                <div class="anime__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
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

    return markup;
}

const renderTrivia = show => {
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
    return markup;
}

const renderSongs = show => {
    const markup = `
        <div class="anime-ost">
            <div class="openings">
                ${renderOpenings(show)}
            </div>
            <div class="endings">
                ${renderEndings(show)}
            </div>
        </div>
    `;
    return markup
}

const renderTrailerButton = show => {
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
    return markup;
}

const renderTrailer = show => {
    let markup;
    if (show.trailer) {
        markup = `
            <div class="wrapper">
                <div class="iframe-container">
                    <iframe src="${show.trailer}list=PL4Zkb_7gMrOzZlVy7jIeCjwScavYp6ssm&rel=0" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
            <svg class="close">
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        `;
    } else {
        markup = '';
    }
    return markup;
}

const renderOpenings = (show) => {
    let markupOpenings;
    if (show.openings.length !== 0 && show.openings[0] !== 'None') {
        markupOpenings = show.openings.map((el, id) => {
            el.replace(/ *\([^)]*\) */g, '');
            return `
                <div class="opening">
                    <div class="opening-number">${id + 1}.</div>
                    <div>${el}</div>
                </div>
            `;
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
            return `
                <div class="ending">
                    <div class="ending-number">${id + 1}.</div>
                    <div>${el}</div>
                </div>
            `;
        });
        markupEndings = markupEndings.join(' ');
        markupEndings = `<div class="endings-heading">Endings</div>${markupEndings}`;
    } else {
        markupEndings = '';
    }
    return markupEndings;
}

const renderGenres = (show) => {
    let markupGenre;
    if (show.genres.lenght !== 0) {
        markupGenre = show.genres.map(el => {
            return el.name;
        });
        markupGenre = markupGenre.join(', ');
    } else {
        markupGenre = 'N/A';
    }
    return markupGenre;
}

export const renderShow = (show, isLiked) => {
    const markup = `
        ${renderDetails(show)}
        ${renderPlot(show, isLiked)}
        ${renderTrivia(show)}
        ${renderSongs(show)}
        ${renderTrailerButton(show)}
    `;

    const markupTrailer = renderTrailer(show);

    elements.resultInfo.insertAdjacentHTML('afterbegin', markup);
    elements.resultsTrailer.insertAdjacentHTML('afterbegin', markupTrailer);
}












