import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import RequestService from "../services/requests.service";
import Home from "./gohome";
// mot complete
const PharmacistRequestList = (props) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    retrieveRequests();
  }, []);

  const retrieveRequests = () => {
    RequestService.getAll()
      .then((response) => {
        console.log(response.data);
        setRequests(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const acceptDoctor = (id) => {
    RequestService.acceptRequest(id)
      .then((response) => {
        console.log(response.data);
        window.location.reload(false);
        // Update the UI if needed, e.g., remove the accepted doctor from the list
        //retrieveMembers();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const rejectPharmacist = (id) => {
    RequestService.rejectRequest(id)
      .then((response) => {
        //console.log(id);
        window.location.reload(false);
        // Update the UI if needed, e.g., remove the accepted doctor from the list
        //retrieveMembers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Home />
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
                    Pharmacist Name: {request.name}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Email: {request.email}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Date of Birth: {request.dateOfBirth}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Hourly Rate: {request.hourlyRate}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Affiliation: {request.affiliation}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Education Background: {request.educationBackground}
                  </h3>
                  <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => acceptDoctor(request._id)}
                >
                  Accept pharmacist
                </button>

                <button
                type="button"
                className="btn btn-danger"
                onClick={() => rejectPharmacist(request._id)}
              >
                Reject pharmacist
              </button>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2>No requests</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacistRequestList;
