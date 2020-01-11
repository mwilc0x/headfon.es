import * as React from 'react';
import { useQuery } from 'urql';
import { IRouteProps } from '../../routing';
import { Consumer, selectArtistViewing, setArtistViewing } from '../../store';
import { ArtistTopTracks } from '../../components/artist';
import { Spinner } from '../../components';
import { ArtistQuery } from '../../queries';
import './style.css';

interface Props extends IRouteProps {
  id?: string;
}

export function ArtistPage(props: Props) {
  const { id = '' } = props;
  const [result] = useQuery({ query: ArtistQuery, variables: { id } });
  setArtistViewing(result.data.artist);

  return (
    <React.Suspense fallback={<Spinner size="large" />}>
      <Consumer select={[selectArtistViewing]}>
        {(artistViewing: any) => {
          const {
            images: [{ url }],
            name,
            tracks,
          } = artistViewing;

          return (
            <div className="artist-viewer">
              <div className="main-view-container">
                <div
                  className="artist-viewer__header"
                  style={{ backgroundImage: `url(${url})` }}
                >
                  <div className="header-image-test">test</div>
                </div>
                <p>{name}</p>
                <ArtistTopTracks id={id} tracks={tracks} />
              </div>
            </div>
          );
        }}
      </Consumer>
    </React.Suspense>
  );
}

export default ArtistPage;
