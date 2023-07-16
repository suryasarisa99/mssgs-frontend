import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import DataContext from "../Context/DataContext";
import { ToastContainer } from "react-toastify";

import { registerSW } from "virtual:pwa-register";
ReactDOM.createRoot(document.querySelector("#root")).render(
  <>
    <DataContext>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </DataContext>
  </>
);
