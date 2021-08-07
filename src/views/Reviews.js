import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as Api from '../Services/Api';
import styles from './Pages.module.css';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    Api.fetchReviews(id).then(setReviews);
  }, [id]);
  return (
    <>
      {reviews &&
        (reviews.results.length > 0 ? (
          <ul className={styles.list}>
            {reviews.results.map(({ id, author, content }) => (
              <li key={id} className={styles.item}>
                <b>{`Author: ${author}`}</b>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.notice}>
            We don't have any reviews for this movie.
          </p>
        ))}
    </>
  );
}
