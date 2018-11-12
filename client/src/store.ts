import createState from 'react-copy-write';

export interface SearchGroup {
  items: object[];
}

export interface SearchResults {
  albums: AlbumPaging;
  playlists: PlaylistPaging;
  tracks: TrackPaging;
}

interface IAppState {
  albumViewing: Album;
  albumViewingLoaded: boolean;
  artistViewing: ArtistPage;
  authorized: boolean;
  currentPlayingTrack: object | null;
  playlistViewing: Playlist;
  searchResults: SearchResults;
  searchResultsLoaded: boolean;
  sessionEnded: boolean;
  showHiddenMenu: boolean;
  showPlayer: boolean;
  trackDetails: object | null;
  theme: string;
  user: object | null;
}

export const defaultState = {
  albumViewing: {
    album_type: '',
    artists: [{ name: '' }],
    images: [{ url: '' }],
    name: '',
    release_date: '',
    tracks: {
      items: [],
    },
    uri: '',
  },
  artistViewing: {
    images: [{ url: '' }],
    name: '',
    tracks: [],
  },
  playlistViewing: {
    description: '',
    images: [{ url: '' }],
    name: '',
    tracks: {
      items: [],
    },
    uri: '',
  },
  searchResults: {
    albums: { items: [] },
    artists: { items: [] },
    playlists: { items: [] },
    tracks: { items: [] },
  },
  theme: 'dark',
  trackDetails: {
    context: {
      metadata: {
        context_description: '',
      },
      uri: '',
    },
    duration: 0,
    paused: true,
    track_window: {
      current_track: {
        album: { images: [{ url: '' }] },
        artists: [{ name: '' }],
        name: '',
        uri: '',
      },
    },
  },
};

const appState: IAppState = {
  albumViewing: defaultState.albumViewing,
  albumViewingLoaded: false,
  artistViewing: defaultState.artistViewing,
  authorized: false,
  currentPlayingTrack: null,
  playlistViewing: defaultState.playlistViewing,
  searchResults: defaultState.searchResults,
  searchResultsLoaded: false,
  sessionEnded: false,
  showHiddenMenu: false,
  showPlayer: false,
  theme: defaultState.theme,
  trackDetails: defaultState.trackDetails,
  user: null,
};

export const { Provider, Consumer, createSelector, mutate } = createState(
  appState
);

/* ACTIONS */

export const showHiddenMenu = () =>
  mutate(draft => {
    draft.showHiddenMenu = true;
  });

export const hideHiddenMenu = () =>
  mutate(draft => {
    draft.showHiddenMenu = false;
  });

export const authorize = (authorized: boolean) =>
  mutate(draft => {
    draft.authorized = authorized;
  });

export const setUser = (user: object) =>
  mutate(draft => {
    draft.user = user;
  });

export const updateSearchResults = (results: any) => {
  clearSearchResults();

  return mutate(draft => {
    draft.searchResults = results;
    draft.searchResultsLoaded = true;
  });
};

export const clearSearchResults = () =>
  mutate(draft => {
    draft.searchResults = defaultState.searchResults;
    draft.searchResultsLoaded = false;
  });

export const showPlayer = () =>
  mutate(draft => {
    draft.showPlayer = true;
  });

export const hidePlayer = () =>
  mutate(draft => {
    draft.showPlayer = false;
  });

export const playTrack = (track: any) =>
  mutate(draft => {
    draft.currentPlayingTrack = track;
  });

// @TODO
export const playAlbum = (album: any) =>
  mutate(draft => {
    draft.currentPlayingTrack = album;
  });

export const setTrackDetails = (trackDetails: any) =>
  mutate(draft => {
    if (trackDetails === null) {
      draft.trackDetails = defaultState.trackDetails;
    } else {
      draft.trackDetails = trackDetails;
    }
  });

export const setAlbumViewing = (album: any) =>
  mutate(draft => {
    draft.albumViewing = album;
    draft.albumViewingLoaded = true;
  });
export const resetAlbumViewing = () =>
  mutate(draft => {
    draft.albumViewing = defaultState.albumViewing;
    draft.albumViewingLoaded = false;
  });

export const setArtistViewing = (artist: any) =>
  mutate(draft => {
    draft.artistViewing = { ...draft.artistViewing, ...artist };
  });
export const setArtistViewingTopTracks = (tracks: any) =>
  mutate(draft => {
    draft.artistViewing.tracks = tracks;
  });
export const resetArtistViewing = () =>
  mutate(draft => {
    draft.artistViewing = defaultState.artistViewing;
  });

export const setPlaylistViewing = (playlist: any) =>
  mutate(draft => {
    draft.playlistViewing = playlist;
  });
export const resetPlaylistViewing = () =>
  mutate(draft => {
    draft.playlistViewing = defaultState.playlistViewing;
  });

export const setTheme = (theme = '') =>
  mutate(draft => {
    theme = theme.toLowerCase();
    draft.theme = theme;

    if (window.localStorage) {
      window.localStorage.setItem('wavves-theme', theme);
    }
  });

export const endSession = () =>
  mutate(draft => {
    draft.sessionEnded = true;
  });

export const setLoggedOut = () => {
  mutate(draft => {
    draft.sessionEnded = true;
    draft.authorized = false;
  });
};

/* SELECTORS */

const selectShowHiddenMenuFn: any = (state: IAppState) => state.showHiddenMenu;
export const selectShowHiddenMenu = createSelector(selectShowHiddenMenuFn);

const selectUserFn: any = (state: IAppState) => state.user;
export const selectUser = createSelector(selectUserFn);

const selectAuthorizedFn: any = (state: IAppState) => state.authorized;
export const selectAuthorized = createSelector(selectAuthorizedFn);

const selectShowPlayerFn: any = (state: IAppState) => state.showPlayer;
export const selectShowPlayer = createSelector(selectShowPlayerFn);

const selectSearchResultsFn: any = (state: IAppState) => state.searchResults;
export const selectSearchResults = createSelector(selectSearchResultsFn);

const selectSearchResultsLoadedFn: any = (state: IAppState) =>
  state.searchResultsLoaded;
export const selectSearchResultsLoaded = createSelector(
  selectSearchResultsLoadedFn
);

const selectCurrentPlayingTrackFn: any = (state: IAppState) =>
  state.currentPlayingTrack;
export const selectCurrentPlayingTrack = createSelector(
  selectCurrentPlayingTrackFn
);

const selectTrackDetailsFn: any = (state: IAppState) => state.trackDetails;
export const selectTrackDetails = createSelector(selectTrackDetailsFn);

const selectAlbumViewingFn: any = (state: IAppState) => state.albumViewing;
export const selectAlbumViewing = createSelector(selectAlbumViewingFn);

const selectAlbumViewingLoadedFn: any = (state: IAppState) =>
  state.albumViewingLoaded;
export const selectAlbumViewingLoaded = createSelector(
  selectAlbumViewingLoadedFn
);

const selectArtistViewingFn: any = (state: IAppState) => state.artistViewing;
export const selectArtistViewing = createSelector(selectArtistViewingFn);

const selectPlaylistViewingFn: any = (state: IAppState) =>
  state.playlistViewing;
export const selectPlaylistViewing = createSelector(selectPlaylistViewingFn);

const selectThemeFn: any = (state: IAppState) => state.theme;
export const selectTheme = createSelector(selectThemeFn);

const selectSessionEndedFn: any = (state: IAppState) => state.sessionEnded;
export const selectSessionEnded = createSelector(selectSessionEndedFn);
