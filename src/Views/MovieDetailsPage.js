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
    const [error, setError] = useState(false);
    const { state } = useLocation();
    const history = useHistory();

    const movieId = Number(match.params.movieId);

    const fetchdata = async () => {
        try {
            const movieInfo = await filmsApi.fetchhMovieInfo(movieId);
            const normalizedDate = await movieInfo.release_date
                .split('-')
                .reverse()
                .join('.');
            setMovie({ ...movieInfo, release_date: normalizedDate });
            setError(false);
        } catch (err) {
            setError(`${err}`);
        }
    };

    useEffect(() => {
        fetchdata();
    });

    const handleGoBack = () => {
        history.push({
            pathname: state?.from.pathname || routes.home,
            search: state?.from.search,
            state,
        });
    };

    return (
        <>
            <button type="button" className='btn' onClick={handleGoBack}>
                Go back
            </button>
            {error && <p>404 error mistake...{error}</p>}
            <MovieDetail movie={movie} />
            <div>
                <h3>Additional information</h3>
                <ul className='add-info-block'>
                    <li>
                        <NavLink
                            className='add-info'
                            activeClassName='add-info--active'
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
                            className='add-info'
                            activeClassName='add-info--active'
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