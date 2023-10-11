import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AddMedicine from "./components/add-medicine";
// import AddAdmin from "./components/add-admin";
// import UsersList from "./components/list-users";
// import PharmacistRequestList from "./components/pharmacist-requests-list";

const root = ReactDOM.createRoot(document.getElementById("root"));
// root will not render AddAdmin component remove when everyone gets the idea
root.render(
  <React.StrictMode>
    <AddMedicine />
  </React.StrictMode>
);
