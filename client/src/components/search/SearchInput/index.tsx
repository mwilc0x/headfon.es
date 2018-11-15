import * as React from 'react';
import { navigate } from '@reach/router';
import { useDebounce } from '../../../hooks';
import './style.css';

interface Props {}

function Search(props: Props) {
  const { useEffect, useState } = React;

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
      if (debouncedSearchTerm) {
        handleSearch();
      }
    },
    [debouncedSearchTerm]
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    const { value } = target;
    setSearchTerm(value);
  }

  function handleSearch() {
      navigate(`/search/results/${searchTerm}`);
  }

  return (
    <div className="search-input">
      <div className="search-input-info">
        Search for an album, songs or playlists
      </div>
      <input
        type="text"
        name="searchQuery"
        onChange={handleChange}
        placeholder="Start typing..."
      />
    </div>
  );
}

export default Search;

