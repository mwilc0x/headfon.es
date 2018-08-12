import * as React from 'react';
import { TrackListing } from '../';

interface IProps {
  tracks: any
}

export default class TrackList extends React.Component<IProps, {}> {
  public static defaultProps = { tracks: { items: [] } }
  public render() {
    const { tracks } = this.props;
    return (
      <div>
        { tracks.items.map((track: any, i: number) => (
          <TrackListing key={i} track={track} />
        ))}
      </div>
    );
  }
}
