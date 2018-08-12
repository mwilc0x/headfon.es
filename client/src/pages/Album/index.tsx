import * as React from 'react';
import { ConnectHOC, query } from 'urql';
import { IRouteProps } from '../../routing';
import { Consumer, selectAlbumViewing, setAlbumViewing } from '../../store';
import { AlbumInfo, Track } from '../../components/album';
import './style.css';

interface Props extends IRouteProps {
  id: string;
  client: any;
}

export class Album extends React.Component<Props, {}> {
  public componentDidMount() {
    const { client, id } = this.props;

    client.executeQuery(query(GetAlbum, { id }), true)
      .then((res: any) => {
        setAlbumViewing(res.data.album);
      });
  }
  public render() {
    return (
      <Consumer select={[selectAlbumViewing]}>
        {(albumViewing: any) => {
          const { tracks } = albumViewing;
          return (
            <div className="album-viewer">
              <div className="album-viewer__left">
                <AlbumInfo album={albumViewing} />
              </div>

              <div className="album-viewer__right">
                <ol className="track-listing">
                  { tracks.items.map((track, i) => (
                    <Track 
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