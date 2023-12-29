import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./pages/LoginPage";
import { Provider } from 'react-redux';
import store from './store/store';
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
