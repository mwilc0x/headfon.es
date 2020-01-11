import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from './containers';
import './index.css';

const createRoot = (ReactDOM as any).render;

export const render = () => {
  createRoot(<AppContainer />, document.getElementById('root'));
};

render();
