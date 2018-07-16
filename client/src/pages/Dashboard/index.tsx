import * as React from 'react';
import { logout } from '../../api';
import { authorizeUser } from '../../store';

interface IDashboardProps { path: string }

export class Dashboard extends React.Component<IDashboardProps, {}> {
  public render() {
    return (
      <div>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
  private handleLogout = () => {
    logout().then(r => {
      authorizeUser(false, null);
    });
  }
}
