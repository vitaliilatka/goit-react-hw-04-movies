import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import styles from './Navigation.module.css';

const Navigation = () => {
    return (
        <nav className={styles.navigation}>
            <NavLink
                exact
                to={routes.home}
                className='NavLink'
                activeClassName='NavLink--active'
            >
                Home
            </NavLink>
            <NavLink
                to={routes.movies}
                className='NavLink'
                activeClassName='NavLink--active'
            >
                Movies
            </NavLink>
        </nav>
    );
};

export default Navigation;