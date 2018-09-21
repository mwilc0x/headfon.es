import * as React from 'react';
import { ListHeader, TrackListing } from '../';

interface Props {
  tracks: TrackPaging;
}

export default class TrackList extends React.PureComponent<Props, {}> {
  public static defaultProps = { tracks: { items: [] } };
  public render() {
    const { tracks } = this.props;
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
}
