import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import PharmacistService from "../services/pharmacist.service";
import Home from "./gohome";
import { Carousel } from "react-bootstrap";
const PharmacistList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrievePharmacists();
  }, []);

  const retrievePharmacists = () => {
    PharmacistService.getAll()
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
      <Home />
      <div className="App-header">
        {users.length > 0 ? (
          <Carousel>
            {users.map((user) => (
              <Carousel.Item key={user._id}>
                <div
                  className="card"
                  style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
                >
                  <div className="card-body">
                    <h3 className="card-title" style={{ color: "white" }}>
                      {user.username}
                    </h3>
                    <h2 className="card-title" style={{ color: "white" }}>
                      {user.hourlyRate}
                    </h2>
                    <h2 className="card-title" style={{ color: "white" }}>
                      {user.affiliation}
                    </h2>
                    <h2 className="card-title" style={{ color: "white" }}>
                      {user.educationBackground}
                    </h2>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div>
            <h2>No pharmacists</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacistList;