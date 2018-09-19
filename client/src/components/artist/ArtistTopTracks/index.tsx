import * as React from 'react';
import { ConnectHOC, Client, query } from 'urql';
import { playTrack, setArtistViewingTopTracks } from '../../../store';
import { ArtistTopTracksQuery } from '../../../queries';

interface Props {
  client: Client;
  id: string;
  tracks: ArtistTopTrack[];
}

const Track = props => {
  const playArtistTrack = () => {
    playTrack(props.track);
  };

  const { name } = props.track;

  return <div onClick={playArtistTrack}>{name}</div>;
};

class ArtistTopTracks extends React.PureComponent<Props, {}> {
  public componentDidMount() {
    const { client, id } = this.props;

    client
      .executeQuery(query(ArtistTopTracksQuery, { id }), true)
      .then((res: any) => {
        setArtistViewingTopTracks(res.data.artistTopTracks.tracks);
      });
  }
  public render() {
    const { tracks } = this.props;
    return (
      <div>
        {tracks.map((track, i) => (
          <Track key={i} track={track} />
        ))}
      </div>
    );
  }
}

export default ConnectHOC()(ArtistTopTracks);
