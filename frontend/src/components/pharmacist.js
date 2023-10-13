import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import AddMedicine from "./add-medicine";
import MedicinesList from "./list-medicines";
import Medicine from "./eachMedicine";
import EditMedicine from "./edit-medicine";
function PharmacistPage() {
  return (
    <Routes>
      <Route path="/" element={<PharmacistHome />} />

      <Route path="/add-medicine" element={<AddMedicine />} />

      <Route path="/medicines" element={<MedicinesList />} />

      <Route path="/medicines-details" element={<Medicine />} />

      <Route path="/edit-medicine" element={<EditMedicine />} />


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
      </header>
    </div>
  );
}

export default PharmacistPage;
