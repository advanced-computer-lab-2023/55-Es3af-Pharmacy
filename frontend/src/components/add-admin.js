import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import UserService from "../services/user.service";

function AddAdmin() {
  const initialUserState = {
    name: "",
    password: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, password, value } = event.target;
    setUser({ ...user, [name]: value, [password]: value });
  };

  async function addAdmin(e) {
    e.preventDefault();
    // no need to console log response data, only for testing
    UserService.addAdmin(user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={addAdmin}>
          <div className="form-group">
            <label htmlFor="InputUsername">Username</label>
            <input
              type="username"
              className="form-control"
              id="name"
              name="name"
              value={user.name}
              placeholder="Enter username"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={user.password}
              placeholder="Password"
              onChange={handleInputChange}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Admin
          </button>
        </form>
      </header>
    </div>
  );
}

export default AddAdmin;