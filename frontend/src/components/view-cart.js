import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import PatientService from "../services/patient.service";
import { useNavigate } from "react-router-dom";
const MyCart = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    
    PatientService.seeCart()
      .then((response) => {
        console.log(response.data);
       
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
      
  };
  const removeOne = (event) => {
    const { name } = event.target;
    console.log(name);
    PatientService.removeOne(name)
      .then((response) => {
        console.log(response.data);
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const removeMed = (event) => {
    const { name } = event.target;
    console.log(name);
    PatientService.removeMed(name)
      .then((response) => {
        
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const addOne = (event) => {
    const { name } = event.target;
    console.log(name);
    PatientService.addOne(name)
      .then((response) => {
        console.log(response.data);
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  let navigate = useNavigate();

  const checkout = (event) => {
    navigate("../checkout", { replace: true });
  };

  

  return (
    <div>
      <div className="App-header">
     
            <button onClick={(user) =>checkout()}
             className="btn btn-primary" disabled={users.length==0}> checkout </button>
         
        

        {users.length > 0 ? (
             users
            .map((user) => {
              return (
            
              <div
                className="card"
                key={user._id}
                style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
              >
                
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                    {user.medName}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    {user.qty}
                  </h3>
                 
                </div>
                <button
                    style={{ backgroundColor: "red" }}
                    name={user.medID}
                    onClick={(user) => removeMed(user)}
                  >
                    remove this medicine
                  </button>
                <button
                    style={{ backgroundColor: "red" }}
                    name={user.medID}
                    onClick={(user) => removeOne(user)}
                  >
                    -
                  </button>
                  <button
                    style={{ backgroundColor: "green" }}
                    name={user.medID}
                    onClick={(user) => addOne(user)}
                  >
                    +
                  </button>
                  
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

export default MyCart;
