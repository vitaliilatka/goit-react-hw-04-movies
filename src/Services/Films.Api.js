import axios from 'axios';

const API_KEY = '8765af0175deb1ea94d186ddc499f755';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = {
    api_key: API_KEY,
};

const fetchTrendingMovies = () => {
    return axios
        .get(`/trending/all/day`)
        .then(({ data: { results } }) => results);
};

const searchMovie = (query = 'Bond') => {
    return axios
        .get(`/search/movie?query=${query}`)
        .then(({ data: { results } }) => console.log(results));
};

const fetchhMovieInfo = (movieId = 414) => {
    return axios.get(`/movie/${movieId}`).then(({ data }) => data);
};

const fetchhMovieCast = (movieId = 414) => {
    return axios
        .get(`/movie/${movieId}/credits`)
        .then(({ data: { cast } }) => cast);
};

const fetchhMovieReviews = (movieId = 414) => {
    return axios
        .get(`/movie/${movieId}/reviews`)
        .then(({ data: { results } }) => results);
};

export default {
    fetchTrendingMovies,
    searchMovie,
    fetchhMovieInfo,
    fetchhMovieCast,
    fetchhMovieReviews,
};