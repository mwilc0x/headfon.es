import * as React from 'react';
import './style.css';

interface IProps {
  artists: object
}

export default class ArtistList extends React.Component<IProps, {}> {
  public static defaultProps = { artists: {} }
  public render() {
    return (
      <div style={{ color: 'yellow' }}>{JSON.stringify(this.props.artists)}</div>
    )
  }
}
