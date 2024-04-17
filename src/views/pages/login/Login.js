import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Login.css";
import OTPInput from "otp-input-react";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CRow,
} from "@coreui/react";
import {
  authLogin,
  generateOTP,
  userData,
  validateOTP,
  validatePhone,
} from "src/reducers/Auth";
import Register from "src/views/Registration/Registration";
import Header from "src/views/Header/Header";
import { Container } from "react-bootstrap";
import { Form, Col, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import ToastComponent from "src/views/Common/ToastComponent";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isCheck, setisCheck] = useState();
  const [isLogin, setLogin] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    number: "",
    otp: "",
  });

  const resetState = () => {
    setisCheck(!isCheck);
    setInputs({ email: "", number: "", otp: "" });
  };

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [otperror, setOtperror] = useState(null);
  const [Uname, setUsername] = useState();
  const [Upass, setPassword] = useState();
  const [OTP, setOTP] = useState("");
  const [loginBtn, isLoginButton] = useState(true);
  const [validPhone, setValidPhone] = useState(false);
  const [sendOTPbtn, setSendOTPbtn] = useState(false);
  const [reSendOTPbtn, setReSendOTPbtn] = useState(false);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = (e) => {
    let input = e.target.value;
    if (!isValidEmail(input)) {
      setError("Invalid email");
    } else {
      setError("");
      setUsername(input);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
    setCheckboxError(""); // Clear the error when the checkbox state changes
  };

  const response = useSelector(userData);

  useEffect(() => {
    if (OTP && OTP.length === 4) {
      dispatch(validateOTP({ phone: Uname, otp: OTP })).then((action) => {
        if (validateOTP.fulfilled.match(action)) {
          const { status } = action.payload;
          if (status === 1) {
            // OTP not match
            toast.success("OTP validated Successfully");
            isLoginButton(false);
          } else {
            isLoginButton(true);
            toast.error("Wrong OTP entered");
          }
          // OTP Validation Success
          // Can show/enable Register button
        }
      });
    }
  }, [OTP]);

  useMemo(() => {
    if (response.auth) {
      // if (response && response.user[0].role == 4) {
      //   navigate("/treasurer");
      // } else
      if (response.user[0].role == 2) {
        navigate("/e-gold/wallet");
      } else {
        navigate("/e-gold/dashboard");
      }
    } else if (response.status && response.auth === false) {
      toast.error("Invalid Login");
    }
  }, [response]);

  const doLogin = () => {
    setError("");
    setCheckboxError("");
    setOtperror("");

    // Validate email or phone number
    if (!Uname || (!isValidEmail(Uname) && !/^\d{10}$/.test(Uname))) {
      setError("Invalid email or phone number");
      return;
    }

    // Validate OTP
    if (!OTP || OTP.length !== 4) {
      setOtperror("Please enter a valid OTP");
      return;
    }

    // Validate checkbox
    if (!isCheckboxChecked) {
      setCheckboxError("Please agree to terms and conditions");
      return;
    }

    // All validations passed, proceed with login
    dispatch(authLogin({ phoneNumber: Uname, otp: OTP }));
  };

  const handleChangePhone = (e) => {
    const { name, value } = e.target;
    setUsername(value);
    // Validate phone number length
    if (name === "phone") {
      if (value.length < 10 || value.length > 10) {
        setValidPhone(false);
        setError("Please enter a valid phone number");
      } else {
        setValidPhone(true);
        setError("");
      }
    }
  };
  const sendOTP = () => {
    // Validate phone number format
    // if (!/^\d{10}$/.test(Uname)) {
    //   toast.error("Please enter a valid phone number");
    //   return;
    // }
    setSendOTPbtn(true);

    dispatch(validatePhone({ phone: Uname })).then((action) => {
      if (validatePhone.fulfilled.match(action)) {
        const { status } = action.payload;
        if (status === 1) {
          dispatch(generateOTP({ phone: Uname })).then((action) => {
            if (generateOTP.fulfilled.match(action)) {
              const { status } = action.payload;
              if (status === 1) {
                toast.success("OTP send Successfully");
              } else {
                toast.error("Something went wrong!");
              }
            }
          });
        } else {
          toast.error("Invalid Login Please Signup");
        }
      }
    });
  };

  const resendOTP = () => {
    setSendOTPbtn(true);
    setReSendOTPbtn(true);
    dispatch(validatePhone({ phone: Uname })).then((action) => {
      if (validatePhone.fulfilled.match(action)) {
        const { status } = action.payload;
        if (status === 1) {
          dispatch(generateOTP({ phone: Uname })).then((action) => {
            if (generateOTP.fulfilled.match(action)) {
              const { status } = action.payload;
              if (status === 1) {
                toast.success("OTP send Successfully");
              } else {
                toast.error("Something went wrong!");
              }
            }
          });
        } else {
          toast.error("Invalid Login Please Signup");
        }
      }
    });
  };

  return (
    <>
      <Header />
      <Container>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol>
              <CCardGroup>
                <CCard
                  className="p-4"
                  style={{ border: "none", background: "none" }}
                >
                  <CCardBody>
                    {isLogin && (
                      <>
                        <CForm
                          style={{
                            background: "white",
                            padding: "42px",
                            borderRadius: "8%",
                            width: "100%",
                            maxWidth: "650px",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "auto",
                          }}
                        >
                          <h1 className="title_login ">
                            <b>LOGIN</b>
                          </h1>
                          <Col className="mb-3">
                            <Form.Label>
                              <b>Phone Number</b>
                            </Form.Label>
                            <Form.Control
                              placeholder="Phone Number"
                              name="phone"
                              value={Uname}
                              onChange={handleChangePhone}
                              disabled={sendOTPbtn}
                            />
                          </Col>
                          <p style={{ color: "red" }}>{error}</p>
                          <Col>
                            <FormLabel>
                              {!sendOTPbtn && (
                                <button
                                  type="button"
                                  onClick={sendOTP}
                                  disabled={!validPhone}
                                >
                                  Send OTP
                                </button>
                              )}
                            </FormLabel>
                          </Col>
                          {sendOTPbtn && (
                            <Col>
                              <FormLabel>
                                <strong>
                                  Enter Otp sent to your mobile number
                                </strong>
                              </FormLabel>
                              <OTPInput
                                className="mb-3"
                                value={OTP}
                                onChange={setOTP}
                                OTPLength={4}
                                otpType="number"
                                disabled={false}
                                secure
                              />
                              <p style={{ color: "red" }}>{otperror}</p>
                              {!reSendOTPbtn && (
                                <span
                                  style={{
                                    color: "#be943a",
                                    cursor: "pointer",
                                  }}
                                  onClick={resendOTP}
                                >
                                  <strong>Re-send OTP</strong>
                                </span>
                              )}
                            </Col>
                          )}
                          <br></br>
                          <br></br>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                          >
                            <Form.Check
                              type="checkbox"
                              label={
                                <>
                                  I agree to terms and conditions{" "}
                                  <b style={{ color: "red" }}>*</b>
                                </>
                              }
                              checked={isCheckboxChecked}
                              onChange={handleCheckboxChange}
                            />
                            {checkboxError && (
                              <p style={{ color: "red" }}>{checkboxError}</p>
                            )}
                          </Form.Group>
                          <CRow>
                            <CCol xs={12} style={{ textAlign: "center" }}>
                              <Button
                                type="button"
                                variant="dark"
                                style={{
                                  fontSize: "1rem",
                                  padding: "0.5rem",
                                  width: "35%",
                                  marginTop: "15px",
                                }}
                                onClick={doLogin}
                                disabled={loginBtn}
                              >
                                <b>Login</b>
                              </Button>
                            </CCol>
                          </CRow>
                          <br />
                        </CForm>
                      </>
                    )}
                    {!isLogin && <Register />}
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </Container>
      <ToastComponent />
    </>
  );
};

export default Login;
