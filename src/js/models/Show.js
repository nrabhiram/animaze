import axios from 'axios';

export default class Show {
    constructor(id) {
        this.id = id;
    }

    async getShow() {
        const show = await axios(`https://api.jikan.moe/v3/anime/${this.id}`);
        this.information = show.data;
        this.airing = show.data.airing;
        this.duration = show.data.duration;
        this.rating = show.data.rating;
        this.rank = show.data.rank;
        this.synopsis = show.data.synopsis;
        this.title = show.data.title;
        this.type = show.data.type;
        this.aired = show.data.aired.string;
        this.episodes = show.data.episodes;
        this.image = show.data.image_url;
        this.trailer = show.data.trailer_url;
        this.openings = show.data.opening_themes;
        this.endings = show.data.ending_themes;
        this.trivia = show.data.background;
        this.genres = show.data.genres;
        this.score = show.data.score;
    }
}