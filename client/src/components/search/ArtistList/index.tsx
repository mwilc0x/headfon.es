import * as React from 'react';
import './style.css';

interface Props {
  artists: object
}

export default class ArtistList extends React.PureComponent<Props, {}> {
  public static defaultProps = { artists: {} }
  public render() {
    return (
      <div style={{ color: 'yellow' }}>{JSON.stringify(this.props.artists)}</div>
    )
  }
}
