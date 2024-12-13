import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';

const container = document.getElementById('root');
console.log('index.js - Container:', container);

const root = createRoot(container);
console.log('index.js - Root created:', root);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log('index.js - App rendered in StrictMode');
