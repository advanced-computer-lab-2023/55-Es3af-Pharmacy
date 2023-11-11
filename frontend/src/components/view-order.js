import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import PatientService from "../services/patient.service";

const MyOrder = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    
    PatientService.viewOrder()
      .then((response) => {
        console.log(response.data);
       
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
      
  };
  const cancel = (event) => {
    const { name } = event.target;
    console.log(name);
    PatientService.cancelOrder()
      .then((response) => {
        
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
                    Your order's total is  
                    {" "+user.total}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Your order's status is
                    {" "+user.status}
                  </h3>
                 
                </div>
                <button
                    style={{ backgroundColor: "red" }}
                    name={user.medID}
                    onClick={(user) => cancel(user)}
                  >
                    cancel my order
                  </button>
                  
              </div>
            );
          })
        ) : (
          <div>
            <h2>You have no orders</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;