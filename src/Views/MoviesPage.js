import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import filmsApi from '../Services/Films.Api';
import MoviesList from '../Components/MoviesList/MoviesList';
import { CSSTransition } from 'react-transition-group';

const MoviesPage = () => {
    const history = useHistory();
    const location = useLocation();
    const [inputquery, setInputQuery] = useState(location?.state?.query || '');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchdata = async () => {
        setIsLoading(true);
        try {
            const moviesRes = await filmsApi.searchMovie(inputquery);
            setMovies(moviesRes);
            setError(false);
            history.push({ ...location, search: `?query=${inputquery}` });
        } catch (err) {
            setError(`${err}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!inputquery) return;
        fetchdata();
    });

    const handleChange = e => {
        setInputQuery(e.currentTarget.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        fetchdata();
    };
    return (
        <>
            <h1>Search your favourite movie</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className='input'
                    type='text'
                    value={inputquery}
                    autoComplete='off'
                    autoFocus
                    onChange={handleChange}
                />
                <button type='submit' className='btn'>
                    Search
                </button>
            </form>
            {error && <p>404 error mistake... {error}</p>}
            {movies.length === 0 && <p>No results</p>}
            <CSSTransition
                in={!isLoading}
                classNames='fade'
                unmountOnExit
                timeout={1500}
            >
                <MoviesList movies={movies} query={inputquery} />
            </CSSTransition>
        </>
    );
};

export default MoviesPage;