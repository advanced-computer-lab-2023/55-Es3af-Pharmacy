import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import RegisterPatientService from "../services/RegisterPatientService";
import { useNavigate } from "react-router-dom";
function RegisterPatient() {
  const initialUserState = {
    name: "",
    email: "",
    username: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    mobile: "01XXXXXXXXX",
    emergencyContactName: "",
    emergencyContactMobile: "",
  };

  const [patient, setPatient] = useState(initialUserState);
  const [message, setMessage] = useState('')
  let navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if(name == 'password'){
      if (value.length < 6) {
        setMessage('Password is too short');
      } else if (!/\d/.test(value)) {
        setMessage('Password should contain at least one digit');
      } else if(!/[A-Z]/.test(value)){
        setMessage('Password should contain at least one capital letters');
      }
      else {
        setMessage('Password strength is good');
      }
    }
    setPatient({ ...patient, [name]: value });
  };

  async function registerPatient(e) {
    e.preventDefault();
    try {
      const response = await RegisterPatientService.registerPatient(patient);
      //console.log(response.data);
      alert(response.data)
      console.log(response.data);
      if (response.data.success) {
        alert('Data saved successfully!');
      } else {
        alert('Welcome to our platform, login now');
        navigate("../", { replace: true });
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        if (
          error.response.status === 409 &&
          error.response.data.code === 11000 &&
          error.response.data.keyPattern &&
          error.response.data.keyPattern.username
        ) {
         // alert('Error: This username is already taken. Please choose a different one.');
        } else {
          alert(`Error: ${error.response.data.message}`);
        }
      } else if (error.request) {
        alert('Error: No response from the server');
      } else {
        alert(`Error: ${error.message}`);
      }
    }
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
              value={patient.email}
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
              value={patient.username}
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
              value={patient.password}
              placeholder="Enter Password"
              onChange={handleInputChange}
            ></input>
            <p style={{ color: 'red' }}>{message}</p>
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
              placeholder="Enter Gender"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="InputMobile">Mobile Number</label>
            <input
              type="tel"
              className="form-control"
              id="mobile"
              name="mobile"
              value={patient.number}
              placeholder="Enter Mobile Number"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="InputEmergencyContactName">
              Emergency Contact Name
            </label>
            <input
              type="text"
              className="form-control"
              id="emergencyContactName"
              name="emergencyContactName"
              value={patient.emergencyContactName}
              placeholder="Enter Emergency Contact Name"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputEmergencyContactMobile">
              Emergency Contact Mobile
            </label>
            <input
              type="tel"
              className="form-control"
              id="emergencyContactMobile"
              name="emergencyContactMobile"
              value={patient.emergencyContactMobile}
              placeholder="Enter Emergency Contact Mobile"
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
