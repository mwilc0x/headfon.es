import * as React from 'react';
import { Redirect } from '@reach/router';
import { Consumer, selectAuthorized } from '../store';

interface IPrivateRouteProps { 
  path: string, 
  component: any 
};

export default class PrivateRoute extends React.Component<IPrivateRouteProps, {}> {
  public render() {
    const { ...rest } = this.props;
    const Component: any = this.props.component;

    return (
      <Consumer select={[selectAuthorized]}>
        {(authorized) => {
          return authorized 
            ? <Component {...rest} /> 
            : <Redirect noThrow={true} to="/login" from={window.location.pathname} />;
        }}
      </Consumer>
    );
  }
}
