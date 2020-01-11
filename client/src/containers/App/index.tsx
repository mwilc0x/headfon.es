import * as React from 'react';
import { Routes } from '../../routing';
import { Provider } from '../../store';
import {
  Provider as URQLProvider,
  Client,
  cacheExchange,
  dedupExchange,
  fetchExchange,
} from 'urql';
import { suspenseExchange } from '@urql/exchange-suspense';
import { NavBar, Player } from '../../components';
import { ModalsContainer as Modals } from '../';
import { setTheme } from '../../store';
import { updateThemeForStyle } from '../../helpers';
import './style.css';

const client = new Client({
  fetchOptions: { credentials: 'same-origin' },
  url: `${window.location.origin}/graphql`,
  suspense: true,
  exchanges: [cacheExchange, dedupExchange, fetchExchange, suspenseExchange],
});

export function AppContainer() {
  React.useEffect(() => {
    if (window && window.localStorage) {
      const theme = window.localStorage.getItem('wavves-theme');

      if (!!theme) {
        updateThemeForStyle(theme);
        setTheme(theme);
      }
    }
  });

  return (
    <URQLProvider value={client}>
      <Provider>
        <div className="top-container">
          <NavBar />
          <Routes />
        </div>
        <Player />
        <Modals />
      </Provider>
    </URQLProvider>
  );
}
