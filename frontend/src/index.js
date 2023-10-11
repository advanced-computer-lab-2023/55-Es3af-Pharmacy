import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import AdminPage from "./components/admin";
import PharmacistPage from "./components/pharmacist";

const root = ReactDOM.createRoot(document.getElementById("root"));
// root will not render AddAdmin component remove when everyone gets the idea
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="/admin/*" element={<AdminPage />} />

      <Route path="/pharmacist/*" element={<PharmacistPage />} />
    </Routes>
  </BrowserRouter>
);
