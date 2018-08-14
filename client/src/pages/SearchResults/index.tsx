import * as React from 'react';
import { IRouteProps } from '../../routing';
import { Consumer, selectSearchResults, selectCurrentPlayingTrack } from '../../store';
import { AlbumList, SearchInput, TrackList } from '../../components';
import './style.css';

export class SearchResults extends React.Component<IRouteProps, {}> {
  public render() {
    return (
      <Consumer select={[selectSearchResults, selectCurrentPlayingTrack]}>
      {({ albums, tracks }) => {
        return (
          <div className="search-results">
            <SearchInput />
            <div className="search-results-listings">
              <AlbumList albums={albums} />
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
