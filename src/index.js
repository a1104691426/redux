import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import App from "./App";

ReactDOM.render(<App store={store} />, document.getElementById("root"));

store.subscribe(() => {
    console.log('更新了');
  ReactDOM.render(<App store={store} />, document.getElementById("root"));
});
