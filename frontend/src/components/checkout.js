import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import PatientService from "../services/patient.service";
import { useNavigate } from "react-router-dom";


function CheckoutPage() {
  const initialUserState = {
    delivery: "",
    paymentMethod: "",
    amount:0
  };
  const intialItems={
    lineItems:[
      {
        quantity:1,
        price_data:{
          currency:"egp",
          product_data:{
            name:""
          },
          unit_amount:0
        },
      }
    ],
    success_url:"",
    cancel_url:"",
  };
  

  const [body,setBody]=useState(intialItems);
  const [user, setUser] = useState(initialUserState);
  const [users, setUsers] = useState([]);
  const history = useNavigate();


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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handlePaymentMethodChange = (event) => {
    setUser({ ...user, paymentMethod: event.target.value });
  };

  async function add(e) {
    e.preventDefault();
    // no need to console log response data, only for testing
    
    PatientService.checkout()
      .then((response) => {
       
        console.log(response.data);
        
      })
      .catch((e) => {
        
        console.log(e);
      });
  }
  async function pay(e){
    e.preventDefault();
    var totalAmount=0;
    for (let i = 0; i < users.length; i++){
      totalAmount+=users[i].medPrice*users[i].qty;
    }
    if(user.paymentMethod.localeCompare("CoD")==0){
      PatientService.checkout();
      alert("Please choose an address to your order");
      history("/patient/dropdown")
    }
    else if(user.paymentMethod.localeCompare("Wallet")==0){
      setUser(async (prevUser)=>{
        const updatedUser={
          ...prevUser,
          amount:totalAmount,
        };
        try{
          const response = await PatientService.withdrawFromWallet(updatedUser);
          if(response.data.localeCompare("Amount deducted successfully")==0){
            PatientService.checkout();
            history("/patient/order")
          }
          alert(response.data + "\nTotal Order Amount: "+totalAmount+" EGP");
        }
        catch (e) {
          console.log(e);
        }
        return updatedUser;
        });
      }
    else{
      let updatedBody = { ...body };
      updatedBody.lineItems = updatedBody.lineItems || [];

      // Clear the existing default item
      updatedBody.lineItems = [];   
      for (let i = 0; i < users.length; i++){
        updatedBody.lineItems.push({
          price_data: {
            currency: "egp",
            product_data: {
              name: users[i].medName,
            },
            unit_amount: users[i].medPrice * 100,
          },
          quantity: users[i].qty,
        });
      }
      updatedBody.success_url="http://localhost:4000/patient/dropdown";
      updatedBody.cancel_url="http://localhost:4000/patient/"
      setBody(updatedBody);
      console.log(updatedBody);
      try{
        const response = await fetch("http://localhost:8000/patient/createSession", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBody),
        });
    
        if (!response.ok) {
          const errorResponse = await response.json();
          console.error(errorResponse); 
          return;
        }
    
        const jsonResponse = await response.json();
        const { url } = jsonResponse;
        window.location = url;
        PatientService.checkout();
     }
      catch (e) {
      console.log(e);
      }
    }  
  }
  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={add}>
          <div className="form-group">
            
          </div>
          <div className="form-group">
            <label>Select a Payment Method:</label>
            <div>
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="CoD"
                checked={user.paymentMethod === "CoD"}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="cod">Cash on Delivery (CoD)</label>
            </div>

            <div>
              <input
                type="radio"
                id="wallet"
                name="paymentMethod"
                value="Wallet"
                checked={user.paymentMethod === "Wallet"}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="wallet">Wallet</label>
            </div>

            <div>
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                value="Credit Card"
                checked={user.paymentMethod === "Credit Card"}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="creditCard">Credit Card</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" onClick={pay}>
            Pay
          </button>
        </form>
      </header>
    </div>
  );
}

export default CheckoutPage;