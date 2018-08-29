import * as React from 'react';
import { ConnectHOC, Client, query } from 'urql';
import { IRouteProps } from '../../routing';
import { Consumer, selectAlbumViewing, setAlbumViewing, selectTrackDetails } from '../../store';
import { AlbumInfo, Track } from '../../components/album';
import './style.css';

interface Props extends IRouteProps {
  id: string;
  client: Client;
}

export class Album extends React.PureComponent<Props, {}> {
  public componentDidMount() {
    const { client, id } = this.props;

    client.executeQuery(query(GetAlbum, { id }), true)
      .then((res: any) => {
        setAlbumViewing(res.data.album);
      });
  }
  public render() {
    return (
      <Consumer select={[selectAlbumViewing, selectTrackDetails]}>
        {(albumViewing: any, trackDetails) => {
          const { tracks } = albumViewing;
          const { track_window: { current_track: { uri } } } = trackDetails;
          return (
            <div className="album-viewer">
              <div className="album-viewer__left">
                <AlbumInfo album={albumViewing} />
              </div>

              <div className="album-viewer__right">
                <ol className="album-track-list">
                  { tracks.items.map((track, i) => (
                    <Track
                      isPlaying={track.uri === uri}
                      key={i}
                      track={track}
                    />
                  ))}
                </ol>
              </div>
            </div>
          )
        }}
      </Consumer>
    );
  }
}

export default ConnectHOC()(Album);

const GetAlbum = `
  query($id: String) {
    album(id: $id) {
      uri
      artists {
        id
        name
      }
      images {
        url
      }
      name
      release_date
      tracks {
        items {
          duration_ms
          name
          uri
        }
      }
    }
  }
`;