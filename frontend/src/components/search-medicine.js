import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import MedsService from "../services/medicine.service";

function SearchMedicine() {
  const [results, setResults] = useState([]);

  const search = async (event) => {
    event.preventDefault();

    const query = event.target.Name.value;

    const response = await MedsService.search(query);

    setResults(response.data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={search}>
          <div className="form-group">
            <label htmlFor="InputUsername">Medicine Name</label>
            <input
              type="string"
              className="form-control"
              id="Name"
              name="Name"
              placeholder="Enter Medicine Name"
              
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          <p>Results</p>
          {results.length > 0 ? (
          results.map((result) => {
            return (
              <div
                className="card"
                key={result._id}
                style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
              >
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                   Name: {result.Name}
                  </h3>
                  <p style={{ color: "white" }}>Price= {result.Price}</p>
                  <p style={{ color: "white" }}>Uses: {result.medicalUse}</p>
                  </div>

              </div>
            );
          })
        ) : (
          <div>
            <h2>No medicines found</h2>
          </div>
        )}
          
        </form>
      </header>
    </div>
  );
}

export default SearchMedicine;
