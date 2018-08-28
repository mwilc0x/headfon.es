import * as React from 'react';
import { AlbumListing, ListHeader } from '../';
import './style.css';

interface Props {
  albums: AlbumPaging
}

export default class AlbumList extends React.PureComponent<Props, {}> {
  public static defaultProps = { albums: { items: [] } }
  public render() {
    const { albums: { items }} = this.props;
    return (
      <div className="album-list">
        { !!items.length && <ListHeader>Albums</ListHeader> }

        <div className="album-list__grid">
          { items.slice(0, 5).map((album: Album, i: number) => (
            <AlbumListing album={album} key={i} />
          ))}
        </div>
      </div>
    )
  }
}
