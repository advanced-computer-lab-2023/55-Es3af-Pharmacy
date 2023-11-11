import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import PharmacistService from "../services/RequestPharmacistService";

function ForgetPassword() {

  const [email, setEmail] = useState ('');
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     if(name == 'password'){
//       if (value.length < 6) {
//         setMessage('Password is too short');
//       } else if (!/\d/.test(value)) {
//         setMessage('Password should contain at least one digit');
//       } else if(!/[A-Z]/.test(value)){
//         setMessage('Password should contain at least one capital letters');
//       }
//       else {
//         setMessage('Password strength is good');
//       }
//     }
//     setPharma({ ...pharma, [name]: value });
//   };

  async function forgetPassword(e) {
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
        <form className="App-header" onSubmit={forgetPassword}>
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
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </header>
    </div>
  );
}

export default ForgetPassword;