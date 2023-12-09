import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import PatientService from "../services/patient.service";
import Home from "./gohome";
const MyOrder = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveUsers();
  }, []);

var id;
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
    
    const orderid = { id: name };
    
    PatientService.cancel(orderid)
      .then((response) => {
        window.location.reload(false);
        alert("order cancelled");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Home />
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
                    Your order's is
                    {" "+user.status}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Your order's address is
                    {" "+user.address}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Date: 
                    {" "+user.createdAt}
                  </h3>
                 
                </div>
                <button
                    style={{ backgroundColor: "red" }}
                    name={user._id}
                    onClick={(user) => cancel(user)}
                    disabled={user.status=="CANCELLED"}
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