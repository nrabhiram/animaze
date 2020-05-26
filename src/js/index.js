import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

const state = {};

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

        // 4. Get the results for the input
        await state.search.getResults();

        // 5. Render the results on the UI
        console.log(state.search.shows);
        searchView.renderResults(state.search.shows);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
