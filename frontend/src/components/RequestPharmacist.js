import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react'
import axios from 'axios';

const PharmacistReq = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    dateOfBirth: '',
    hourlyRate: '',
    affiliation: '',
    educationBackground: '',
  });

  const [fileData, setFileData] = useState({
    IDfile: null,
    WorkingLicenses: [],
    PharmacyDegree: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Password strength validation
    if (name === 'password') {
      if (value.length < 6) {
        setMessage('Password is too short');
      } else if (!/\d/.test(value)) {
        setMessage('Password should contain at least one digit');
      } else if (!/[A-Z]/.test(value)) {
        setMessage('Password should contain at least one capital letter');
      } else {
        setMessage('Password strength is good');
      }
    }

    // Update form data
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const fieldName = e.target.name;
    const file = e.target.files[0];

    setFileData({
      ...fileData,
      [fieldName]: file,
    });
  };

  const handleWorkingLicensesChange = (e) => {
    const files = e.target.files;
  
    if (files.length > 0) {
      setFileData((prevFileData) => ({
        ...prevFileData,
        WorkingLicenses: [...prevFileData.WorkingLicenses, ...files],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const form = new FormData();
  
      // Append form data fields
      for (const key in formData) {
        form.append(key, formData[key]);
      }
  
      // Append IDfile file
      if (fileData.IDfile) {
        form.append('IDfile', fileData.IDfile);
      }
  
      // Append PharmacyDegree file
      if (fileData.PharmacyDegree) {
        form.append('PharmacyDegree', fileData.PharmacyDegree);
      }
  
      // Append multiple WorkingLicenses files
      for (const file of fileData.WorkingLicenses) {
        form.append('WorkingLicenses', file);
      }
  
      const response = await axios.post('http://localhost:8000/requestPharmacist/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error('Error during registration:', error);
  
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', error.message);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="InputName">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              placeholder="Enter Name"
              onChange={handleChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Enter Email"
              onChange={handleChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputUsername">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              placeholder="Enter Username"
              onChange={handleChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              placeholder="Enter Password"
              onChange={handleChange}
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
              value={formData.dateOfBirth}
              placeholder="dateOfBirth"
              onChange={handleChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputHourlyRate">Hourly Rate</label>
            <input
              type="number"
              className="form-control"
              id="hourlyRate"
              name="hourlyRate"
              value={formData.hourlyRate}
              placeholder="Enter Hourly Rate"
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="InputAffiliation">Affiliation</label>
            <input
              type="text"
              className="form-control"
              id="affiliation"
              name="affiliation"
              value={formData.affiliation}
              placeholder="Enter Affiliation"
              onChange={handleChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputEducationBackground">Education Background</label>
            <input
              type="text"
              className="form-control"
              id="educationBackground"
              name="educationBackground"
              value={formData.educationBackground}
              placeholder="Enter Education Background"
              onChange={handleChange}
            ></input>
          </div>


          <div className="form-group">
            <label htmlFor="IDfile">ID Document</label>
            <input
              type="file"
              className="form-control"
              id="IDfile"
              name="IDfile"
              onChange={handleFileChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="WorkingLicenses">Working Licenses</label>
            <input
              type="file"
              className="form-control"
              id="WorkingLicenses"
              name="WorkingLicenses"
              onChange={handleWorkingLicensesChange}
              multiple
            />
          </div>

          <div className="form-group">
            <label htmlFor="PharmacyDegree">Pharmacy Degree</label>
            <input
              type="file"
              className="form-control"
              id="PharmacyDegree"
              name="PharmacyDegree"
              onChange={handleFileChange}
            />
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












// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useState } from "react";
// import PharmacistService from "../services/RequestPharmacistService";

// function PharmacistReq() {
//   const initialUserState = {
//     name: "",
//     email: "",
//     username: "",
//     password: "",
//     dateOfBirth: "",
//     hourlyRate: "",
//     affiliation: "",
//     educationBackground: "",
//   };

//   const [pharma, setPharma] = useState (initialUserState);
//   const [message, setMessage] = useState('')

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

//   async function pharmacistReq(e) {
//     e.preventDefault();
//     // no need to console log response data, only for testing
//     PharmacistService.pharmacistReq(pharma)
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <form className="App-header" onSubmit={pharmacistReq}>
//         <div className="form-group">
//             <label htmlFor="InputName">Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               name="name"
//               value={pharma.name}
//               placeholder="Enter Name"
//               onChange={handleInputChange}
//             ></input>
//           </div>

//           <div className="form-group">
//             <label htmlFor="InputEmail">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               name="email"
//               value={pharma.email}
//               placeholder="Enter Email"
//               onChange={handleInputChange}
//             ></input>
//           </div>
          
          
//           <div className="form-group">
//             <label htmlFor="InputUsername">Username</label>
//             <input
//               type="text"
//               className="form-control"
//               id="username"
//               name="username"
//               value={pharma.username}
//               placeholder="Enter Username"
//               onChange={handleInputChange}
//             ></input>
//           </div>

//           <div className="form-group">
//             <label htmlFor="InputPassword1">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               name="password"
//               value={pharma.password}
//               placeholder="Enter Password"
//               onChange={handleInputChange}
//             ></input>
//             <p style={{ color: 'red' }}>{message}</p>
//           </div>

//           <div className="form-group">
//             <label htmlFor="InputDateOfBirth">Date Of Birth</label>
//             <input
//               type="date"
//               className="form-control"
//               id="dateOfBirth"
//               name="dateOfBirth"
//               value={pharma.dateOfBirth}
//               placeholder="dateOfBirth"
//               onChange={handleInputChange}
//             ></input>
//           </div>

//           <div className="form-group">
//             <label htmlFor="InputHourlyRate">Hourly Rate</label>
//             <input
//               type="number"
//               className="form-control"
//               id="hourlyRate"
//               name="hourlyRate"
//               value={pharma.hourlyRate}
//               placeholder="Enter Hourly Rate"
//               onChange={handleInputChange}
//             ></input>
//           </div>
//           <div className="form-group">
//             <label htmlFor="InputAffiliation">Affiliation</label>
//             <input
//               type="text"
//               className="form-control"
//               id="affiliation"
//               name="affiliation"
//               value={pharma.affiliation}
//               placeholder="Enter Affiliation"
//               onChange={handleInputChange}
//             ></input>
//           </div>

//           <div className="form-group">
//             <label htmlFor="InputEducationBackground">Education Background</label>
//             <input
//               type="text"
//               className="form-control"
//               id="educationBackground"
//               name="educationBackground"
//               value={pharma.educationBackground}
//               placeholder="Enter Education Background"
//               onChange={handleInputChange}
//             ></input>
//           </div>
          



//           <button type="submit" className="btn btn-primary">
//             Request
//           </button>
//         </form>
//       </header>
//     </div>
//   );
// }

// export default PharmacistReq;

