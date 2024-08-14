// import React from "react";
// import ReactDOM from "react-dom";
// import { createRoot } from 'react-dom/client';

// import "./index.css";
// import App from "./App";
// import * as serviceWorker from "./serviceWorker";
// import { BrowserRouter } from "react-router-dom";

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

// Get the root element from the DOM
const container = document.getElementById("root");

// Create a root
const root = createRoot(container);

console.log(process.env.REACT_APP_PRODUCTION_API_URL);

axios.defaults.baseURL =
  process.env.REACT_APP_PRODUCTION_API_URL || "http://localhost:3001";

console.log(axios.defaults.baseURL);

// Initial render
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
