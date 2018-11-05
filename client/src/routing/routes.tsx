import * as React from 'react';
import { Router } from '@reach/router';
import { Dashboard, Login } from '../pages';
import PrivateRoute from './PrivateRoute';

const AsyncAlbum = (React as any).lazy( () => import('../pages/Album'));
const AsyncArtist = (React as any).lazy( () => import('../pages/Artist'));
const AsyncPlaylist = (React as any).lazy( () => import('../pages/Playlist'));
const AsyncSearchResults = (React as any).lazy( () => import('../pages/SearchResults'));

export default class Routes extends React.Component<{}, {}> {
  public render() {
    return (
      <Router>
        <AsyncAlbum path="/album/:id" />
        <AsyncArtist path="/artist/:id" />
        <AsyncPlaylist path="/playlist/:userId/:playlistId" />
        <PrivateRoute path="/" component={Dashboard} />
        <Login path="/login" />
        <AsyncSearchResults path="/search" />
      </Router>
    );
  }
}
