import * as React from 'react';
import { Routes } from '../../routing';
import { Provider } from '../../store';
import { Provider as URQLProvider, Client } from 'urql';
import './style.css';

const client = new Client({
  fetchOptions: { credentials: 'same-origin' },
  url: 'http://localhost:3000/graphql'
});

export class App extends React.Component<{}, {}> {
  public render() {
    return (
      <URQLProvider client={client}>
        <Provider>
          <Routes />
        </Provider>
      </URQLProvider>
    );
  }
};
