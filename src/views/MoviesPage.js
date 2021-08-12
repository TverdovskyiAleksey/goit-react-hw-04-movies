import { useEffect, useState } from 'react';
import { useLocation, useHistory, Link, useRouteMatch } from 'react-router-dom';
import qs from 'query-string';
import * as Api from '../Services/Api';
import styles from './Pages.module.css';

const MoviesPage = () => {
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const value = qs.parse(location.search)?.query || '';
  const [list, setList] = useState([]);

  const handleChangeInput = e => {
    e.preventDefault();
    if (e.target.elements.searching.value.trim() === '') {
      return alert('Enter a value to search.');
    }
    history.push({
      ...location,
      search: `query=${e.target.elements.searching.value}`,
    });
  };

  useEffect(() => {
    if (value === '') {
      return;
    }
    Api.fetchQuery(value)
      .then(({ results }) => {
        setList(results);
      })
      .catch(error => console.log(error));
  }, [value]);

  return (
    <div>
      <form onSubmit={handleChangeInput}>
        <input type="text" placeholder="Search movies" name="searching" />
        <button type="submit">Search</button>
      </form>
      {list && (
        <ul className={styles.moviesList}>
          {list.map(({ id, title, name, poster_path }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `${url}/${id}`,
                  state: {
                    backUrl: location,
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
                <p>{title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
