import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import MedsService from "../services/medicine.service";


import pharmacistService from "../services/pharmacist.service";

const MedicinesPharm = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveMedicines();
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

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
  const archive = (event) => {
    const { name } = event.target;
    
    pharmacistService.archive(name)
      .then((response) => {
        console.log(response.data);
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const unarchive = (event) => {
    const { name } = event.target;
    
    pharmacistService.unarchive(name)
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
                  {user.image && user.image.data && user.image.contentType && (
                <div>
                  <img
                    src={`data:${user.image.contentType};base64,${arrayBufferToBase64(user.image.data.data)}`}
                    alt={user.Name} 
                    style={{ width: "200px", height: "200px",color: "white" }}
                  />
                </div>
              )}
                  <button
                    style={{ backgroundColor: "white" }}
                    name={user.Name}
                    onClick={(user) => archive(user)}
                    disabled={user.archived==true}
                  >
                    archive medicine
                  </button>
                  <button
                    style={{ backgroundColor: "white" }}
                    name={user.Name}
                    onClick={(user) => unarchive(user)}
                    disabled={user.archived==false}
                  >

                    unarchive medicine
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
export default MedicinesPharm;