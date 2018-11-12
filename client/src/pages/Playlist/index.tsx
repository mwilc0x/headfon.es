import * as React from 'react';
import { query } from 'urql';
import { unstable_createResource as createResource} from 'react-cache';
import { client } from '../../helpers';
import { IRouteProps } from '../../routing';
import { PlaylistInfo, Track } from '../../components/playlist';
import { PlaylistQuery } from '../../queries';
import './style.css';

interface Props extends IRouteProps {
  userId?: string;
  playlistId?: string;
}

const PlaylistDataResource = createResource(
  (input) => { 
    const { userId, playlistId } = JSON.parse(input);
    return client.executeQuery(query(PlaylistQuery, { userId, playlistId }), true)
  }
);

export function Playlist(props: Props) {
    const { userId, playlistId } = props;
    const { data } = PlaylistDataResource.read(JSON.stringify({ userId, playlistId }));
    const { playlist } = data;
    const { tracks } = playlist;
    return (
      <div className="playlist-viewer">
        <div className="playlist-viewer__left">
          <PlaylistInfo playlist={playlist} />
        </div>

        <div className="playlist-viewer__right">
          <ol className="playlist-track-list">
            {tracks.items.map(({ track }, i) => (
              <Track isPlaying={false} track={track} />
            ))}
          </ol>
        </div>
      </div>
    );
}

export default Playlist;
