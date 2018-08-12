import * as React from 'react';
import { Redirect } from '@reach/router';
import { Consumer, selectAuthorized } from '../../store';
import './style.css';

interface ILoginProps {
  path: string, 
};

const LoginButton = (props) => {
  const link = process.env.NODE_ENV === 'production'
    ? '/auth/connect'
    : 'http://localhost:3004/auth/connect';

  return (
    <a href={link}>
      <button>Login to Spotify</button>
    </a>
  )
}

export class Login extends React.Component<ILoginProps, {}> {
  public render() {
    return (
      <Consumer select={[selectAuthorized]}>
        {(authorized) => {
          return authorized
            ? <Redirect noThrow={true} to="/" from="/login" />
            : (
                <div className="login">
                  <LoginButton />
                </div>
              )
        }}
      </Consumer>
    );
  }
}
