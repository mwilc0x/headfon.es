import * as React from 'react';
import { ConnectHOC } from 'urql';
import { navigate } from '@reach/router';
import './style.css';

interface Props {}

function Search(props: Props) {
  let inputEl = React.useRef(null);
  const [inputQuery, setQuery] = React.useState('');

  React.useEffect(() => {
    if (inputEl.current == null) return;
    // (inputEl).focus();
  });

  function handleSearch() {
      navigate(`/search/results/${inputQuery}`);
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
    <div className="search-input">
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

