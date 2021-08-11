import { useEffect, useState } from 'react';
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
import Cast from './Cast';
import Reviews from './Reviews';

const MoviesView = () => {
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const { id } = useParams();

  const handleGoBack = () => {
    history.push({ pathname: location?.state?.from ?? '/movies' });
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
                      backUrl: url,
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
                      backUrl: url,
                    },
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <Route path={`${path}/cast`} exact>
            <Cast />
          </Route>

          <Route path={`${path}/reviews`}>
            <Reviews />
          </Route>
        </>
      )}
    </>
    // <div>
    //   <button onClick={handleGoBack}>Go back</button>
    //   <h1>{data.title}</h1>
    //   <p>User Score: {data.vote_average}</p>
    //   <b>Overview</b>
    //   <p>{data.overview}</p>
    //   <b>Genres</b>
    //   <img src={data.poster_path} alt="" />
    //   <ul>
    //     {data.ganers.map(({ id, name }) => (
    //       <li key={id}>{name}</li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default MoviesView;
