import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import filmsApi from '../services/films-api';

const HomePage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchdata() {
            const moviesRes = await filmsApi.fetchTrendingMovies();
            setMovies(moviesRes);
        }
        fetchdata();
    }, []);

    return (
        <>
            <h1>Это домашняя страница</h1>
            <ul>
                {movies.map(({ id, title, poster_path }) => (
                    <li key={id}>
                        <Link to={`/movies/${id}`}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                                alt={title}
                                width="300"
                            />
                            <p>{title}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default HomePage;

//<img src="https://image.tmdb.org/t/p/w500{{poster_path}}" alt="{{title}}" data-id="{{id}}"