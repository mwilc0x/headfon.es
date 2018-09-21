import * as React from 'react';
import { Location, navigate } from '@reach/router';
import { Logo } from '../';
import { logout } from '../../api';
import { clearSearchResults, setLoggedOut, showHiddenMenu } from '../../store';
import './style.css';

class NavBar extends React.PureComponent {
  public render() {
    return (
      <Location>
        {(props: any) => {
          const login = props.location.pathname === '/login';
          return login === true ? null : (
            <div className="nav-bar">
              <Logo fillColor="var(--primary)" />

              <button onClick={this.handleSearch}>🔍 Search</button>
              <button onClick={showHiddenMenu}>🎨 Theme</button>
              <button onClick={this.handleLogout}>🚪 Logout</button>
            </div>
          );
        }}
      </Location>
    );
  }
  private handleSearch = () => {
    clearSearchResults();
    navigate('/search');
  };
  private handleLogout = () => {
    logout().then(r => {
      setLoggedOut();
      navigate('/');
    });
  };
}

export default NavBar;
