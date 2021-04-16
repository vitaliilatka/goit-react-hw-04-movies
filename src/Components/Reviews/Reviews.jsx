import { useEffect, useState } from 'react';
import filmsApi from '../../services/films-api';

const Reviews = ({ match }) => {
  const [reviews, setReviews] = useState([]);
  const movieId = Number(match.params.movieId);

  useEffect(() => {
    async function fetchdata() {
      const movieReviews = await filmsApi.fetchhMovieReviews(movieId);
      setReviews(movieReviews);
    }
    fetchdata();
  }, []);
  return (
    <>
      <h6>Reviews</h6>
      {reviews.length > 0 ? (
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