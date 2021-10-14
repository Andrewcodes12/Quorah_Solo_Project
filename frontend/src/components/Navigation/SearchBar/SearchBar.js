import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './SearchBar.module.css';

const SearchBar = () => {
  const history = useHistory();
  const [queryString, setQueryString] = useState(new URLSearchParams(history.location.search).get('q') ?? '');

  const updateSearch = (e) => {
    console.log(e.target.value)
    setQueryString(e.target.value);
    if (e.target.value) {
      history.replace({
        pathname: '/feed',
        search: `?q=${e.target.value}`,
      });
    } else {
      history.replace({
        pathname: '',
      });
    }

  };


  return (
    <div className={styles.div}>
      <form onSubmit={updateSearch}>
      <input placeholder="Search Quorah" className={styles.searchBar} type="search"  />
      </form>
    </div>
  );
};

export default SearchBar;
