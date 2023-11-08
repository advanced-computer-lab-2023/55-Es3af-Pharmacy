import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import PatientService from "../services/patient.service";

const ListCart = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    
    PatientService.getAll(query)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  

  return (
    <div>
      <div className="App-header">
        {users.length > 0 ? (
             users
            .map((user) => {
              return (
              <div
                className="card"
                key={user.cart._id}
                style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
              >
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                    {user.cart.mID}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    {user.cart.qty}
                  </h3>
                 
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2>No items in your cart bro</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCart;
