import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import OTPInput from "otp-input-react";
import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import "./Registration.css";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
} from "@coreui/react";
import {
  authRegister,
  generateOTP,
  userData,
  validateOTP,
  validatePhone,
} from "src/reducers/Auth";
import Register from "src/views/Registration/Registration";
import Header from "src/views/Header/Header";
import { Container, Row, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import ToastComponent from "../Common/ToastComponent";
import Button from "react-bootstrap/Button";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    otp: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    otp: "",
  });

  const [isCheckboxChecked, setIsCheckboxChecked] = useState();
  const [checkboxError, setCheckboxError] = useState(true);
  const [error, setError] = useState(null);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phone, setphone] = useState("");
  const [OTP, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // New state for the pop-up
  const [isFormValid, setIsFormValid] = useState(false); // New state to track form validity
  const [isPhonValid, setPhonValid] = useState(false); // New state to track form validity
  const [isValidOTP, setValidOTP] = useState(true); // New state to track form validity
  const [sendOTPbtn, setSendOTPbtn] = useState(false);
  const [reSendOTPbtn, setReSendOTPbtn] = useState(false);

  const handleOTPChange = (otp) => {
    const { phone } = formData;
    if (otp && otp.length === 4) {
      dispatch(validateOTP({ phone, otp })).then((action) => {
        if (validateOTP.fulfilled.match(action)) {
          const { status } = action.payload;
          if (status === 1) {
            // OTP not match
            setValidOTP(false);
            toast.success("OTP validated Successfully");
          } else {
            setValidOTP(true);
            toast.error("Wrong OTP entered");
          }
        }
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate phone number length
    if (name === "phone") {
      if (value.length < 10 || value.length > 10) {
        setPhonValid(false);
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "Phone number must be 10 digits",
        }));
      } else {
        setErrors("");
        dispatch(validatePhone({ phone: value })).then((action) => {
          if (validatePhone.fulfilled.match(action)) {
            const { status } = action.payload;
            if (status === 1) {
              toast.error("Phone number already exists!");
            } else {
              setPhonValid(true);
            }
          }
        });
      }
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
    setCheckboxError("");
  };

  const response = useSelector(userData);

  useMemo(() => {
    if (response && response.user && response.user.auth) {
      navigate("/kyc");
    } else if (response && response.value && response.value.auth === false) {
      setError("Invalid Login");
    }
  }, [response]);

  useEffect(() => {
    // Check if all required fields are filled
    const isFormFilled =
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.phone.trim() &&
      formData.otp.trim();

    // Update the form validity state
    setIsFormValid(isFormFilled && isCheckboxChecked);
  }, [
    formData.firstName,
    formData.lastName,
    formData.phone,
    formData.otp,
    isCheckboxChecked,
  ]);

  const resetInputFields = () => {
    setfirstName("");
    setlastName("");
    setphone("");
    setOTP("");
  };

  const handleRegistration = () => {
    if (!isCheckboxChecked) {
      setCheckboxError("Please agree to terms and conditions");
      return;
    }
    if (!formData.firstName) {
      return setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "First Name is required",
      }));
    }

    setError(null);
    // if (firstName && lastName && phone && OTP) {
    dispatch(authRegister(formData)).then((action) => {
      if (authRegister.fulfilled.match(action)) {
        const { status } = action.payload;

        if (status == 2) {
          setError("Phone number already exists.");
        } else if (status == 1) {
          setRegistrationSuccess(true);
          setTimeout(() => {
            setRegistrationSuccess(false);
            resetInputFields();
            toast.success("User created successfully!");
            setTimeout(() => {
              navigate("/login"); // Change "/login" to the actual path of your login page
            }, 2000);
          }, 1000);
        } else {
          toast.error("Something went wrong!");
        }
      } else {
        setError("Registration failed. Please check your details.");
      }
    });
    // }
  };

  const sendOTP = () => {
    setSendOTPbtn(true);
    dispatch(generateOTP({ phone: formData.phone })).then((action) => {
      if (generateOTP.fulfilled.match(action)) {
        const { status } = action.payload;
        if (status === 1) {
          // OTP not match
          toast.success("OTP send Successfully");
        } else {
          toast.error("Something went wrong!");
        }
        // OTP sent Success
        // Can show/enable the OTP enter input
      }
    });
  };

  const resendOTP = () => {
    if (!formData.phone) {
      return setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Phone number must be 10 digits",
      }));
    }
    setReSendOTPbtn(true);
    // dispatch(validatePhone({ phone: formData.phone })).then((action) => {
    //   if (validatePhone.fulfilled.match(action)) {
    //     const { status } = action.payload;
    //     if (status === 1) {
          dispatch(generateOTP({ phone: formData.phone })).then((action) => {
            if (generateOTP.fulfilled.match(action)) {
              const { status } = action.payload;
              if (status === 1) {
                toast.success("OTP send Successfully");
              } else {
                toast.error("Something went wrong!");
              }
            }
          });
    //     } else {
    //       toast.error("Invalid Login Please Signup");
    //     }
    //   }
    // });
  };

  return (
    <>
      <ToastComponent />
      <Header />
      <Container>
        <CContainer>
          <CRow className="justify-content-center ">
            <CCol>
              <CCardGroup>
                <CCard
                  className="p-4"
                  style={{ border: "none", background: "none" }}
                >
                  <CCardBody>
                    {true && (
                      <>
                        {/* Wrap the form around your fields and button */}
                        <CForm
                          // onSubmit={doLogin}  // Add this line to handle form submission
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
                          <h1 className="title_login">
                            <b>SIGN-UP</b>
                          </h1>
                          <Row className="mb-3">
                            <Col>
                              <Form.Label>
                                <b>First Name</b>
                              </Form.Label>
                              <CFormInput
                                placeholder="First name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                              />
                              {errors.firstName && (
                                <p style={{ color: "red" }}>
                                  {errors.firstName}
                                </p>
                              )}
                            </Col>
                            <Col>
                              <Form.Label>
                                <b>Last Name</b>
                              </Form.Label>
                              <CFormInput
                                placeholder="Last name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                              />
                              {errors.lastName && (
                                <p style={{ color: "red" }}>
                                  {errors.lastName}
                                </p>
                              )}
                            </Col>
                          </Row>
                          <Col className="mb-3">
                            <Form.Label>
                              <b>Phone Number</b>
                            </Form.Label>
                            <CFormInput
                              placeholder="Phone Number"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              disabled={sendOTPbtn}
                            />
                            {errors.phone && (
                              <p style={{ color: "red", marginTop: "10px" }}>
                                {errors.phone}
                              </p>
                            )}
                          </Col>
                          {!sendOTPbtn && (
                            <Col>
                              <button
                                type="button"
                                onClick={sendOTP}
                                style={{ width: "140px", marginBottom: "10px" }}
                                disabled={!isPhonValid}
                              >
                                Send OTP
                              </button>
                            </Col>
                          )}
                          {sendOTPbtn && (
                            <Col>
                              <Form.Label>
                                <strong>
                                  Enter Otp sent to your mobile number
                                </strong>
                              </Form.Label>
                              <OTPInput
                                className="mb-3"
                                value={formData.otp}
                                onChange={(otp) => {
                                  handleOTPChange(otp);
                                  setFormData((prevData) => ({
                                    ...prevData,
                                    otp,
                                  }));
                                }}
                                OTPLength={4}
                                otpType="number"
                                disabled={false}
                                secure
                              />

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
                          <p style={{ color: "red" }}>{error}</p>
                          <CRow>
                            <CCol xs={12} style={{ textAlign: "right" }}>
                              {/* Add type="submit" to make it a submit button */}
                              <Button
                                type="button"
                                onClick={handleRegistration}
                                variant="dark"
                                style={{
                                  fontSize: "1rem",
                                  padding: "0.5rem",
                                  width: "35%",
                                  marginTop: "15px",
                                }}
                                // className={`loginBtn ${
                                //   !isFormValid ? "disabledBtn" : ""
                                // }`}
                                disabled={isValidOTP}
                              >
                                <b>Proceed</b>
                              </Button>
                            </CCol>
                          </CRow>
                          <br />
                        </CForm>
                      </>
                    )}
                    {!true && <Register />}
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </Container>
    </>
  );
};

export default Login;
