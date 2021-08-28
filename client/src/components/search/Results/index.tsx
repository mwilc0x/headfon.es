import * as React from 'react';
import { useQuery } from 'urql';
import { SearchResultsQuery } from '../../../queries';
import { AlbumList, PlaylistList, TrackList } from '../';
import { Spinner } from '../../';
import './style.css';

function Results(props) {
  const { query } = props;
  const [result] = useQuery({
    query: SearchResultsQuery,
    variables: { query },
  });
  const { data } = result;

  const { albums, playlists, tracks } = data.search;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="search-results">
      <AlbumList albums={albums} />
      <PlaylistList playlists={playlists} />
      <TrackList tracks={tracks} />
    </div>
  );
}

const SuspendedResults = props => (
  <React.Suspense fallback={<Spinner size="large" />}>
    <Results {...props} />
  </React.Suspense>
);

export default SuspendedResults;
