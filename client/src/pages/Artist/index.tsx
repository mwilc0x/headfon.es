import * as React from 'react';
import { ConnectHOC, Client, query } from 'urql';
import { IRouteProps } from '../../routing';
import { Consumer, selectArtistViewing, setArtistViewing, selectTrackDetails } from '../../store';
import './style.css';

interface Props extends IRouteProps {
  id: string;
  client: Client;
}

export class ArtistPage extends React.PureComponent<Props, {}> {
  public componentDidMount() {
    const { client, id } = this.props;

    client.executeQuery(query(GetArtist, { id }), true)
      .then((res: any) => {
        setArtistViewing(res.data.artist);
      });
  }
  public render() {
    return (
      <Consumer select={[selectArtistViewing, selectTrackDetails]}>
        {(artistViewing: Artist, trackDetails) => {
          const { name } = artistViewing;
          return (
            <div>
              <p>{name}</p>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default ConnectHOC()(ArtistPage);

const GetArtist = `
  query($id: String) {
    artist(id: $id) {
      name
    }
  }
`;