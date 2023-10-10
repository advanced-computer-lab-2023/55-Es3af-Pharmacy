import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import RequestService from "../services/requests.service";

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
                    {request._id}
                  </h3>
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
