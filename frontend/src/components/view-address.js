import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import PatientService from "../services/patient.service";

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
    setSelectedAddress(event.target.value);
  };

  const handleChooseAddress = () => {
    // Handle the logic when the user chooses an address
    console.log("Selected Address:", selectedAddress);
    // Add your logic here, for example, redirecting or performing an action with the selected address
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
