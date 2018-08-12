import * as React from 'react';
import { Routes } from '../../routing';
import { Provider } from '../../store';
import { Provider as URQLProvider, Client } from 'urql';
import { Player } from '../../components';
import './style.css';

const client = new Client({
  fetchOptions: { credentials: 'same-origin' },
  url: `${window.location.origin}/graphql`
});

export class App extends React.Component<{}, {}> {
  public render() {
    return (
      <URQLProvider client={client}>
        <Provider>
          <Routes />

          <Player />
        </Provider>
      </URQLProvider>
    );
  }
};
