import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from 'axios';
import MedsService from "../services/medicine.service";
import Home from "./gohome";
function EditMedicine() {
  const initialUserState = {
    Name: "",
    Price: 0,
    ActiveIngredients:[""],
  };

  const [medicine, setMedicine] = useState(initialUserState);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if(name=== 'ActiveIngredients'){
      const activeIngredientsList = value.split(',');
      setMedicine({ ...medicine, [name]: activeIngredientsList});
    }else{
      setMedicine({...medicine, [name]:value});
  }
  }
  async function update(e) {
    e.preventDefault();
    // no need to console log response data, only for testing
    MedsService.updateMedicine(medicine)
      .then((response) => {
        //console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('Name', medicine.Name);

    try {
      await axios.post('http://localhost:7000/medicine/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Image uploaded successfully');
    } catch (error) {
      alert('Error uploading image');
    }
  };


  return (
    <div className="App">
      <Home />
      <header className="App-header">
        <form className="App-header" onSubmit={update}>
          <div className="form-group">
            <label htmlFor="InputUsername">medicine name</label>
            <input
              type="string"
              className="form-control"
              id="Name"
              name="Name"
              value={medicine.Name}
              placeholder="Enter name"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputPassword1">medicine price</label>
            <input
              type="number"
              className="form-control"
              id="Price"
              name="Price"
              value={medicine.Price}
              placeholder="Price"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="InputPassword1">active ingredients</label>
            <input
              type="string"
              className="form-control"
              id="ActiveIngredients"
              name="ActiveIngredients"
              value={medicine.ActiveIngredients}
              placeholder="ingredients"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputImage">Upload Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleFileChange}
            />
            </div>

            <button type="submit" className="btn btn-primary" onClick={handleImageUpload}>
              Upload Image
            </button>

          <button type="submit" className="btn btn-primary">
            update medicine
          </button>
        </form>
      </header>
    </div>
  );
}

export default EditMedicine;