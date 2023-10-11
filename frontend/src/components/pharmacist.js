import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import AddMedicine from "./add-medicine";

function PharmacistPage() {
  return (
    <Routes>
      <Route path="/" element={<PharmacistHome />} />

      <Route path="/add-medicine" element={<AddMedicine />} />
    </Routes>
  );
}

function PharmacistHome() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <a href="/pharmacist/add-medicine" rel="noopener noreferrer">
            <button className="btn btn-primary"> Add Medicine </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default PharmacistPage;
