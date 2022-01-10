import App from 'App';
import { ThemeProvider } from 'contexts/ThemeContext';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import store from 'store';
import AuthProvider from './contexts/loginContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ReduxProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
