import React from 'react';
import ReactDOM from 'react-dom/client'
import { Root } from './Root';
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root/>
  </React.StrictMode>
);
