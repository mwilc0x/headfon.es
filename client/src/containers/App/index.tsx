import * as React from 'react';
import { Routes } from '../../routing';
import { Provider } from '../../store';
import { Provider as URQLProvider, Client } from 'urql';
import { NavBar, Player, Spinner } from '../../components';
import { ModalsContainer as Modals } from '../';
import { setTheme } from '../../store';
import { updateThemeForStyle } from '../../helpers';
import './style.css';

const Suspense = (React as any).Suspense

const client = new Client({
  fetchOptions: { credentials: 'same-origin' },
  url: `${window.location.origin}/graphql`,
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
      <Suspense fallback={<Spinner size="large" />}>
        <URQLProvider client={client}>
          <Provider>
            <div className="top-container">
              <NavBar />
              <Routes />
            </div>
            <Player />
            <Modals />
          </Provider>
        </URQLProvider>
      </Suspense>
    );
  }
}
