import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import MedsService from "../services/medicine.service";

function SearchMedicine() {
  const initialUserState = {
    Name: ""
  };

  const [medicine, setMedicine] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMedicine({ ...medicine, [name]: value });
  };

  async function search(e) {
    e.preventDefault();
    // no need to console log response data, only for testing

    const query= medicine.Name;
    MedsService.search(query)
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
        <form className="App-header" onSubmit={search}>
          <div className="form-group">
            <label htmlFor="InputUsername">medicine name</label>
            <input
              type="string"
              className="form-control"
              id="Name"
              name="Name"
              value={medicine.Name}
              placeholder="enter medicine name"
              onChange={handleInputChange}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
            
          
        </form>
      </header>
    </div>
  );
}

export default SearchMedicine;
