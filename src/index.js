import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "./reducers";
import middleware from "./middleware";

import App from "./components/App";

const store = createStore(reducer, middleware);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
