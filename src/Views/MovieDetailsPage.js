import { useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import filmsApi from '../services/films-api';
import Cast from '../components/Cast';
import Reviews from '../components/Reviews';

const MovieDetailsPage = ({ match }) => {
    const [movie, setMovie] = useState({
        title: null,
        overview: null,
        poster_path: null,
        genres: null,
        release_date: '',
    });
    const { title, overview, poster_path, genres, release_date } = movie;
    const movieId = Number(match.params.movieId);

    useEffect(() => {
        async function fetchdata() {
            const movieInfo = await filmsApi.fetchhMovieInfo(movieId);
            const normalizedDate = await movieInfo.release_date
                .split('-')
                .reverse()
                .join('.');
            setMovie({ ...movieInfo, release_date: normalizedDate });
        }
        fetchdata();
    }, []);
    return (
        <>
            <h1>Это страница с детальной информацией о кинофильме</h1>
            {poster_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                    width="320"
                />
            )}
            <h2>{title}</h2>
            <p>{release_date}</p>
            <p>{overview}</p>
            <h3>Genres</h3>
            <ul>
                {genres && genres.map(({ id, name }) => <li key={id}>{name}</li>)}
            </ul>
            <ul>
                <li>
                    <NavLink to={`${match.url}/cast`}>Cast</NavLink>
                </li>
                <li>
                    <NavLink to={`${match.url}/reviews`}>Reviews</NavLink>
                </li>
            </ul>
            <Route path={`${match.path}/cast`} component={Cast} />
            <Route path={`${match.path}/reviews`} component={Reviews} />
        </>
    );
};

export default MovieDetailsPage;