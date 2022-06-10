import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfirmProvider } from "material-ui-confirm";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <ConfirmProvider>
      <App />
    </ConfirmProvider>

  </React.StrictMode>
);

