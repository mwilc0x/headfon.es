import * as React from 'react';
import { Redirect } from '@reach/router';
import './style.css';

interface DashboardProps {
  path: string;
}

export class Dashboard extends React.PureComponent<DashboardProps, {}> {
  public render() {
    return <Redirect noThrow={true} to="/search" />;
  }
}
