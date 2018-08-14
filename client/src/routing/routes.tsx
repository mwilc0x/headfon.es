import * as React from 'react';
import { Router } from "@reach/router";
import Loadable from 'react-loadable';
import { Loading } from '../components';
import { Dashboard, Login } from '../pages';
import PrivateRoute from './PrivateRoute';

export interface IRouteProps {
  path: string
};

const AsyncAlbum = Loadable({
  delay: 30000,
  loader: () => import('../pages/Album'),
  loading: Loading
});

const AsyncSearchResults = Loadable({
  delay: 30000,
  loader: () => import('../pages/SearchResults'),
  loading: Loading
});

export default class Routes extends React.Component<{}, {}> {
    public render() {
      return (
        <Router>
          <AsyncAlbum path="/album/:id" />
          <PrivateRoute path="/" component={Dashboard} />
          <Login path="/login" />
          <AsyncSearchResults path="/search" />
        </Router>
      );
    }
}
