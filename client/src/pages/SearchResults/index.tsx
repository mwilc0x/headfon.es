import * as React from 'react';
import { IRouteProps } from '../../routing';
import { Consumer, selectSearchResults, selectCurrentPlayingTrack } from '../../store';
import { AlbumList, SearchInput, PlaylistList, TrackList } from '../../components';
import './style.css';

export class SearchResults extends React.PureComponent<IRouteProps, {}> {
  public render() {
    return (
      <Consumer select={[selectSearchResults, selectCurrentPlayingTrack]}>
      {(state: { albums: AlbumPaging, playlists: PlaylistPaging, tracks: TrackPaging }) => {
        
        const { albums, playlists, tracks } = state;
        return (
          <div className="search-results">
            <SearchInput />
            <div className="search-results-listings">
              <AlbumList albums={albums} />
              <br />
              <PlaylistList playlists={playlists} />
              <TrackList tracks={tracks} />
            </div>
          </div>
        );
      }}
      </Consumer>
    );
  }
}

export default SearchResults;
