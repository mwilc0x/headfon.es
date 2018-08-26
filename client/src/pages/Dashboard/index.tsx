import * as React from 'react';
import { Link, navigate } from '@reach/router';
import { logout } from '../../api';
import { authorize, endSession } from '../../store';
import './style.css';

interface DashboardProps { path: string }

export class Dashboard extends React.PureComponent<DashboardProps, {}> {
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
      endSession();
      navigate('/');
    });
  }
}
