import * as React from 'react';
import { useQuery } from 'urql';
import { IRouteProps } from '../../routing';
import { PlaylistInfo, Track } from '../../components/playlist';
import { PlaylistQuery } from '../../queries';
import './style.css';

interface Props extends IRouteProps {
  userId?: string;
  playlistId?: string;
}

export function Playlist(props: Props) {
  const { userId, playlistId } = props;
  const [result] = useQuery({
    query: PlaylistQuery,
    variables: { userId, playlistId },
  });
  const { data } = result;
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
