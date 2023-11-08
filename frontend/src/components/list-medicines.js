import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import MedsService from "../services/medicine.service";


import patientService from "../services/patient.service";

const MedicinesList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveMedicines();
  }, []);

  const retrieveMedicines = () => {
    MedsService.getAll()
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const addToCart = (event) => {
    const { name } = event.target;
    patientService.addToCart(name)
      .then((response) => {
        console.log(response.data);
        window.location.reload(false);
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
                  price=  {user.Price}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    uses= {user.medicalUse}
                  </h3>
                  <button
                    style={{ backgroundColor: "red" }}
                    name={user._id}
                    onClick={(user) => addToCart(user)}
                  >
                    add to cart
                  </button>
                  
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
export default MedicinesList;