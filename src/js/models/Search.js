import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const res = await axios(`https://api.jikan.moe/v3/search/anime?q=${this.query}&page=1`);
        this.shows = res.data.results;
    }
}