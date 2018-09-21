import * as React from 'react';
import { ConnectHOC, Client, query } from 'urql';
import { IRouteProps } from '../../routing';
import {
  Consumer,
  resetAlbumViewing,
  selectAlbumViewing,
  setAlbumViewing,
  selectAlbumViewingLoaded,
  selectTrackDetails,
} from '../../store';
import { AlbumInfo, Track } from '../../components/album';
import { AlbumQuery } from '../../queries';
import './style.css';

interface Props extends IRouteProps {
  id: string;
  client: Client;
}

export class Album extends React.PureComponent<Props, {}> {
  public componentDidMount() {
    const { client, id } = this.props;

    client.executeQuery(query(AlbumQuery, { id }), true).then((res: any) => {
      setAlbumViewing(res.data.album);
    });
  }
  public componentWillUnmount() {
    resetAlbumViewing();
  }
  public render() {
    return (
      <Consumer
        select={[
          selectAlbumViewing,
          selectAlbumViewingLoaded,
          selectTrackDetails,
        ]}
      >
        {(albumViewing: any, albumViewingLoaded: any, trackDetails) => {
          const { tracks } = albumViewing;
          const {
            track_window: {
              current_track: { uri },
            },
          } = trackDetails;

          if (albumViewingLoaded === false) {
            return null;
          }

          return (
            <div className="album-viewer">
              <div className="album-viewer__left">
                <AlbumInfo album={albumViewing} />
              </div>

              <div className="album-viewer__right">
                <ol className="album-track-list">
                  {tracks.items.map((track, i) => (
                    <Track
                      isPlaying={track.uri === uri}
                      key={i}
                      track={track}
                    />
                  ))}
                </ol>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default ConnectHOC()(Album);
