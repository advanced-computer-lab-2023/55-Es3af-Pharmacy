import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import MedicinesList from "./list-medicines";

function PatientPage() {
  return (
    <Routes>
      <Route path="/" element={<PatientHome />} />

      <Route path="/medicines" element={<MedicinesList />} />
    </Routes>
  );
}

function PatientHome() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <a href="/patient/medicines" rel="noopener noreferrer">
            <button className="btn btn-primary"> view Medicines </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default PatientPage;
