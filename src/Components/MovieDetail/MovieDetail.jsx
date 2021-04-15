import styles from './MovieDetail.module.css';

const MovieDetail = ({ movie }) => {
    const {
        title,
        overview,
        poster_path,
        genres,
        release_date,
        vote_average,
    } = movie;

    return (
        <>
            <div>
                <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                    width='320'
                />
                <div>
                    <h2>{title}</h2>
                    <p>Release date: {release_date}</p>
                    <p>Rating: {vote_average}</p>
                    <p>{overview}</p>
                    <h3>Genres</h3>
                    <ul>
                        {genres && genres.map(({ id, name }) => <li key={id}>{name}</li>)}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default MovieDetail;