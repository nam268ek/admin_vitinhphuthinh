import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './components/redux/store/store';
import './scss/style.scss';
import { history, HistoryRouter } from './utils/history';

const rootElement: any = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>,
  // </React.StrictMode>
);
