import * as React from 'react';
import { ListHeader, PlaylistListing } from '../';
import './style.css';

interface Props {
  playlists: PlaylistPaging
}

function PlaylistList(props: Props) {
  const { playlists: { items }} = props;
  return (
    <div className="playlist-list">
      {!!items.length && <ListHeader>Playlists</ListHeader> }

      <div className="playlist-list__grid">
        { items.slice(0, 5).map((playlist: Playlist, i: number) => (
          <PlaylistListing playlist={playlist} key={i} />
        ))}
      </div>
    </div>
  );
}

PlaylistList.defaultProps = { playlists: { items: [] } };

export default PlaylistList;
