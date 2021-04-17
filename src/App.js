import { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';
import Container from './Components/Container/Container';
import AppBar from './Components/AppBar/AppBar';
import Loader from './Components/Loader/Loader';

const HomePage = lazy(() =>
  import('./Views/HomePage' /*webpack chunkName: 'home-page' */),
);

const MoviesPage = lazy(() =>
  import('./Views/MoviesPage' /*webpack chunkName: 'movies-page' */),
);

const MovieDetailsPage = lazy(() =>
  import('./Views/MovieDetailsPage' /*webpack chunkName: movies-details-page */),
);

function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route exact path={routes.movies} component={MoviesPage} />
          <Route path={routes.movieDetail} component={MovieDetailsPage} />
          <Redirect to={routes.home} />
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;