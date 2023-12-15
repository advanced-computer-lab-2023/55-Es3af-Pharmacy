import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import MedsService from "../services/medicine.service";
import pharmacistService from "../services/pharmacist.service";
import Home from "./gohome";
import { Carousel } from "react-bootstrap"; // Import Carousel from React Bootstrap

const MedicinesPharm = (props) => {
  const [medicines, setMedicines] = useState([]);

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
        setMedicines(response.data);
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
      <Home />
      <div className="App-header">
        {medicines.length > 0 ? (
          <Carousel>
            {medicines.map((medicine) => (
              <Carousel.Item key={medicine._id}>
                <div
                  className="card"
                  style={{ width: "600px", backgroundColor: "#282c34", margin: "auto" }}
                >
                  <div className="card-body">
                    <h3 className="card-title" style={{ color: "white" }}>
                      name: {medicine.Name}
                    </h3>
                    <h3 className="card-title" style={{ color: "white" }}>
                      price= {medicine.Price}
                    </h3>
                    <h3 className="card-title" style={{ color: "white" }}>
                      uses= {medicine.medicalUse}
                    </h3>
                    {medicine.image && medicine.image.data && medicine.image.contentType && (
                      <div>
                        <img
                          src={`data:${medicine.image.contentType};base64,${arrayBufferToBase64(medicine.image.data.data)}`}
                          alt={medicine.Name}
                          style={{ width: "200px", height: "200px", color: "white" }}
                        />
                      </div>
                    )}
                    <button
                      style={{ backgroundColor: "white" }}
                      name={medicine.Name}
                      onClick={(event) => archive(event)}
                      disabled={medicine.archived === true}
                    >
                      archive medicine
                    </button>
                    <button
                      style={{ backgroundColor: "white" }}
                      name={medicine.Name}
                      onClick={(event) => unarchive(event)}
                      disabled={medicine.archived === false}
                    >
                      unarchive medicine
                    </button>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div>
            <h2>No medicines</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicinesPharm;
