import { useState, useEffect } from 'react';
import filmsApi from '../Services/Films.Api';
import MoviesList from '../Components/MoviesList/MoviesList';
import { CSSTransition } from 'react-transition-group';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchdata = async () => {
        setIsLoading(true);
        try {
            const moviesRes = await filmsApi.fetchTrendingMovies();
            setMovies(moviesRes);
            setError(false);
        } catch (err) {
            setError(`${err}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchdata();
    });

    return (
        <>
            <h1>The most popular movies today</h1>
            {error && <p>Error 404 {error}</p>}
            <p></p>
            <CSSTransition
                in={!isLoading}
                classNames="fade"
                unmountOnExit
                timeout={1500}
            >
                <MoviesList movies={movies} />
            </CSSTransition>
        </>
    );
};

export default HomePage;