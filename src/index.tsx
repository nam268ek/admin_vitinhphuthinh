import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/style.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './components/redux/store/store';
import { PersistGate, persistor } from "./utils/localStore";
import { history, HistoryRouter } from "./utils/history";

const rootElement: any = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <BrowserRouter> */}
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>
      {/* </BrowserRouter> */}
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
