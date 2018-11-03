import * as React from 'react';
import { Redirect } from '@reach/router';
import { getCookie } from '../helpers/cookies';

interface IPrivateRouteProps { 
  path: string, 
  component: any
};

export default class PrivateRoute extends React.Component<IPrivateRouteProps, {}> {
  public render() {
    const { ...rest } = this.props;
    const Component: any = this.props.component;

    return !!getCookie('jwt') 
      ? <Component {...rest} /> 
      : <Redirect noThrow={true} to="/login" from={window.location.pathname} />;
  }
}
