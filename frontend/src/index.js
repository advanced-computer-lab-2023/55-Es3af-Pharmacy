import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import AdminPage from "./components/admin";
import PharmacistPage from "./components/pharmacist";
import PatientPage from "./components/patient";
import RegisterPatient from "./components/RegisterPatient";
import SearchMedicine from "./components/search-medicine";
import EditMedicine from "./components/edit-medicine";
const root = ReactDOM.createRoot(document.getElementById("root"));
// root will not render AddAdmin component remove when everyone gets the idea
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<EditMedicine />} />

      <Route path="/admin/*" element={<AdminPage />} />

      <Route path="/pharmacist/*" element={<PharmacistPage />} />

      <Route path="/patient/*" element={<PatientPage />} />
    </Routes>
  </BrowserRouter>
);
