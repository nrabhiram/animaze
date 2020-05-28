import Search from './models/Search';
import Show from './models/Show';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as showView from './views/showView';
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

        // 4. Get the results for the input
        await state.search.getResults();

        // 5. Render the results on the UI
        //console.log(state.search.results);
        clearLoader();
        searchView.renderResults(state.search.results);
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
        searchView.renderResults(state.search.results, goToPage);
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
        
        // 4. Get information about the show
        await state.show.getShow();

        // 5. Render information on the UI
        clearLoader();
        //console.log(state.show);
        showView.renderShow(state.show);
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
        // 1. Add like to the state
        state.likes.addLike(currentID, state.show.title, state.show.type, state.show.image);

        // 2. Render the like on the UI
        console.log(state.likes.likes)
    // If the show IS liked
    } else {
        // 1. Remove like from the state
        state.likes.deleteLike(currentID);
        // 2. Update UI
        console.log(state.likes.likes);
    }
}






