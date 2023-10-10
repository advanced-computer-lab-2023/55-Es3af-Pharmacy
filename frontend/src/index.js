import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import AddAdmin from "./components/add-admin";

const root = ReactDOM.createRoot(document.getElementById("root"));
// root will not render AddAdmin component remove when everyone gets the idea
root.render(
  <React.StrictMode>
    <AddAdmin />
  </React.StrictMode>
);
