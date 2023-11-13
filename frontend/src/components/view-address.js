import React, { useState, useEffect } from "react";
import PatientService from "../services/patient.service";
import axios from "axios";

const AllAddress = (props) => {
  const [users, setUsers] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    PatientService.viewAddress()
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAddressChange = (event) => {
    const selectedAddress = event.target.value;
    setSelectedAddress(selectedAddress);
    
    const addressObject = { address: selectedAddress };
    PatientService.selectAdd(addressObject)
    .then((response) => {
      console.log(response.data);
      setUsers(response.data);
    })
    .catch((e) => {
      
      console.log(e);
    });
    //axios.post("http://localhost:8000/patient/selectAddress",addressObject);
    // You can add additional logic here if needed
  };

  return (
    <div>
      <div className="App-header">
        {users.length > 0 ? (
          <div>
            <label htmlFor="addressSelect">Select an address:</label>
            <select
              id="addressSelect"
              onChange={handleAddressChange}
              value={selectedAddress || ""}
            >
              <option value="" disabled>
                Choose an address
              </option>
              {users.map((user) => (
                <option key={user._id} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <h2>You have no addresses</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAddress;
