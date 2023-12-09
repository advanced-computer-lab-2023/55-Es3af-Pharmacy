import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import PatientService from "../services/patient.service";

function AddDelivery() {
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
    const deliveryobj = { delivery: user.delivery };
    PatientService.addDel(deliveryobj)
      .then((response) => {
        alert('added!');
        window.location.reload(false);
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
            Add Adress
          </button>
        </form>
      </header>
    </div>
  );
}

export default AddDelivery;