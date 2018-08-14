import createState from 'react-copy-write';

export interface SearchGroup {
  items: object[]
}

export interface SearchResults {
  albums: SearchGroup,
  artists: SearchGroup,
  tracks: SearchGroup
}

interface IAppState {
  albumViewing: object,
  authorized: boolean,
  currentPlayingTrack: object | null,
  searchResults: SearchResults,
  showPlayer: boolean,
  trackDetails: object | null,
  user: object | null
}

const defaultState = {
  albumViewing: {
    artists: [{ name: '' }],
    images: [{ url: '' }],
    name: '',
    release_date: '',
    tracks: {
      items: []
    }
  },
  searchResults: { albums: { items: [] }, artists: { items: [] }, tracks: { items: [] } },
  trackDetails: {
    paused: true,
    track_window: { 
      current_track: { 
        album: { images: [{ url: '' }] }, 
        artists: [{ name: '' }],
        name: ''
      } 
    }
  }
}

const appState: IAppState = {
  albumViewing: defaultState.albumViewing,
  authorized: false,
  currentPlayingTrack: null,
  searchResults: defaultState.searchResults,
  showPlayer: false,
  trackDetails: defaultState.trackDetails,
  user: null
};

export const { Provider, Consumer, createSelector, mutate } = createState(appState);

/* ACTIONS */

export const authorize = (authorized: boolean) => mutate(draft => {
  draft.authorized = authorized;
});

export const setUser = (user: object) => mutate(draft => {
  draft.user = user;
});

export const updateSearchResults = (results: any) => {
  clearSearchResults();

  return mutate(draft => {
    draft.searchResults = results;
  });
}

export const clearSearchResults = () => mutate(draft => {
  draft.searchResults = defaultState.searchResults;
});

export const showPlayer = () => mutate(draft => {
  draft.showPlayer = true;
});

export const hidePlayer = () => mutate(draft => {
  draft.showPlayer = false;
});

export const playTrack = (track: any) => mutate(draft => {
  draft.currentPlayingTrack = track;
});

export const setTrackDetails = (trackDetails: any) => mutate(draft => {
  draft.trackDetails = trackDetails;
});

export const setAlbumViewing = (album: any) => mutate(draft => {
  draft.albumViewing = album;
});

export const resetAlbumViewing = () => mutate(draft => {
  draft.albumViewing = defaultState.albumViewing;
});

/* SELECTORS */

const selectUserFn: any = (state: IAppState) => state.user;
export const selectUser = createSelector(selectUserFn);

const selectAuthorizedFn: any = (state: IAppState) => state.authorized;
export const selectAuthorized = createSelector(selectAuthorizedFn);

const selectShowPlayerFn: any = (state: IAppState) => state.showPlayer;
export const selectShowPlayer = createSelector(selectShowPlayerFn);

const selectSearchResultsFn: any = (state: IAppState) => state.searchResults;
export const selectSearchResults = createSelector(selectSearchResultsFn);

const selectCurrentPlayingTrackFn: any = (state: IAppState) => state.currentPlayingTrack;
export const selectCurrentPlayingTrack = createSelector(selectCurrentPlayingTrackFn);

const selectTrackDetailsFn: any = (state: IAppState) => state.trackDetails;
export const selectTrackDetails = createSelector(selectTrackDetailsFn);

const selectAlbumViewingFn: any = (state: IAppState) => state.albumViewing;
export const selectAlbumViewing = createSelector(selectAlbumViewingFn);
