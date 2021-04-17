import { useEffect, useState } from 'react';
import filmsApi from '../../Services/Films.Api';

const Reviews = ({ match }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const movieId = Number(match.params.movieId);

  const fetchdata = async () => {
    try {
      const movieReviews = await filmsApi.fetchhMovieReviews(movieId);
      setReviews(movieReviews);
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
      <h6>Reviews</h6>
      {error && <p>Error 404 not found {error}</p>}
      {reviews.length > 0 && !error ? (
        <ul>
          {reviews.map(({ id, content, author }) => (
            <li key={id}>
              <p>{author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </>
  );
};

export default Reviews;