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
    
    if (query !== '') {
        // 2. Create new Search object and add it to the state
        state.search = new Search(query);

        // 3. Prepare UI for the results (a loader)
        searchView.toggleResults();
        searchView.clearInput();
        searchView.clearResults();
        searchView.clearButtons();
        renderLoader(elements.results);

        // 4. Get the results for the input
        await state.search.getResults();

        // 5. Render the results on the UI
        //console.log(state.search.results);
        clearLoader();
        searchView.renderResults(state.search.results);
    } else {
        // 2. Create new Search object and add it to the state
        state.search = new Search('');

        // 3. Prepare UI for the results (a loader)
        searchView.toggleResults();
        searchView.clearInput();
        searchView.clearResults();
        searchView.clearButtons();
        renderLoader(elements.results);

        // 4. Get the results for the input
        await state.search.getTopResults();

        // 5. Render the results on the UI
        clearLoader();
        searchView.renderResults(state.search.top);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

window.addEventListener('load', controlSearch);

elements.resultsPagination.addEventListener('click', e => {
    const button = e.target.closest('.btn-inline');
    if (button) {
        const goToPage = parseInt(button.dataset.goto, 10);
        searchView.clearButtons();
        searchView.clearResults();
        if (state.search.results) {
            searchView.renderResults(state.search.results, goToPage); 
        } else {
            searchView.renderResults(state.search.top, goToPage);
        }
    }
});

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
        elements.results.classList.remove('transform');
        showView.clearResult();
        showView.clearTrailer();
        renderLoader(elements.resultInfo);
        
        // 4. Get information about the show
        await state.show.getShow();

        // 5. Render information on the UI
        clearLoader();
        //console.log(state.show);
        showView.renderShow(state.show, state.likes.isLiked(id));
    }
}

window.addEventListener('hashchange', controlShow);
window.addEventListener('load', controlShow);

elements.resultInfo.addEventListener('click', e => {
    const button = e.target.closest('.anime__btn');
    const likeButton = e.target.matches('.anime__love, .anime__love *');
    
    if (button) {
        elements.resultsTrailer.classList.toggle('active');
    } else if (likeButton) {
        controlLikes();
    }
});

elements.resultsTrailer.addEventListener('click', e=> {
    const button = e.target.closest('.close');
    let video = elements.resultsTrailer.children[0]

    if (button) {
        elements.resultsTrailer.classList.toggle('active');
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

        // Render the like on the UI
        likesView.renderLike(newLike);
    // If the show IS liked
    } else {
        // Remove like from the state
        state.likes.deleteLike(currentID);

        // Toggle like button
        likesView.toggleLikeButton(false);

        // Update UI
        likesView.deleteLike(currentID);
    }

    // Add likes list to local storage
    state.likes.persistData();

    // Toggle like menu
    likesView.toggleLikeMenu(state.likes.getNumLikes());
}

window.addEventListener('load', () => {
    // Create new Likes object
    state.likes = new Likes();

    // Restore previously liked shows
    state.likes.readStorage();

    // Toggle like menu
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render previously liked shows
    likesView.renderLikes(state.likes.likes)
});

elements.likesResultsPagination.addEventListener('click', e => {
    const button = e.target.matches('.results__btn, .results__btn *');
    if (button) {
        const goToPage = parseInt(button.dataset.goto, 10);
        likesView.renderResults(state.search.results, goToPage);
    }
})







