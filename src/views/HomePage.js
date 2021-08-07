import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import qs from 'query-string';
import * as Api from '../Services/Api';
import styles from './Pages.module.css';

const HomePage = () => {
  const { pathname, search } = useLocation();

  const [list, setList] = useState([]);
  const [value, setValue] = useState(qs.parse(search)?.query || '');

  useEffect(() => {
    Api.fetchMoviesTrending()
      .then(({ results }) => {
        setList(results);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Trending Today</h1>
      <ul className={styles.homeList}>
        {list.map(({ id, title, name, poster_path }) => (
          <li key={id} className={styles.homeItem}>
            <Link
              to={{
                pathname: `Movies/${id}`,
                state: {
                  backUrl: pathname,
                  value,
                },
              }}
            >
              <img
                className={styles.poster}
                src={
                  poster_path !== null
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
                }
                alt={title ?? name}
                width="280px"
                height="450px"
              />
              <p>{title ?? name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
