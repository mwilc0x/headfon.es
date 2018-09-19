import * as React from 'react';
import { ConnectHOC, Client, query } from 'urql';
import { IRouteProps } from '../../routing';
import { PlaylistInfo, Track } from '../../components/playlist';
import {
  Consumer,
  selectPlaylistViewing,
  selectTrackDetails,
  setPlaylistViewing,
} from '../../store';
import { PlaylistQuery } from '../../queries';
import './style.css';

interface Props extends IRouteProps {
  userId: string;
  playlistId: string;
  client: Client;
}

export class Playlist extends React.PureComponent<Props, {}> {
  public componentDidMount() {
    const { client, userId, playlistId } = this.props;

    client
      .executeQuery(query(PlaylistQuery, { userId, playlistId }), true)
      .then((res: any) => {
        setPlaylistViewing(res.data.playlist);
      });
  }
  public render() {
    return (
      <Consumer select={[selectPlaylistViewing, selectTrackDetails]}>
        {(playlistViewing: any, trackDetails) => {
          const { tracks } = playlistViewing;
          const {
            track_window: {
              current_track: { uri },
            },
          } = trackDetails;
          return (
            <div className="playlist-viewer">
              <div className="playlist-viewer__left">
                <PlaylistInfo playlist={playlistViewing} />
              </div>

              <div className="playlist-viewer__right">
                <ol className="playlist-track-list">
                  {tracks.items.map(({ track }, i) => (
                    <Track isPlaying={track.uri === uri} track={track} />
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

export default ConnectHOC()(Playlist);
