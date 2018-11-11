import * as React from 'react';
import { ListHeader, TrackListing } from '../';

interface Props {
  tracks: TrackPaging;
}

function TrackList(props: Props) {
  const { tracks } = props;
  const { items } = tracks;

  return (
    <div>
      {!!items.length && <ListHeader>Tracks</ListHeader>}
      {items.map((track: Track, i: number) => (
        <TrackListing key={i} track={track} />
      ))}
    </div>
  );
}

TrackList.defaultProps = { tracks: { items: [] } };

export default TrackList;
