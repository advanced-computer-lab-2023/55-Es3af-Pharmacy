import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import PatientService from "../services/RegisterPatientService";

function RegisterPatient() {
  const initialUserState = {
    name: "",
    email: "",
    username: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    mobile: 0,
    emergencyContact: {
        name: "",
        mobile:0,
      }
  };

  const [patient, setPatient] = useState (initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatient({ ...patient, [name]: value });
  };

  async function registerPatient(e) {
    e.preventDefault();
    // no need to console log response data, only for testing
    PatientService.registerPatient(patient)
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
        <form className="App-header" onSubmit={registerPatient}>
        <div className="form-group">
            <label htmlFor="InputName">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={patient.name}
              placeholder="name"
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
              value={patient.email}
              placeholder="email"
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
              value={patient.username}
              placeholder="Enter username"
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
              value={patient.password}
              placeholder="Password"
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
              value={patient.dateOfBirth}
              placeholder="dateOfBirth"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputGender">Gender</label>
            <input
              type="text"
              className="form-control"
              id="gender"
              name="gender"
              value={patient.gender}
              placeholder="Enter gender"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="InputEmergencyContact">Mobile Number</label>
            <input
              type="tel"
              className="form-control"
              id="mobile"
              name="mobile"
              value={patient.emergencyContact}
              placeholder="Enter Mobile Number"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="InputEmergencyContact">Emergency Contact Name</label>
            <input
              type="text"
              className="form-control"
              id="emergencyContact"
              name="emergencyContact"
              value={patient.emergencyContact}
              placeholder="Enter Emergency Contact Name"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputEmergencyContact">Emergency Contact Number</label>
            <input
              type="tel"
              className="form-control"
              id="emergencyContact"
              name="emergencyContact"
              value={patient.emergencyContact}
              placeholder="Enter Emergency Contact Number"
              onChange={handleInputChange}
            ></input>
          </div>



          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </header>
    </div>
  );
}

export default RegisterPatient;