import React, { useEffect, useState } from "react";
import "./ConfirmOrder.css";
import { serverURL } from "../../app/Config";
import { useNavigate } from 'react-router-dom';
 
const ConfirmOrder = (props) => {
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
 
    const goToWallet = () => {
      // Navigate to the wallet page
      navigate('/e-gold/wallet');
    };
 
  return (
    <>
      <div className="successContainer">
        {/* {showSuccess ? ( */}
          <div className="successCardContainer">
            <h2 className="successHeader">Congratulations {props.name}!</h2>
            <h5 className="successMessage">Transaction Completed Successfully</h5>
           <h4>
            <hr/>
          You earned <b>{props.quantity} g </b>
          </h4>
            <button
              className="goToWalletButton"
              onClick={goToWallet}
            >
              Go to Wallet
            </button>
          </div>
        {/* ) : null} */}
      </div>
    </>
  );
};
 
export default ConfirmOrder;
 