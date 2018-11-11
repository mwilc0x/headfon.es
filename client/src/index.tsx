import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from './containers';
import './index.css';

const createRoot = (ReactDOM as any).createRoot;

export const render = () => {
  createRoot(document.getElementById('root')).render(<AppContainer />);
}

render();
