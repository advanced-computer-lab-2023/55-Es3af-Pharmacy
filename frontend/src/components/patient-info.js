import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import PatientService from "../services/patient.service";
import Home from "./gohome";
import { Carousel } from 'react-bootstrap';


// mot complete
const PatientList = (props) => {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    retrievePatients();
  }, []);

  const retrievePatients = () => {
    setLoading(true);
    PatientService.getAll()
      .then((response) => {
        console.log(response.data);
        setRequests(response.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
    <div>
      <Home />
      {loading ? (
        <div class="preloader">
            <div class="loader">
                <div class="loader-outter"></div>
                <div class="loader-inner"></div>

                <div class="indicator"> 
                    <svg width="16px" height="12px">
                        <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
                        <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
                    </svg>
                </div>
            </div>
        </div>      ) : (
      <div className="App-header">
        {requests.length > 0 ? (
          <Carousel>
            {requests.map((request) => (
              <Carousel.Item key={request._id}>
                <div
                  className="card"
                  style={{
                    width: "800px", // Adjusted width
                    backgroundColor: "#282c34",
                    margin: "auto",
                    padding: "20px", // Added padding
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <div className="card-body">
                    <h3 className="card-title" style={{ color: "white" }}>
                      Patient Name: {request.name}
                    </h3>
                    <h2 className="card-title" style={{ color: "white" }}>
                      Gender: {request.gender}
                    </h2>
                    <h2 className="card-title" style={{ color: "white" }}>
                      Date Of Birth: {request.dateOfBirth}
                    </h2>
                    <h2 className="card-title" style={{ color: "white" }}>
                      Emergency Contact Name: {request.emergencyContactName}
                    </h2>
                    <h2 className="card-title" style={{ color: "white" }}>
                      Emergency Contact Number: {request.emergencyContactMobile}
                    </h2>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div>
            <h2>No patients</h2>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default PatientList;