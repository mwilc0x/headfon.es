import * as React from 'react';
import { query } from 'urql';
import { unstable_createResource as createResource} from 'react-cache';
import { client } from '../../helpers';
import { IRouteProps } from '../../routing';
import { AlbumInfo, Track } from '../../components/album';
import { Spinner } from '../../components';
import { AlbumQuery } from '../../queries';
import './style.css';

interface Props extends IRouteProps {
  id?: string;
}

const AlbumDataResource = createResource(
  (id) => client.executeQuery(query(AlbumQuery, { id }), true)
);

export function Album(props: Props) {
  const { id } = props;
  const { data } = AlbumDataResource.read(id);
  const { album } = data;
  const { tracks } = album;

  return (
    <React.Suspense fallback={<Spinner size="large" />}>
      <div className="album-viewer">
        <div className="album-viewer__left">
          <AlbumInfo album={album} />
        </div>

        <div className="album-viewer__right">
          <ol className="album-track-list">
            {(tracks.items || []).map((track, i) => (
              <Track
                isPlaying={false}
                key={i}
                track={track}
              />
            ))}
          </ol>
        </div>
      </div>
    </React.Suspense>
  );
}

export default Album;
