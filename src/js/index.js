import Search from './models/Search';
import Show from './models/Show';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as showView from './views/showView';
import * as likesView from './views/likesView'
import { elements, renderLoader, clearLoader } from './views/base';


/** Global state of the app
 * - Search object
 * - Current show object
 * - Liked shows object
 */
const state = {};


/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1. Get input query from search
    const query = searchView.getInput()
    
    if (query) {
        // 2. Create new Search object and add it to the state
        state.search = new Search(query);

        // 3. Prepare UI for the results (a loader)
        searchView.clearInput();
        searchView.clearResults();
        searchView.clearButtons();
        renderLoader(elements.results);

        try {
            // 4. Get the results for the input
            await state.search.getResults();

            // 5. Render the results on the UI
            clearLoader();
            searchView.renderResults(state.search.results);
        } catch (err) {
            alert('Something went wrong. Please try again!');
            console.log(err);
        }
    }
}

const topSearch = async () => {
    // 1. Create new Search object and add it to the state
    state.search = new Search('');

    // 2. Prepare UI for the results (a loader)
    searchView.clearInput();
    searchView.clearResults();
    searchView.clearButtons();
    renderLoader(elements.results);

    try {
        // 3. Get the results for the input
        await state.search.getTopResults();

        // 4. Render the results on the UI
        clearLoader();
        searchView.renderResults(state.search.top);
    } catch (err) {
        alert('Something went wrong. Please try again!');
        console.log(err);
    }
}

const genreSearch = async (button) => {
    const genreID = button.dataset.genre;
    state.search = new Search('');
    searchView.transformResults();
    // 3. Prepare UI for the results (a loader)
    searchView.clearGenres();
    searchView.clearInput();
    searchView.clearResults();
    searchView.clearButtons();
    renderLoader(elements.results);

    try {
        // 4. Get the results for the input
        await state.search.getGenreResults(genreID);

        // 5. Render the results on the UI
        clearLoader();
        searchView.renderResults(state.search.genre);
    } catch (err) {
        alert('Something went wrong. Please try again!');
        console.log(err);
    }
}


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.resultsPagination.addEventListener('click', e => {
    const button = e.target.closest('.btn-inline');
    if (button) {
        const goToPage = parseInt(button.dataset.goto, 10);
        searchView.clearButtons();
        searchView.clearResults();
        if (state.search.results) {
            searchView.renderResults(state.search.results, goToPage); 
        } else if (state.search.top) {
            searchView.renderResults(state.search.top, goToPage);
        } else if (state.search.genre) {
            searchView.renderResults(state.search.genre, goToPage);
        }
    }
});

elements.searchButton.addEventListener('click', () => {
    if (state.search || elements.searchInput.value) searchView.transformResults();
});

elements.results.addEventListener('click', e => {
    const result = e.target.matches('.results__link, .results__link *');
    if (result) {
        searchView.removeResults();
    }
});

elements.resultInfo.addEventListener('click', (e) => {
    const button = e.target.closest('.genre-btn');

    if (button) {
        genreSearch(button);
    }
})

/**
 * SHOW CONTROLLER
 */
const controlShow = async () => {
    // 1. Get the ID from the hashchange
    const id = location.hash.replace(/^#/, '');
    if (id) {
        // 2. Create Show object and add it to the state
        state.show = new Show(id);

        // 3. Prepare UI for the result
        showView.clearResult();
        showView.clearTrailer();
        renderLoader(elements.resultInfo);
        
        try {
            // 4. Get information about the show
            await state.show.getShow();

            // 5. Render information on the UI
            clearLoader();
            //console.log(state.show);
            //if (state.search || elements.resultsList.children.length !== 0) searchView.highlightSelected(id);
            showView.renderShow(state.show, state.likes.isLiked(id));
        } catch (err) {
            alert('Something went wrong. Please try again!');
            console.log(err);
        }
    } else {
        try {
            await topSearch();
        } catch (err) {
            alert('Something went wrong. Please try again!');
            console.log(err);
        }
    }

}

window.addEventListener('hashchange', controlShow);

elements.resultInfo.addEventListener('click', e => {
    const button = e.target.closest('.anime__btn');
    const likeButton = e.target.matches('.anime__love, .anime__love *');
    
    if (button) {
        elements.resultsTrailer.classList.toggle('active');
        elements.content.classList.toggle('remove-overflow');
    } else if (likeButton) {
        controlLikes();
    }
});

elements.resultsTrailer.addEventListener('click', e=> {
    const button = e.target.closest('.close');
    let video = elements.resultsTrailer.children[0].children[0].children[0];

    if (button) {
        elements.resultsTrailer.classList.toggle('active');
        elements.content.classList.toggle('remove-overflow');
        video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    }
});


/**
 * LIKES CONTROLLER
 */
const controlLikes = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.show.id;

    // If the show is NOT liked
    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(currentID, state.show.title, state.show.type, state.show.image);

        // Toggle like button
        likesView.toggleLikeButton(true);


    // If the show IS liked
    } else {
        // Remove like from the state
        state.likes.deleteLike(currentID);

        // Toggle like button
        likesView.toggleLikeButton(false);
    }

    // Add likes list to local storage
    state.likes.persistData();

    // Toggle like menu
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render liked shows on the UI
    likesView.clearLikes();
    likesView.clearButtons();
    likesView.renderLikes(state.likes.likes);
}

window.addEventListener('load', () => {
    controlShow();

    // Create new Likes object
    state.likes = new Likes();

    // Restore previously liked shows
    state.likes.readStorage();

    // Toggle like menu
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render previously liked shows
    likesView.renderLikes(state.likes.likes);

});

window.addEventListener('click', (e) => {
    const button = e.target.matches('.likes__icon, .likes__icon *');
    const buttonPage = e.target.matches('.like__btn, .like__btn *');
    const likeButton = e.target.matches('.header__likes, .header__likes *');
    if (button) {
        elements.likesPanel.classList.toggle('display-likes');  
    } else if (!button && !buttonPage && !likeButton) {
        elements.likesPanel.classList.remove('display-likes'); 
    }
})

elements.likedShows.addEventListener('click', e => {
    const result = e.target.matches('.likes__link, .likes__link *');

    if (result) {
        searchView.removeResults();
    }
})

elements.likesResultsPagination.addEventListener('click', e => {
    const button = e.target.closest('.btn-inline');
    if (button) {
        const goToPage = parseInt(button.dataset.goto, 10);
        likesView.clearButtons();
        likesView.clearLikes();
        likesView.renderLikes(state.likes.likes, goToPage);
    }
})

















