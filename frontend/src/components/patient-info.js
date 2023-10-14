import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import PatientService from "../services/patient.service";

// mot complete
const PatientList = (props) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    retrievePatients();
  }, []);

  const retrievePatients = () => {
    PatientService.getAll()
      .then((response) => {
        console.log(response.data);
        setRequests(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="App-header">
        {requests.length > 0 ? (
          requests.map((request) => {
            return (
              <div
                className="card"
                key={request._id}
                style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
              >
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                  Patient Name:  {request.name}
                  </h3>
                  <h2 className="card-title" style={{ color: "white" }}>
                  Gender:  {request.gender}
                  </h2>
                  <h2 className="card-title" style={{ color: "white" }}>
                  Date Of Birth:  {request.dateOfBirth}
                  </h2>
                  <h2 className="card-title" style={{ color: "white" }}>
                  Emergency Contact Name:  {request.emergencyContactName}
                  </h2>
                  <h2 className="card-title" style={{ color: "white" }}>
                  Emergency Contact Number:  {request.emergencyContactMobile}
                  </h2>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2>No patients</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientList;
