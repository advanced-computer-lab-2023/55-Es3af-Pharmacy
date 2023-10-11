import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

 //import AddAdmin from "./components/add-admin";
 //import UsersList from "./components/list-users";
 //import PharmacistRequestList from "./components/pharmacist-requests-list";
 import AddMedicine from "./components/add-medicine";
import PharmacistList from "./components/pharmacist-info";
import PatientList from "./components/patient-info";
import MedicinesList from "./components/list-medicines"
const root = ReactDOM.createRoot(document.getElementById("root"));
// root will not render AddAdmin component remove when everyone gets the idea
root.render(
  <React.StrictMode>
    <PatientList />
  </React.StrictMode>
);

