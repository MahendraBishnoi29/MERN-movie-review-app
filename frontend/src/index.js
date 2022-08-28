import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextProviders from "./context";
import { ToastContainer } from "react-toastify";
import SearchProvider from "./context/SearchProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <ContextProviders>
          <App />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            newestOnTop={false}
            closeOnClick
          />
        </ContextProviders>
      </SearchProvider>
    </BrowserRouter>
  </React.StrictMode>
);
