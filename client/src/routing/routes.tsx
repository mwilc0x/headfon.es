import * as React from 'react';
import { Router } from '@reach/router';
import { Dashboard, Login } from '../pages';
import { Spinner } from '../components';
import PrivateRoute from './PrivateRoute';

const AsyncAlbum = React.lazy( () => import('../pages/Album'));
const AsyncArtist = React.lazy( () => import('../pages/Artist'));
const AsyncPlaylist = React.lazy( () => import('../pages/Playlist'));
const AsyncSearchResults = React.lazy( () => import('../pages/Search'));

export default class Routes extends React.Component<{}, {}> {
  public render() {
    return (
      <React.Suspense fallback={<Spinner />}>
        <Router>
            <AsyncAlbum path="/album/:id" />
            <AsyncArtist path="/artist/:id" />
            <AsyncPlaylist path="/playlist/:userId/:playlistId" />
            <PrivateRoute path="/" component={Dashboard} />
            <Login path="/login" />

            <AsyncSearchResults path="search/*" />
        </Router>
      </React.Suspense>

    );
  }
}
