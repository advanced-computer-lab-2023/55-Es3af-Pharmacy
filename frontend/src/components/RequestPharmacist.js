import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import PharmacistService from "../services/RequestPharmacistService";

function PharmacistReq() {
  const initialUserState = {
    name: "",
    email: "",
    username: "",
    password: "",
    dateOfBirth: "",
    hourlyRate: "",
    affiliation: "",
    educationBackground: "",
  };

  const [pharma, setPharma] = useState (initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPharma({ ...pharma, [name]: value });
  };

  async function pharmacistReq(e) {
    e.preventDefault();
    // no need to console log response data, only for testing
    PharmacistService.pharmacistReq(pharma)
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
        <form className="App-header" onSubmit={pharmacistReq}>
        <div className="form-group">
            <label htmlFor="InputName">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={pharma.name}
              placeholder="Enter Name"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={pharma.email}
              placeholder="Enter Email"
              onChange={handleInputChange}
            ></input>
          </div>
          
          
          <div className="form-group">
            <label htmlFor="InputUsername">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={pharma.username}
              placeholder="Enter Username"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={pharma.password}
              placeholder="Enter Password"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputDateOfBirth">Date Of Birth</label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              value={pharma.dateOfBirth}
              placeholder="dateOfBirth"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputHourlyRate">Hourly Rate</label>
            <input
              type="number"
              className="form-control"
              id="hourlyRate"
              name="hourlyRate"
              value={pharma.hourlyRate}
              placeholder="Enter Hourly Rate"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="InputAffiliation">Affiliation</label>
            <input
              type="text"
              className="form-control"
              id="affiliation"
              name="affiliation"
              value={pharma.affiliation}
              placeholder="Enter Affiliation"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputEducationBackground">Education Background</label>
            <input
              type="text"
              className="form-control"
              id="educationBackground"
              name="educationBackground"
              value={pharma.educationBackground}
              placeholder="Enter Education Background"
              onChange={handleInputChange}
            ></input>
          </div>
          



          <button type="submit" className="btn btn-primary">
            Request
          </button>
        </form>
      </header>
    </div>
  );
}

export default PharmacistReq;