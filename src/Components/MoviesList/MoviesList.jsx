import { Link } from 'react-router-dom';
import unnamed from '../../Images/unnamed.jpg';
import styles from './MoviesList.module.css';
const MoviesList = ({ movies, query = '', from = '' }) => {
    return (
        <>
            <ul>
                {movies.map(({ id, title, name, poster_path }) => {
                    const imgUrl = poster_path
                        ? `https://image.tmdb.org/t/p/w500${poster_path}`
                        : unnamed;
                    return (
                        <li key={id}>
                            <Link to={{ pathname: `/movies/${id}`, state: { query, from } }}>
                                <img src={imgUrl} alt={title} />
                                <p>{title ? title : name}</p>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default withRouter(MoviesList);