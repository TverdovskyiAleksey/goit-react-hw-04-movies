import { useEffect, useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import qs from 'query-string';
import * as Api from '../Services/Api';

const MoviesPage = () => {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const [value, setValue] = useState(qs.parse(search)?.query || '');
  const [list, setList] = useState('');

  const handleChangeInput = e => {
    e.preventDefault();
    setValue(e.target.value);
    history.push({
      pathname,
      search: `?query=${e.target.value}`,
    });
  };

  useEffect(() => {
    Api.fetchQuery(value)
      .then(({ results }) => {
        setList(results);
      })
      .catch(error => console.log(error));
  }, [value]);

  return (
    <div>
      <input type="text" onChange={handleChangeInput} value={value} />
      <button type="submit">Search</button>
      {list && (
        <ul>
          {list.map(({ id, title }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: {
                    backUrl: '/',
                  },
                }}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
