import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, compose } from "redux";
import { legacy_createStore as createstore } from "redux";
import { thunk } from "redux-thunk";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Reducers from "./Reducers";
const store = createstore(Reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="119476509563-h5mifr3vk1t6cig6r8h2kg47b2pgps79.apps.googleusercontent.com">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GoogleOAuthProvider>
  </Provider>
);
