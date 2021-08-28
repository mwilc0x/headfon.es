import * as React from 'react';
import { useQuery } from 'urql';
import { IRouteProps } from '../../routing';
import { AlbumInfo, Track } from '../../components/album';
import { Spinner } from '../../components';
import { AlbumQuery } from '../../queries';
import './style.css';

interface Props extends IRouteProps {
  id?: string;
}

export function Album(props: Props) {
  const { id } = props;
  const [result] = useQuery({ query: AlbumQuery, variables: { id } });
  const { data } = result;
  const { album } = data;
  const { tracks } = album;

  return (
    <div className="album-viewer">
      <div className="album-viewer__left">
        <AlbumInfo album={album} />
      </div>

      <div className="album-viewer__right">
        <ol className="album-track-list">
          {(tracks.items || []).map((track, i) => (
            <Track isPlaying={false} key={i} track={track} />
          ))}
        </ol>
      </div>
    </div>
  );
}

const SuspendedAlbum = (props: Props) => (
  <React.Suspense fallback={<Spinner size="large" />}>
    <Album {...props} />
  </React.Suspense>
);

export default SuspendedAlbum;
