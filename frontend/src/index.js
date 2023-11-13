import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import AdminPage from "./components/admin";
import PharmacistPage from "./components/pharmacist";
import PatientPage from "./components/patient";
import RegisterPatient from "./components/RegisterPatient";
import PharmacistReq from "./components/RequestPharmacist";
import Login from "./components/login";
import ForgetPassword from "./components/forgetPassword";

const root = ReactDOM.createRoot(document.getElementById("root"));
// root will not render AddAdmin component remove when everyone gets the idea
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/admin/*" element={<AdminPage />} />

      <Route path="/pharmacist/*" element={<PharmacistPage />} />

      <Route path="/patient/*" element={<PatientPage />} />
      <Route
        path="/pharmacist-requests/newRequest/*"
        element={<PharmacistReq />}
      />
      <Route path="/patient/registerPatient/*" element={<RegisterPatient />} />

      <Route path="/forgetpassword" element={<ForgetPassword />} />

      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
