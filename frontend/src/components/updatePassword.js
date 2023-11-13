import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import PatientService from "../services/patient.service";
import { useParams } from "react-router-dom";
//import bcrypt from "bcrypt";


function UpdatePassword() {
    //const temp = {password: ''};
    //const { id } = useParams()

    // var oldPassword = ''
    // PatientService.getPassword()
    // .then((res) => {
    //     oldPassword = res.data
    //     console.log(oldPassword)
    // })
    // .catch((err) => console.error(err))
    let passwords = {
        oldPassword : '',
        newPassword : ''
    };

    const [currPassword, setCurrPassword] = useState('')
    const [password,setPassword] = useState('')
    const [message, setMessage] = useState('');
    const [message2, setMessage2] = useState('')

    const handleInputChange = (event) => {
        setPassword(event.target.value)
        passwords.newPassword = password
        console.log('password is sent')
        if (password.length < 6) {
            setMessage('Password is too short');
          } else if (!/\d/.test(password)) {
            setMessage('Password should contain at least two digit');
          } else if(!/[A-Z]/.test(password)){
            setMessage('Password should contain at least two capital letters');
          } else if(currPassword === password){
            setMessage('same password, choose a new one')
          }
          else {
            setMessage('Password strength is good');
          }
    }

    const handleInputChange2 = (event) => {
        setCurrPassword(event.target.value)
        passwords.oldPassword = currPassword
        //let correct = false
        // PatientService.getPassword(currPassword)
        // .then((res) => {
        //     if(res.status == 200){
        //         correct = res.data
        //         console.log(correct)
        //     }
        //     else console.error(res)
        // })
        // .catch((err) => console.error(err))

        // if(!correct){
        //     setMessage2('current password is wrong')
        // } else if(correct){
        //     setMessage2('Current password is correct')
        // }
    }

    const updatePassword = () => {
        if(currPassword === '' || password === ''){
            setMessage('current password or new password are empty')
        } else {
            PatientService.updatePassword(passwords)
            .then((res) =>{
                console.log(res.data)
                setMessage2(res.data)
            })
        }
    };

    return (
        <div className="App">
          <header className="App-header">
              <div className="form-group">
              <label htmlFor="Name">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="currPassword"
                  value={currPassword}
                  placeholder="Enter Current Password"
                  onChange={handleInputChange2}
                ></input>
                <label htmlFor="Name">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  value={password}
                  placeholder="Enter new Password"
                  onChange={handleInputChange}
                ></input>
                <p style={{ color: 'red' }}>{message}</p>
              </div>
              <br></br>
              <button onClick={updatePassword} className="btn btn-primary">
                Confirm
              </button>
              <p style ={{color: 'white'}}>{message2}</p>
          </header>
        </div>
    );
}

export default UpdatePassword