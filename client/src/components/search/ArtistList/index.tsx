import * as React from 'react';
import './style.css';

interface Props {
  artists: object
}

function ArtistList(props: Props) {
  return (
    <div style={{ color: 'yellow' }}>{JSON.stringify(props.artists)}</div>
  );
}

ArtistList.defaultProps = { artists: {} };

export default ArtistList;
