import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from './containers';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';

export const render = () => {
  ReactDOM.render(
    <AppContainer />,
    document.getElementById('root') as HTMLElement
  );
}

render();
// registerServiceWorker();
