import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './containers';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';

export const render = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
  );
}

render();
// registerServiceWorker();
