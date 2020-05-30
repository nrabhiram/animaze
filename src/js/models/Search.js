import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const res = await axios(`https://api.jikan.moe/v3/search/anime?q=${this.query}&page=1`);
        this.results = res.data.results;
    }

    async getTopResults() {
        const res = await axios(`https://api.jikan.moe/v3/top/anime/1`);
        this.top = res.data.top;
    }

    async getGenreResults(genre) {
        const res = await axios(`https://api.jikan.moe/v3/genre/anime/${genre}/1`);
        this.genre = res.data.anime;
    }
}