import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/style.scss';
import { Provider } from "react-redux";
import store from "./components/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const rootElement: any = document.getElementById("root");
const root = createRoot(rootElement);
let persistor = persistStore(store);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    </Provider>
  // </React.StrictMode>
);
