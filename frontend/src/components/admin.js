import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import AddAdmin from "./add-admin";
import UsersList from "./list-users";
import PharmacistRequestList from "./pharmacist-requests-list";
import PharmacistList from "./pharmacist-info";
import PatientList from "./patient-info";
import SearchMedicine from "./search-medicine"
import FilterMedicine from "./filter-medicine";
function AdminPage() {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />

      <Route path="/add-admin" element={<AddAdmin />} />

      <Route path="/users" element={<UsersList />} />

      <Route path="/requests" element={<PharmacistRequestList />} />

      <Route path="/pharmacistList" element={<PharmacistList />} />

      <Route path="/patientList" element={<PatientList />} />

      <Route path="/searchMedicine" element={<SearchMedicine />} />

      <Route path="/filterMedicine" element={<FilterMedicine />} />






    </Routes>
  );
}

function AdminHome() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <a href="/admin/add-admin" rel="noopener noreferrer">
            <button className="btn btn-primary"> Add Admin </button>
          </a>
        </div>
        <div>
          <a href="/admin/users" rel="noopener noreferrer">
            <button className="btn btn-primary"> view users </button>
          </a>
        </div>
        <div>
          <a href="/admin/requests" rel="noopener noreferrer">
            <button className="btn btn-primary"> view requests </button>
          </a>
        </div>
        <div>
          <a href="/admin/pharmacistList" rel="noopener noreferrer">
            <button className="btn btn-primary"> view pharmacists </button>
          </a>
        </div>
        <div>
          <a href="/admin/patientList" rel="noopener noreferrer">
            <button className="btn btn-primary"> view patients </button>
          </a>
        </div>
        <div>
          <a href="/admin/searchMedicine" rel="noopener noreferrer">
            <button className="btn btn-primary"> search medicine </button>
          </a>
        </div>

        <div>
          <a href="/admin/filterMedicine" rel="noopener noreferrer">
            <button className="btn btn-primary"> filter medicine </button>
          </a>
        </div>

      </header>
    </div>
  );
}

export default AdminPage;
