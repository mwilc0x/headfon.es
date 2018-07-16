import * as React from 'react';
import { Routes } from '../../routing';
import { Provider } from '../../store';
import './style.css';

export class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Provider>
        <Routes />
      </Provider>
    );
  }
};
