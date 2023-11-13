import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import MedicinesList from "./list-medicines";
import SearchMedicine from "./search-medicine";
import FilterMedicine from "./filter-medicine";
import Navbar from "./navbar";
import MyCart from "./view-cart";
import AddDelivery from "./add-delivery";
import CheckoutPage from "./checkout";
import MyOrder from "./view-order";
import UpdatePassword from "./updatePassword";
import AllAddress from "./view-address";
function PatientPage() {
  return (
    <Routes>
      <Route path="/" element={<PatientHome />} />

      <Route path="/medicines" element={<MedicinesList />} />

      <Route path="/searchMedicine" element={<SearchMedicine />} />

      <Route path="/filterMedicine" element={<FilterMedicine />} />

     <Route path="/cart" element={<MyCart />}></Route>

     <Route path="/addDel" element={<AddDelivery />}></Route>

     <Route path="/checkout" element={<CheckoutPage />}></Route>

     <Route path="/order" element={<MyOrder />}></Route>
     
     <Route path="/updatePassword" element={<UpdatePassword />}></Route>

     <Route path="/dropdown" element={<AllAddress />}></Route>


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
        <div>
          <a href="/patient/cart" rel="noopener noreferrer">
            <button className="btn btn-primary"> view cart </button>
          </a>
        </div>
        <div>
          <a href="/patient/addDel" rel="noopener noreferrer">
            <button className="btn btn-primary"> add delivery address </button>
          </a>
        </div>
        <div>
          <a href="/patient/order" rel="noopener noreferrer">
            <button className="btn btn-primary"> view my orders </button>
          </a>
        </div>
        <div>
          <a href="/patient/updatePassword" rel="noopener noreferrer">
            <button className="btn btn-primary"> update password</button>
            </a>
            </div>
            <div>
          <a href="/patient/dropdown" rel="noopener noreferrer">
            <button className="btn btn-primary"> view addresses </button>
          </a>
        </div>
      </header>
    </div>
    
  );
}

export default PatientPage;