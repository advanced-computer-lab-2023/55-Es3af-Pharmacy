import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import MedsService from "../services/medicine.service";

const Medicine = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    viewMedicines();
  }, []);

  const viewMedicines = () => {
    MedsService.getAll()
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
          users.map((user) => {
            return (

              <div
                className="card"
                key={user._id}
                style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
              >
                
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                   name: {user.Name}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                  quantity=  {user.Quantity}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                  Sales= {user.Sales}
                  </h3>
                  
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2>No medicines</h2>
          </div>
        )}
      </div>
    </div>
  );

}
export default Medicine;