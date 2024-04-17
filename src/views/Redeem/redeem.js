import React, { useEffect, useMemo, useState } from "react";
import { Form, Row, Col, Container, Modal } from "react-bootstrap";
import { CCol, CCard } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { serverURL } from "src/app/Config";
import { addCoupon, validateRedeem } from "src/reducers/Redemption";
import "./redeem.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { generateOTP, validateOTP } from "src/reducers/Auth";
import { toast } from "react-toastify";
import OTPInput from "otp-input-react";
import ToastComponent from "../Common/ToastComponent";
import { useNavigate } from "react-router-dom";

function Redeem({ socket }) {
  const [goldWeight, setGoldWeight] = useState(0);
  const [selectedJeweller, setSelectedJeweller] = useState("0");
  const [show, setShow] = useState(false);
  const [coupon, setCoupon] = useState();
  const [validationError, setValidationError] = useState("");
  const [isCash, setCash] = useState(true);
  const [priceValue, setPriceValue] = useState("");
  const [inGram, setInGram] = useState(0);
  const [isInputFilled, setIsInputFilled] = useState(false);
  const [isOTPField, setIsOTPField] = useState(false);
  const [showInsufficientBalance, setShowInsufficientBalance] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [averageRate, setAverageRate] = useState(0);
  const [OTP, setOTP] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken") || "";
  const headers = {
    headers: {
      "x-access-token": `${authToken}`,
    },
  };

  useEffect(() => {
    socket.emit("getGoldRate", {
      data: {},
      name: "goldRate",
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });

    socket.on("getGoldResponse", (result) => {
      setAverageRate(result.rate);
    });
  }, [socket]);

  useEffect(() => {
    if (OTP && OTP.length === 4) {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      dispatch(validateOTP({ phone: userInfo[0].phone, otp: OTP })).then(
        (action) => {
          if (validateOTP.fulfilled.match(action)) {
            const { status } = action.payload;
            if (status === 1) {
              // OTP validation success
              toast.success("OTP validated Successfully");
              // Show the confirm button
              setShowConfirmButton(true);
            } else {
              toast.error("Wrong OTP entered");
            }
          }
        }
      );
    }
  }, [OTP]);

  const changeHandler = (value, isCash) => {
    setPriceValue(value);
    if (isCash) {
      const grams = parseFloat(value) / averageRate;
      setInGram(isNaN(grams) ? 0 : grams.toFixed(2));
    } else {
      const grams = parseFloat(value);
      setInGram(isNaN(grams) ? 0 : grams.toFixed(2));
    }
  };

  const sendOTP = () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    //Validate redeem amount
    dispatch(validateRedeem({ weight: inGram, userId: userInfo[0].id })).then(
      (action) => {
        if (validateRedeem.fulfilled.match(action)) {
          const { status, isValid } = action.payload;
          if (status === true && isValid === true) {
            // If input is valid, show the OTP field
            setIsOTPField(true);
            // Send OTP
            dispatch(generateOTP({ phone: userInfo[0].phone })).then(
              (action) => {
                if (generateOTP.fulfilled.match(action)) {
                  const { status } = action.payload;
                  if (status === 1) {
                    toast.success("OTP send Successfully");
                  } else {
                    toast.error("Something went wrong!");
                  }
                }
              }
            );
          } else if (status === true && !isValid) {
            toast.error("Today's Purchase Avaliable For Redeem After 3 Days !");
          } else {
            toast.error("Something went wrong!");
          }
        }
      }
    );
  };

  const generateCouponCode = () => {
    const prefix = "FIN";
    const randomString = uuidv4().substr(0, 8);
    const suffix = "23";

    return `${prefix}${randomString}${suffix}`;
  };

  const handleGenerateCoupon = () => {
    if (
      !isCash &&
      (!priceValue || isNaN(priceValue) || parseFloat(priceValue) <= 0)
    ) {
      setValidationError("Please enter a valid amount in grams.");
      return;
    } else if (
      isCash &&
      (!priceValue || isNaN(priceValue) || parseFloat(priceValue) <= 0)
    ) {
      setValidationError("Please enter a valid amount in rupees.");
      return;
    }

    // Check if the user is trying to redeem more grams than available in their wallet
    if (parseFloat(inGram) > parseFloat(goldWeight)) {
      setShowInsufficientBalance(true);
      return;
    }

    // Send OTP to USER phone
    sendOTP();
  };

  useEffect(() => {
    if (userInfo && userInfo[0] && userInfo[0].id) {
      fetch(`${serverURL}/purchase`, headers)
        .then((res) => res.json())
        .then((data) => {
          const totalgrm = data.result?.[0]?.totalquantity;
          setGoldWeight(totalgrm);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [coupon, show]);

  // Add a function to handle the generation of the coupon upon clicking the confirm button
  const handleConfirm = () => {
    // Generate coupon code
    const couponCode = generateCouponCode();
    setCoupon(couponCode);

    // Dispatch action to add coupon
    dispatch(
      addCoupon({
        coupon: couponCode,
        weight: inGram,
        jwellery: selectedJeweller,
        userId: userInfo && userInfo[0] && userInfo[0].id,
        price: !isCash ? inGram * averageRate.toFixed(2) : priceValue,
      })
    );

    // Show success modal
    setShow(true);

    // Reset validation error after successful submission
    setValidationError("");

    // Clear input fields
    setPriceValue("");
    setOTP("");

    // Close success modal after 3 seconds
    setTimeout(() => {
      setShow(false);
      navigate("/e-gold/reclamation");
    }, 3000);
  };

  return (
    <>
      <div className="image">
        <Container className="InwardFormContainer">
          <h5>
            <p>Redeem</p>
          </h5>
          <CCard className="mb-4">
            <div className="card-header">
              My Wallet Balance: {goldWeight ? goldWeight.toFixed(2) : 0} grm
            </div>
            <div className="card-body">
              {validationError && (
                <div className="alert alert-danger">{validationError}</div>
              )}
              <div className="treasurer-container">
                <Row>
                  <Col>
                    <Form>
                      {["radio"].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                          <Form.Check
                            className="custom-checkbox"
                            style={{ fontWeight: "bold", paddingLeft: "25px" }}
                            inline
                            label="Redeem in Rupees"
                            name="group1"
                            type={type}
                            defaultChecked={true}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCash(true);
                                setPriceValue("");
                                changeHandler("", true);
                              }
                            }}
                          />

                          <Form.Check
                            className="custom-checkbox"
                            style={{ fontWeight: "bold", paddingLeft: "50px" }}
                            inline
                            label="Redeem in Grams"
                            name="group1"
                            type={type}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCash(false);
                                setPriceValue("");
                                changeHandler("", false);
                              }
                            }}
                          />
                        </div>
                      ))}
                    </Form>

                    <InputGroup
                      className="mb-3"
                      style={{
                        margin: "1px",
                        width: "60%",
                      }}
                    >
                      <InputGroup.Text
                        style={{ backgroundColor: "white", color: "#be943a" }}
                      >
                        {isCash && (
                          <span
                            style={{
                              color: "#be943a",
                              fontSize: "14px",
                              fontWeight: "bolder",
                            }}
                          >
                            {inGram > 0 ? ` ₹ ` : "₹"}
                            {""}
                          </span>
                        )}
                        {!isCash && (
                          <span
                            style={{
                              color: "#be943a",
                              fontSize: "14px",
                              fontWeight: "bolder",
                            }}
                          >
                            {inGram > 0 ? ` g ` : "g"}
                            {""}
                          </span>
                        )}
                      </InputGroup.Text>
                      <Form.Control
                        aria-label="Amount (to the nearest dollar)"
                        placeholder="0.00"
                        type="text"
                        name="title"
                        value={priceValue}
                        onChange={(e) => {
                          setPriceValue(e.target.value);
                          changeHandler(e.target.value, isCash);
                          setIsInputFilled(!!e.target.value);
                        }}
                      />
                      <InputGroup.Text
                        style={{ backgroundColor: "white", color: "#be943a" }}
                      >
                        {isCash && (
                          <span
                            style={{
                              color: "#be943a",
                              fontSize: "14px",
                              fontWeight: "bolder",
                            }}
                          >
                            {inGram > 0 ? ` ${inGram} g ` : "0.00g"}
                            {""}
                          </span>
                        )}
                        {!isCash && (
                          <span
                            style={{
                              color: "#be943a",
                              fontSize: "14px",
                              fontWeight: "bolder",
                            }}
                          >
                            {inGram > 0
                              ? `₹ ${(inGram * averageRate).toFixed(2)}`
                              : "₹ 0.00"}{" "}
                          </span>
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                    {isOTPField && (
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>
                          <b>Enter OTP</b>
                        </Form.Label>
                        <OTPInput
                          className="mb-3"
                          value={OTP}
                          onChange={setOTP}
                          OTPLength={4}
                          otpType="number"
                          disabled={false}
                          secure
                        />
                        {showConfirmButton && (
                          <Button
                            type="button"
                            variant="dark"
                            style={{
                              fontSize: "1rem",
                              padding: "0.5rem",
                              width: "20%",
                              marginTop: "15px",
                            }}
                            onClick={handleConfirm}
                          >
                            <b>Confirm</b>
                          </Button>
                        )}
                      </Form.Group>
                    )}
                    {!isOTPField && (inGram > 2) && (
                      <Form.Group
                        className="text-center"
                        controlId="formBasicEmail"
                      >
                        <CCol xs={12} style={{ textAlign: "center" }}>
                          <div>
                            <Button
                              type="submit"
                              variant="dark"
                              style={{
                                fontSize: "1rem",
                                padding: "0.5rem",
                                width: "20%",
                                marginTop: "15px",
                              }}
                              onClick={handleGenerateCoupon}
                              disabled={!isInputFilled}
                            >
                              <b>Send OTP</b>
                            </Button>
                          </div>
                        </CCol>
                      </Form.Group>
                    )}
                  </Col>
                </Row>
              </div>
              
            </div>
          </CCard>
          <p style={{color:"red"}}><b>Above 2 gram of e-gold is redeemable</b></p>
        </Container>
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static" // Prevents closing when clicking on the backdrop
        keyboard={false} // Prevents closing when pressing ESC key
      >
        <Modal.Body className="couponSuccess">
          <h4>Congratulations...! Coupon {coupon} generated Successfully.</h4>
        </Modal.Body>
      </Modal>

      <Modal
        show={showInsufficientBalance}
        onHide={() => setShowInsufficientBalance(false)}
      >
        <Modal.Body className="couponSuccess">
          <h4>Insufficient Balance!</h4>
          <p>
            You do not have enough balance in your wallet to redeem this amount.
          </p>
        </Modal.Body>
      </Modal>

      <ToastComponent />
    </>
  );
}

export default Redeem;
