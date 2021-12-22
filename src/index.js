import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Reducer, { InitialState } from "./StateProvider/Reducer";
import { StateProvider } from "./StateProvider/StateProvider";
import "./index.css";
ReactDom.render(
  <StateProvider reducer={Reducer} initialstate={InitialState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StateProvider>,
  document.getElementById("root")
);
