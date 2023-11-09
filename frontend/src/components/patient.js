import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import MedicinesList from "./list-medicines";
import SearchMedicine from "./search-medicine";
import FilterMedicine from "./filter-medicine";
import Navbar from "./navbar";
function PatientPage() {
  return (
    <Routes>
      <Route path="/" element={<PatientHome />} />

      <Route path="/medicines" element={<MedicinesList />} />

      <Route path="/searchMedicine" element={<SearchMedicine />} />

      <Route path="/filterMedicine" element={<FilterMedicine />} />
    </Routes>
  );
}

function PatientHome() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <div>
          <a href="/patient/medicines" rel="noopener noreferrer">
            <button className="btn btn-primary"> view Medicines </button>
          </a>
        </div>
        <div>
          <a href="/patient/searchMedicine" rel="noopener noreferrer">
            <button className="btn btn-primary"> search medicine </button>
          </a>
        </div>

        <div>
          <a href="/patient/filterMedicine" rel="noopener noreferrer">
            <button className="btn btn-primary"> filter medicine </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default PatientPage;
