import * as React from 'react';
import { AlbumListing } from '../';
import './style.css';

interface IProps {
  albums: any
}

export default class AlbumList extends React.Component<IProps, {}> {
  public static defaultProps = { albums: { items: [] } }
  public render() {
    const { albums: { items }} = this.props;
    return (
      <div className="album-list">
        { items.slice(0, 5).map((album: any, i: number) => (
          <AlbumListing album={album} key={i} />
        ))}
      </div>
    )
  }
}
