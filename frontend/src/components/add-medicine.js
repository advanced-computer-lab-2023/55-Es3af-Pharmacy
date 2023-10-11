import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import MedsService from "../services/medicine.service";

function AddMedicine() {
  const initialUserState = {
    Name: "",
    Quantity: 0,
    Price:0,
    ActiveIngredients:[""],
    medicalUse:""
  };

  const [med, setMed] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name,  value } = event.target;
    // const stringArray = ActiveIngredients.value.split(',');
    // const cleanArray = stringArray.map(item => item.trim()).filter(item => item !== "");
    // ActiveIngredients.value=cleanArray;
    setMed({ ...med, [name]: value});
  };

  async function addMedicine(e) {
    e.preventDefault();
    // no need to console log response data, only for testing
    MedsService.addMedicine(med)
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
        <form className="App-header" onSubmit={addMedicine}>
          <div className="form-group">
            <label htmlFor="InputName">Name</label>
            <input
              type="Name"
              className="form-control"
              id="Name"
              name="Name"
              value={med.Name}
              placeholder="Enter Medicine Name"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputQuantity">Quantity</label>
            <input
              type="Quantity"
              className="form-control"
              id="Quantity"
              name="Quantity"
              value={med.Quantity}
              placeholder="Enter Medicine Quantity"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="InputPrice">Price</label>
            <input
              type="Price"
              className="form-control"
              id="Price"
              name="Price"
              value={med.Price}
              placeholder="Enter Medicine Price"
              onChange={handleInputChange}
            ></input>
          </div><div className="form-group">
            <label htmlFor="InputActiveIngredients">ActiveIngredients</label>
            <input
              type="ActiveIngredients"
              className="form-control"
              id="ActiveIngredients"
              name="ActiveIngredients"
              value={med.ActiveIngredients}
              placeholder="Enter Medicine Active Ingredients"
              onChange={handleInputChange}
            ></input>
          </div><div className="form-group">
            <label htmlFor="InputmedicalUse">medicalUse</label>
            <input
              type="medicalUse"
              className="form-control"
              id="medicalUse"
              name="medicalUse"
              value={med.medicalUse}
              placeholder="Enter Medicine Medicinal Use"
              onChange={handleInputChange}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Medicine
          </button>
        </form>
      </header>
    </div>
  );
}

export default AddMedicine;
