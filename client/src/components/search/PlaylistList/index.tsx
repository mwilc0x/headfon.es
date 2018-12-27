import * as React from 'react';
import { ListHeader, PlaylistListing } from '../';
import { ShowAll } from '../../';
import './style.css';

interface Props {
  playlists: PlaylistPaging;
}

function PlaylistList(props: Props) {
  const {
    playlists: { items },
  } = props;

  const [showAll, setShowAll] = React.useState(false);
  let itemsToShow = showAll ? items : items.slice(0, 5);

  return (
    <div className="playlist-list">
      {!!itemsToShow.length && <ListHeader>Playlists</ListHeader>}

      <div className="playlist-list__grid">
        {itemsToShow.map((playlist: Playlist, i: number) => (
          <PlaylistListing playlist={playlist} key={i} />
        ))}
      </div>

      {!showAll && items.length > 5 ? (
        <ShowAll handleClick={() => setShowAll(true)}>Show All</ShowAll>
      ) : null}
    </div>
  );
}

PlaylistList.defaultProps = { playlists: { items: [] } };

export default PlaylistList;
