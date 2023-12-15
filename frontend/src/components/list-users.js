import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import Home from "./gohome";
import { Carousel } from "react-bootstrap";

const UsersList = (props) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    setLoading(true);
    UserService.getAll()
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  const deleteUser = (event) => {
    const { name } = event.target;
    
    UserService.deleteUser(name)
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
      <Home />
      {loading ? (
        <div class="preloader">
            <div class="loader">
                <div class="loader-outter"></div>
                <div class="loader-inner"></div>

                <div class="indicator"> 
                    <svg width="16px" height="12px">
                        <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
                        <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
                    </svg>
                </div>
            </div>
        </div>      ) : (
      <div className="App-header">
        {users.length > 0 ? (
          <Carousel>
            {users
              .filter(user => user.__t === "patient" || user.__t === "pharmacist")
              .map((user) => (
                <Carousel.Item key={user._id}>
                  <div
                    className="card"
                    style={{
                      width: "800px", // Adjusted width
                      backgroundColor: "#282c34",
                      margin: "auto",
                      padding: "20px", // Added padding
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <div className="card-body">
                      <h3 className="card-title" style={{ color: "white" }}>
                        {user.username}
                      </h3>
                      <h3 className="card-title" style={{ color: "white" }}>
                        {user.__t}
                      </h3>
                      <button
                        style={{ backgroundColor: "red" }}
                        name={user._id}
                        onClick={(event) => deleteUser(event)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
          </Carousel>
        ) : (
          <div>
            <h2>No users</h2>
          </div>
        )}
      </div>
       )}
    </div>
  );
};

export default UsersList;
