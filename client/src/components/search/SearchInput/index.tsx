import * as React from 'react';
import { ConnectHOC, Client, query } from 'urql';
import { updateSearchResults } from '../../../store';
import { navigate } from '@reach/router';
import { SearchQuery } from '../../../queries';
import './style.css';

interface Props {
  client: Client;
}

function Search(props: Props) {
  const { client } = props;
  let inputEl = React.useRef(null);
  const [inputQuery, setQuery] = React.useState('');

  React.useEffect(() => {
    if (inputEl.current == null) return;
    // (inputEl).focus();
  });

  function handleSearch() {
    client
      .executeQuery(query(SearchQuery, { query: inputQuery }), true)
      .then((res: any) => {
        updateSearchResults(res.data.search);
        navigate('/search');
      });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    const { value } = target;
    setQuery(value);
  }

  function handleKeyPress(e: any) {
    if (e.key === 'Enter') {
      handleSearch();
      e.target.blur();
    }
  };

  return (
    <div className="search">
      <div className="search-input-info">
        Search for an album, songs or playlists
      </div>
      <input
        type="text"
        name="searchQuery"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Start typing..."
        ref={inputEl}
      />
    </div>
  );
}

export default ConnectHOC()(Search);

