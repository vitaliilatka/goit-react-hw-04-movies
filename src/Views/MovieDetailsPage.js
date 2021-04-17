import { useEffect, useState, Suspense, lazy } from 'react';
import { NavLink, Route, useHistory, useLocation } from 'react-router-dom';
import filmsApi from '../Services/Films.Api';
import MovieDetail from '../Components/MovieDetail/MovieDetail';
import routes from '../routes';
import Loader from '../Components/Loader/Loader';

const Cast = lazy(() =>
    import('../Components/Cast/Cast' /* webpack ChunkName "cast" */),
);

const Reviews = lazy(() =>
    import('../Components/Reviews/Reviews' /* webpack ChunkName "reviews" */),
);

const MovieDetailsPage = ({ match }) => {
    const [movie, setMovie] = useState({
        title: null,
        overview: null,
        poster_path: null,
        genres: null,
        release_date: '',
        vote_average: '',
    });
    const { state } = useLocation();
    const history = useHistory();

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

    const handleGoBack = () => {
        history.push({
            pathname: state?.from.pathname || routes.home,
            search: state?.from.search,
            state,
        });
    };

    return (
        <>
            <button type="button" onClick={handleGoBack}>
                Go back
            </button>
            {movie.poster_path ? (
                <MovieDetail movie={movie} />
            ) : (
                <h2>Sorry, details not found</h2>
            )}
            <div>
                <h3>Additional information</h3>
                <ul>
                    <li>
                        <NavLink
                            to={{
                                pathname: `${match.url}/cast`,
                                state,
                            }}
                        >
                            Cast
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={{
                                pathname: `${match.url}/reviews`,
                                state,
                            }}
                        >
                            Reviews
                        </NavLink>
                    </li>
                </ul>
            </div>
            <Suspense fallback={<Loader />}>
                <Route path={`${match.path}/cast`} component={Cast} />
                <Route path={`${match.path}/reviews`} component={Reviews} />
            </Suspense>
        </>
    );
};

export default MovieDetailsPage;