import { Route, NavLink, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import filmsApi from './Services/Films.Api';
import Container from './Components/Container/Container';
import Homepage from './Views/Homepage';
import MoviePage from './Views/MoviePage';
import MovieDetailsPage from '';

function App() {
  useEffect(() => {
    filmsApi.fetchMovieReviews();
  }, []);
  return (
    <Container>
      <ul>
        <li>
          <NavLink
            exact
            to="/"
            className='NavLink'
            activeClassName='Navlink--active'
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className="Navlink"
            activeClassName="Navlink--active"
          >
            Movies
          </NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/movies" component={MoviesPage} />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
      </Switch>
    </Container>
  );
}

export default App;
