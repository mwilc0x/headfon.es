import * as React from 'react';
import { Routes } from '../../routing';
import { Provider } from '../../store';
import { Provider as URQLProvider, Client } from 'urql';
import { Player } from '../../components';
import { ModalsContainer as Modals } from '../';
import { setTheme } from '../../store';
import { updateThemeForStyle } from '../../helpers';
import './style.css';

const client = new Client({
  fetchOptions: { credentials: 'same-origin' },
  url: `${window.location.origin}/graphql`
});

export class AppContainer extends React.PureComponent {
  public componentDidMount() {
    if (window && window.localStorage) {
      const theme = window.localStorage.getItem('wavves-theme');

      if (!!theme) {
        updateThemeForStyle(theme);
        setTheme(theme);
      }
    }
  }
  public render() {
    return (
      <URQLProvider client={client}>
        <Provider>
          <Routes />
          <Player />
          <Modals />
        </Provider>
      </URQLProvider>
    );
  }
};
