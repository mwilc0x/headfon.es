import * as React from 'react';
import { Link } from '@reach/router';
import { logout } from '../../api';
import { authorize } from '../../store';
import { render } from '../../index';
import './style.css';

interface IDashboardProps { path: string }

export class Dashboard extends React.Component<IDashboardProps, {}> {
  public render() {
    return (
      <div className="dashboard">
        <Link to="/search"><button>Search</button></Link>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
  private handleLogout = () => {
    logout().then(r => {
      authorize(false);
      render();
    });
  }
}
