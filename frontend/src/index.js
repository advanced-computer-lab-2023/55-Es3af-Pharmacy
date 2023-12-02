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
import ResetPassword from './components/resetPassword';

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

      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/resetPassword/:id" element={<ResetPassword />} />

      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
