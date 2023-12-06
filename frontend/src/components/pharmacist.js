import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import AddMedicine from "./add-medicine";

import Medicine from "./eachMedicine";
import EditMedicine from "./edit-medicine";
import SearchMedicine from "./search-medicine";
import FilterMedicine from "./filter-medicine";
import UpdatePassword from './updatePassword';
import Navbar from "./navbar";
import PharmacistWallet from "./view-walletP";
import MedicinesPharm from "./list-medicineP";
import Sales from "./salesReport";
function PharmacistPage() {
  return (
    <Routes>
      <Route path="/" element={<PharmacistHome />} />

      <Route path="/add-medicine" element={<AddMedicine />} />

      <Route path="/medicines" element={<MedicinesPharm />} />

      <Route path="/medicines-details" element={<Medicine />} />

      <Route path="/edit-medicine" element={<EditMedicine />} />

      <Route path="/searchMedicine" element={<SearchMedicine />} />

      <Route path="/filterMedicine" element={<FilterMedicine />} />

      <Route path="/updatePassword" element={<UpdatePassword />} />

      <Route path="/salesReport" element={<Sales />} />
    </Routes>
  );
}

function PharmacistHome() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
      <PharmacistWallet />
        <div>
          <a href="/pharmacist/add-medicine" rel="noopener noreferrer">
            <button className="btn btn-primary"> Add Medicine </button>
          </a>
        </div>
        <div>
          <a href="/pharmacist/medicines" rel="noopener noreferrer">
            <button className="btn btn-primary"> view Medicines </button>
          </a>
        </div>
        <div>
          <a href="/pharmacist/medicines-details" rel="noopener noreferrer">
            <button className="btn btn-primary"> view Medicines Details</button>
          </a>
        </div>
        <div>
          <a href="/pharmacist/edit-medicine" rel="noopener noreferrer">
            <button className="btn btn-primary"> Edit a medicine</button>
          </a>
        </div>
        <div>
          <a href="/pharmacist/searchMedicine" rel="noopener noreferrer">
            <button className="btn btn-primary"> search medicine </button>
          </a>
        </div>

        <div>
          <a href="/pharmacist/filterMedicine" rel="noopener noreferrer">
            <button className="btn btn-primary"> filter medicine </button>
          </a>
        </div>
        <div>
          <a href="/pharmacist/updatePassword" rel="noopener noreferrer">
            <button className="btn btn-primary"> Update Password </button>
          </a>
        </div>

        <div>
          <a href="/pharmacist/salesReport" rel="noopener noreferrer">
            <button className="btn btn-primary"> View Sales </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default PharmacistPage;
