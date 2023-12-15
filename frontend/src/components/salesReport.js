import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import userService from "../services/user.service";
import Home from "./gohome";

const Sales = (props) => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [dateOptions, setDateOptions] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("");

  useEffect(() => {
    retrieveRequests();
  }, []);

  const retrieveRequests = () => {
    userService.getSales()
      .then((response) => {
        console.log(response.data);
        setRequests(response.data);
        setFilteredRequests(response.data);
        const uniqueMedicineNames = Array.from(new Set(response.data.map(request => request.medicineName)));
        setMedicineOptions(uniqueMedicineNames);
        const uniqueDates = Array.from(new Set(response.data.map(request =>new Date(request.createdAt).toLocaleDateString())));
        setDateOptions(uniqueDates);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleFilter = (e) => {
    const value = e.target.value;
    setSelectedMedicine(value);

    if (value === "All") {
      setFilteredRequests(requests);
    } else {
      const filtered = requests.filter(request =>
        request.medicineName.toLowerCase() === value.toLowerCase()
      );
      
      setFilteredRequests(filtered);
    }
  };
  const handleFilter2 = (e) => {
    const value = e.target.value;
    setSelectedTimeframe(value);

    if (value === "All") {
      setFilteredRequests(requests);
    } else {
      const filtered = requests.filter(request =>
        new Date(request.createdAt).toLocaleDateString() === value
      );
      
      setFilteredRequests(filtered);
    }
  };

  

  return (
    <div>
      <Home />
         <div>
        <select value={selectedMedicine} onChange={handleFilter}>
          <option value="All">All Medicines</option>
          {medicineOptions.map((medicine, index) => (
            <option key={index} value={medicine}>
              {medicine}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select value={selectedMedicine} onChange={handleFilter2}>
          <option value="All">Any time</option>
          {dateOptions.map((medicine, index) => (
            <option key={index} value={medicine}>
              {medicine}
            </option>
          ))}
        </select>
      </div>

      <div className="App-header">
        {requests.length > 0 ? (
          filteredRequests.map((request) => {
            return (
              <div
                className="card"
                key={request._id}
                style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
              >
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                    Medicine name: {request.medicineName}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Quantity sold : {request.Quantity}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    bought by : {request.patientName}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>

                    At : {new Date(request.createdAt).toLocaleDateString()}
                  </h3>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2>No sales</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;
