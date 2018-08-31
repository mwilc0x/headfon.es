import * as React from 'react';
import { ConnectHOC, Client, query } from 'urql';
import { playTrack, setArtistViewingTopTracks } from '../../../store';

interface Props {
  client: Client
  id: string,
  tracks: ArtistTopTrack[]
}

const Track = props => {
  const playArtistTrack = () => {
    playTrack(props.track);
  }

  const { name } = props.track;

  return (
    <div onClick={playArtistTrack}>
      { name }
    </div>
  );
}

class ArtistTopTracks extends React.PureComponent<Props, {}> {
  public componentDidMount() {
    const { client, id } = this.props;

    client.executeQuery(query(GetArtistTopTracks, { id }), true)
      .then((res: any) => {
        setArtistViewingTopTracks(res.data.artistTopTracks.tracks);
      });
  }
  public render() {
    const { tracks } = this.props;
    return (
      <div>
        { tracks.map((track, i) => (
          <Track key={i} track={track} />
        ))}
      </div>
    )
  }
}

export default ConnectHOC()(ArtistTopTracks);

const GetArtistTopTracks = `
  query($id: String) {
    artistTopTracks(id: $id) {
      tracks {
        album {
          images {
            url
          }
        }
        duration_ms
        name
        uri
      }
    }
  }
`;