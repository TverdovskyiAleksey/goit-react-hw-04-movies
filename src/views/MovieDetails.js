import { useEffect, useState, lazy, Suspense } from 'react';
import {
  useLocation,
  useHistory,
  Link,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import { useParams } from 'react-router';
import styles from './Pages.module.css';
import * as Api from '../Services/Api';

const Cast = lazy(() => import('./Cast' /* webpackChunkName: "Cast" */));
const Reviews = lazy(() =>
  import('./Reviews' /* webpackChunkName: "Reviews" */),
);

const MoviesDetails = () => {
  const history = useHistory();
  const { state } = useLocation();
  const { url, path } = useRouteMatch();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const handleGoBack = () => {
    history.push(state.backUrl);
  };

  useEffect(() => {
    Api.fetchMovieById(id)
      .then(setMovie)
      .catch(error => console.log(error));
  }, [id]);

  return (
    <>
      {movie && (
        <>
          <button
            type="button"
            className={styles.button}
            onClick={handleGoBack}
          >
            &#8701; Go back
          </button>
          <div className={styles.movie}>
            <img
              className={styles.posterDetails}
              src={
                movie.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
              }
              alt={movie.title ?? movie.name}
            />
            <div className={styles.description}>
              <h1 className={styles.title}>{movie.title}</h1>
              <p>User Score: {movie.vote_average}</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.info}>
            <p className={styles.infoTitle}>Additional information</p>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: `${url}/cast`,
                    state: {
                      backUrl: state.backUrl,
                    },
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `${url}/reviews`,
                    state: {
                      backUrl: state.backUrl,
                    },
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <Route path={`${path}/cast`} exact>
              <Cast />
            </Route>

            <Route path={`${path}/reviews`}>
              <Reviews />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
};

export default MoviesDetails;
