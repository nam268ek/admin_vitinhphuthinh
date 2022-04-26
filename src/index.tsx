import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/style.scss';
import { Provider } from "react-redux";
import store from "./components/redux/store/store";

const rootElement: any = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  // </React.StrictMode>
);
