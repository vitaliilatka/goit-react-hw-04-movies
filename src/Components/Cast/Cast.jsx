import { useEffect, useState } from 'react';
import filmsApi from '../../Services/Films.Api';
import styles from './Cast.module.css';
import defaultAvatar from '../../Images/default-avatar.png';

const Cast = ({ match }) => {
    const [cast, setCast] = useState([]);
    const [error, setError] = useState(false);
    const movieId = Number(match.params.movieId);

    const fetchdata = async () => {
        try {
            const movieCast = await filmsApi.fetchhMovieCast(movieId);
            setCast(movieCast);
            setError(false);
        } catch (err) {
            setError(`${err}`);
        }
    };

    useEffect(() => {
        fetchdata();
    });

    return (
        <>
            <h5>Cast: </h5>
            {error && <p>404 Error {error}</p>}
            <ul className={styles.flex}>
                {cast.map(({ id, name, character, profile_path }) => {
                    const imgUrl = profile_path
                        ? `https://image.tmdb.org/t/p/w500${profile_path}`
                        : defaultAvatar;
                    return (
                        <li key={id} className={styles.card}>
                            <img src={imgUrl} alt={name} />
                            <div>
                                <p>{name}</p>
                                <p>{character}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default Cast;