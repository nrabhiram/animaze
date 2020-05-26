import Search from './models/Search';
import { elements } from './views/base';

const state = {};

const controlSearch = async () => {
    // 1. Get input query from search
    const query = elements.searchInput.value;
    
    if (query) {
        // 2. Create new Search object and add it to the state
        state.search = new Search(query);

        // 3. Prepare UI for the results (a loader)
        console.log('loading');

        // 4. Get the results for the input
        await state.search.getResults();

        // 5. Render the results on the UI
        console.log(state.search.shows);

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
