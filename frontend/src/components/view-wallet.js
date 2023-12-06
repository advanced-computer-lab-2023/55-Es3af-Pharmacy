import React, { useState, useEffect } from 'react';

import patientService from '../services/patient.service';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
var res= 0;
function ViewWallet() {
  const [walletAmount, setWalletAmount] = useState(null);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
       
        const response = await patientService.getWallet();
        const { amountInWallet } = response.data; // Assuming your API response contains the amount

        setWalletAmount(amountInWallet);
        console.log(response.data);
         res= response.data;
      } catch (error) {
        console.error('Error fetching wallet amount:', error);
      }
    };

    fetchWallet();
  }, []);

  return (
    <div>
      <h2>Wallet Amount</h2>
      {walletAmount !== null ? (
        <p>Your total amount is
        {" "+res}
        </p>
       
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ViewWallet;
