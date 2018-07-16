import * as React from 'react';
import { Router } from "@reach/router";

import { Dashboard, Login } from '../pages';
import PrivateRoute from './PrivateRoute';

export default class Routes extends React.Component<{}, {}> {
    public render() {
      return (
        <Router>
          <PrivateRoute path="/" component={Dashboard} />
          <Login path="/login" />
        </Router>
      );
    }
}
