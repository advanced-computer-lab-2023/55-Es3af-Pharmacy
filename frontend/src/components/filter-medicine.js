import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import MedsService from "../services/medicine.service";

function FilterMedicine() {
  const initialUserState = {
    Name: "",
    medicalUse: ""
    
  };

  const [medicine, setMedicine] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMedicine({ ...medicine, [name]: value });
  };

  async function search(e) {

    e.preventDefault();
    // no need to console log response data, only for testing
  
    const query= medicine.medicalUse;
    MedsService.filter(query)
      .then((response) => {
        console.log(response.data);
        setMedicine(response.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={search}>
          <div className="form-group">
            <label htmlFor="InputUsername">medicine name</label>
            <input
              type="string"
              className="form-control"
              id="medicalUse"
              name="medicalUse"
              value={medicine.medicalUse}
              placeholder="enter medical use"
              onChange={handleInputChange}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
            
            <p>results</p>
            <p>name= </p>
            {medicine.Name}

            
          
        </form>
      </header>
    </div>
  );
}

export default FilterMedicine;
