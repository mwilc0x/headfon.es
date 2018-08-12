import * as React from 'react';
import { Router } from "@reach/router";

import { Album, Dashboard, Login, SearchResults } from '../pages';
import PrivateRoute from './PrivateRoute';

export interface IRouteProps {
  path: string
};

export default class Routes extends React.Component<{}, {}> {
    public render() {
      return (
        <Router>
          <Album path="/album/:id" />
          <PrivateRoute path="/" component={Dashboard} />
          <Login path="/login" />
          <SearchResults path="/search" />
        </Router>
      );
    }
}
