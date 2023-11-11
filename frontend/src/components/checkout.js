import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import PatientService from "../services/patient.service";

function CheckoutPage() {
  const initialUserState = {
    delivery: "",
    
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  async function add(e) {
    e.preventDefault();
    // no need to console log response data, only for testing
    
    PatientService.checkout()
      .then((response) => {
       
        console.log(response.data);
        
      })
      .catch((e) => {
        
        console.log(e);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={add}>
          <div className="form-group">
            <label htmlFor="InputUsername">address</label>
            <input
              type="delivery"
              className="form-control"
              id="delivery"
              name="delivery"
              value={user.delivery}
              placeholder="Enter address"
              onChange={handleInputChange}
            ></input>
          </div>

          <button type="submit" className="btn btn-primary">
            credit card
          </button>
          <button type="submit" className="btn btn-primary">
            Cash
          </button>
        </form>
      </header>
    </div>
  );
}

export default CheckoutPage;