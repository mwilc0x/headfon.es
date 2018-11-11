import * as React from 'react';
import { Location, navigate } from '@reach/router';
import { Logo } from '../';
import { logout } from '../../api';
import { clearSearchResults, setLoggedOut, showHiddenMenu } from '../../store';
import './style.css';

function NavBar() {
  function handleSearch() {
    clearSearchResults();
    navigate('/search');
  }

  function handleLogout() {
    logout().then(r => {
      setLoggedOut();
      navigate('/');
    });
  }

  return (
    <Location>
      {(props: any) => {
        const login = props.location.pathname === '/login';
        return login === true ? null : (
          <div className="nav-bar">
            <Logo fillColor="var(--primary)" />

            <button onClick={handleSearch}>🔍 Search</button>
            <button onClick={showHiddenMenu}>🎨 Theme</button>
            <button onClick={handleLogout}>🚪 Logout</button>
          </div>
        );
      }}
    </Location>
  );
}

export default NavBar;
