import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import "./Payment.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./Payment.css";

function Payment({ setBasicData,price }) {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
  });

  const [bankDetails, setBankDetails] = useState({
    cardType: "",
    cname: "",
    cnumber: "",
    cexpMonth: "",
    cexpYear: null, // Initialize cexpYear with null
    cvvNo: "",
  });

  const [userDetailsErrors, setUserDetailsErrors] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
  });

  const [bankDetailsErrors, setBankDetailsErrors] = useState({
    cardType: "",
    cname: "",
    cnumber: "",
    cexpMonth: "",
    cexpYear: "",
    cvvNo: "",
  });

 

  useEffect(() => {
    setBasicData(userDetails);
    
  }, [userDetails]);

  const validateAlphabets = (value, fieldName) => {
    const regex = /^[a-zA-Z ]+$/;
    if (!regex.test(value)) {
      return `${fieldName} should contain only alphabets`;
    }
    return "";
  };

  const handleChangeForm = (value, field) => {
    setBankDetails({ ...bankDetails, [field]: value });
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) ? "" : "Invalid email address";
  };

  const validateMobileNumber = (value) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(value) ? "" : "Invalid mobile number";
  };

  const handleUserDetailsChange = (event, field) => {
    const value = event.target.value;
    setUserDetails({ ...userDetails, [field]: value });

    // Real-time validation for each field
    switch (field) {
      case "name":
        setUserDetailsErrors({
          ...userDetailsErrors,
          [field]: validateAlphabets(value, "Name"),
        });
        break;
      case "email":
        setUserDetailsErrors({
          ...userDetailsErrors,
          [field]: validateEmail(value),
        });
        break;
      case "phone":
        setUserDetailsErrors({
          ...userDetailsErrors,
          [field]: validateMobileNumber(value),
        });
        break;
      case "city":
      case "state":
        setUserDetailsErrors({
          ...userDetailsErrors,
          [field]: validateAlphabets(
            value,
            field.charAt(0).toUpperCase() + field.slice(1)
          ),
        });
        break;
      case "zipcode":
        setUserDetailsErrors({
          ...userDetailsErrors,
          [field]: /^\d{6}$/.test(value)
            ? ""
            : "Zip code should contain 6 digits",
        });
        break;
      default:
        setUserDetailsErrors({ ...userDetailsErrors, [field]: "" });
    }
  };

  const handleBankDetailsChange = (event, field) => {
    let value;

    if (typeof event === "object") {
      value = event.target.value;
    } else {
      value = event;
    }
    // const value = field === "cexpYear" ? event : event.target.value;
    setBankDetails({ ...bankDetails, [field]: value });

    // Real-time validation for each field
    switch (field) {
      case "cname":
        setBankDetailsErrors({
          ...bankDetailsErrors,
          [field]: validateAlphabets(value, "Name on card"),
        });
        break;
      case "cnumber":
        setBankDetailsErrors({
          ...bankDetailsErrors,
          [field]: /^\d{16}$/.test(value)
            ? // value.length === 16
              ""
            : "Credit card number should contain 16 digits",
        });
        break;
      case "cexpMonth":
        setBankDetailsErrors({
          ...bankDetailsErrors,
          [field]: validateAlphabets(value, "Expiry month"),
        });
        break;
      case "cexpYear":
        setBankDetailsErrors({
          ...bankDetailsErrors,
          [field]:
            value && value.length === 4
              ? ""
              : "Expiry year should contain 4 digits",
        });
        break;
      case "cvvNo":
        setBankDetailsErrors({
          ...bankDetailsErrors,
          [field]: /^\d{3}$/.test(value)
            ? //  value.length === 3
              ""
            : "CVV should contain 3 digits",
        });
        break;
      default:
        setBankDetailsErrors({ ...bankDetailsErrors, [field]: "" });
    }
  };

  return (
    <div className="paymentForm">
      <form action="" className="PaymentContainer">
        <div className="row">
          <div className="col">
            <h3
              className="title"
              style={{
                fontWeight: "bold",
                color: "#be943a",
                fontFamily: "Playfair Display SC",
              }}
            >
              Billing address
            </h3>
            <div className="inputBox">
              <span>Full name :</span>
              <InputText
                placeholder="john deo"
                value={userDetails.name}
                onChange={(e) => handleUserDetailsChange(e, "name")}
                required
              />
            </div>
            {userDetailsErrors.name && (
              <div className="error">{userDetailsErrors.name}</div>
            )}

            <div className="inputBox">
              <span>Email :</span>
              <InputText
                placeholder="example@example.com"
                value={userDetails.email}
                onChange={(e) => handleUserDetailsChange(e, "email")}
                required
              />
            </div>
            {userDetailsErrors.email && (
              <div className="error">{userDetailsErrors.email}</div>
            )}

            <div className="inputBox">
              <span>Mobile No :</span>
              <InputText
                placeholder="+91 999 999 999"
                value={userDetails.phone}
                onChange={(e) => handleUserDetailsChange(e, "phone")}
                required
              />
            </div>
            {userDetailsErrors.phone && (
              <div className="error">{userDetailsErrors.phone}</div>
            )}

            <div className="inputBox">
              <span>Address :</span>
              <InputText
                placeholder="room - street - locality"
                value={userDetails.address}
                onChange={(e) => handleUserDetailsChange(e, "address")}
                required
              />
            </div>
            {userDetailsErrors.address && (
              <div className="error">{userDetailsErrors.address}</div>
            )}

            <div className="inputBox">
              <span>City :</span>
              <InputText
                placeholder="mumbai"
                value={userDetails.city}
                onChange={(e) => handleUserDetailsChange(e, "city")}
                required
              />
            </div>
            {userDetailsErrors.city && (
              <div className="error">{userDetailsErrors.city}</div>
            )}

            <div className="flex">
              <div className="inputBox">
                <span>State :</span>
                <InputText
                  placeholder="india"
                  value={userDetails.state}
                  onChange={(e) => handleUserDetailsChange(e, "state")}
                  required
                />
              </div>
              {userDetailsErrors.state && (
                <div className="error">{userDetailsErrors.state}</div>
              )}

              <div className="inputBox">
                <span>Zip code :</span>
                <InputText
                  placeholder="400001"
                  value={userDetails.zipcode}
                  onChange={(e) => handleUserDetailsChange(e, "zipcode")}
                  required
                />
              </div>
              {userDetailsErrors.zipcode && (
                <div className="error">{userDetailsErrors.zipcode}</div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Payment;
