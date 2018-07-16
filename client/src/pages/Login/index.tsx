import * as React from 'react';
import { Redirect } from '@reach/router';
import { Consumer, selectAuthorized, authorizeUser } from '../../store';
import { openWindow } from '../../helpers/openWindow';
import { fetchUser } from '../../api';

interface ILoginProps {
  path: string, 
};

export class Login extends React.Component<ILoginProps, {}> {
  private login: any;

  public componentDidMount() {
    window.addEventListener('message', this.handleMessage, false);
  }
  public componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage);
  }

  public render() {
    return (
      <Consumer select={[selectAuthorized]}>
        {(authorized) => {
          return authorized
            ? <Redirect noThrow={true} to="/" from="/login" />
            : <button onClick={this.handleLogin}>Login to Spotify</button>
        }
         }
      </Consumer>
    );
  }

  private handleMessage = (event: any) => {
    const { data } = event;

    if (data.type === 'login' && data.success === true) {
      this.login.close();
      this.login = null;

      fetchUser().then(user => {
        authorizeUser(true, user);
      });
    }
  }

  private handleLogin = () => {
    const path = process.env.NODE_ENV === 'production' ? '/auth/connect' : 'http://localhost:3004/auth/connect';
    this.login = openWindow(path, 'Login to Spotify', 600, 600);
  }
}
