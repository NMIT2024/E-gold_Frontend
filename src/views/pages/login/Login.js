import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "src/views/Header/Header";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import { Form, Col, FormLabel, Button } from "react-bootstrap";
import "./Login.css";
import {
  authLogin,
  generateOTP,
  userData,
  validateOTP,
  validatePhone,
} from "src/reducers/Auth";
import { toast } from "react-toastify";
import ToastComponent from "src/views/Common/ToastComponent";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [validPhone, setValidPhone] = useState(false);
  const [sendOTPbtn, setSendOTPbtn] = useState(false);
  const [isOTPField, setOTPField] = useState(false);
  const [isResendOTPField, setResendOTPField] = useState(false);
  const [phone, setPhoneNumber] = useState();
  const [otpInput, setOTPInput] = useState("");
  const [phoneValidation, setPhoneValidation] = useState("");
  const [isOTPValidated, setOTPValidated] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const response = useSelector(userData);

  useMemo(() => {
    if (response.auth) {
      if (response.user[0].role == 2) {
        navigate("/e-gold/wallet");
      } else {
        navigate("/e-gold/dashboard");
      }
    } else if (response.status && response.auth === false) {
      toast.error("Invalid Login.");
    }
  }, [response]);

  useEffect(() => {
    if (otpInput && otpInput.length === 4) {
      dispatch(validateOTP({ phone: phone, otp: otpInput })).then((action) => {
        if (validateOTP.fulfilled.match(action)) {
          const { status } = action.payload;
          if (status === 1) {
            setOTPValidated(true);
            toast.success("OTP validated Successfully");
          } else {
            toast.error("Wrong OTP entered");
          }
        }
      });
    }
  }, [otpInput]);

  const handleChangePhone = (phone) => {
    const phoneregex = /^[1-9]\d{9}$/;
    if (phoneregex.test(phone)) {
      setValidPhone(true);
      setPhoneNumber(phone);
      setPhoneValidation("");
      dispatch(validatePhone({ phone: phone })).then((action) => {
        if (validatePhone.fulfilled.match(action)) {
          const { status } = action.payload;
          if (status === 1) {
            setSendOTPbtn(true);
          } else {
            toast.error("Not a registered number please signup!");
            setTimeout(() => {
              navigate("/register"); // Change "/login" to the actual path of your login page
            }, 3000);
            setValidPhone(false);
          }
        }
      });
    } else {
      setPhoneValidation("Invalid Phone");
      setValidPhone(false);
    }
  };

  const sendOTP = () => {
    dispatch(generateOTP({ phone: phone })).then((action) => {
      if (generateOTP.fulfilled.match(action)) {
        const { status } = action.payload;
        if (status === 1) {
          toast.success("OTP send Successfully");
          setOTPField(true);
          setSendOTPbtn(false);
          setTimeout(() => {
            setResendOTPField(true);
          }, 10000);
        } else {
          toast.error("Something went wrong!");
        }
      }
    });
  };

  const resendOTP = () => {
    dispatch(validatePhone({ phone: phone })).then((action) => {
      if (validatePhone.fulfilled.match(action)) {
        const { status } = action.payload;
        if (status === 1) {
          dispatch(generateOTP({ phone: phone })).then((action) => {
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

  const onSubmit = (data) => {
    dispatch(authLogin({ phoneNumber: phone, otp: otpInput }));
  };

  return (
    <>
      <Header />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol>
            <CCardGroup>
              <CCard
                className="p-4"
                style={{ border: "none", background: "none" }}
              >
                <CCardBody className="loginForm">
                  <h1 className="title_login ">
                    <strong>LOGIN</strong>
                    <br />
                  </h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="divisionRow">
                      <Form.Control
                        placeholder="Phone Number"
                        name="phoneNumber"
                        {...register("phoneNumber", { required: true })}
                        // value={phone}
                        onChange={(e) => handleChangePhone(e.target.value)}
                        // disabled={validPhone}
                        readOnly={validPhone}
                      />
                      {errors.phoneNumber && (
                        <span className="errors">Pnone number is required</span>
                      )}

                      {phoneValidation && (
                        <span className="errors">Invalid Phone number</span>
                      )}
                    </div>

                    {sendOTPbtn && (
                      <div className="divisionRow">
                        <Button
                          type="button"
                          {...register("otp", { required: true })}
                          variant="outline-secondary"
                          onClick={sendOTP}
                          disabled={!validPhone}
                        >
                          Send OTP
                        </Button>
                      </div>
                    )}
                    {isOTPField && (
                      <div className="divisionRow">
                        <FormLabel>
                          <strong>Enter Otp sent to your mobile number</strong>
                        </FormLabel>
                        <OTPInput
                          className="mb-3"
                          value={otpInput}
                          onChange={setOTPInput}
                          OTPLength={4}
                          otpType="number"
                          secure
                        />
                      </div>
                    )}
                    {isResendOTPField && !isOTPValidated && (
                      <div className="divisionRow">
                        <span className="resendOTP" onClick={resendOTP}>
                          <strong>Re-send OTP</strong>
                        </span>
                      </div>
                    )}
                    <div className="divisionRow">
                      <Form.Check
                        type="checkbox"
                        name="tc_agree"
                        label={
                          <p>
                            <span style={{ color: "red" }}>*</span> I agree to
                            terms and conditions
                          </p>
                        }
                        // checked={isCheckboxChecked}
                        // onChange={handleCheckboxChange}
                        {...register("tc_agree", { required: true })}
                      />
                      {errors.tc_agree && (
                        <span className="errors">This is required</span>
                      )}
                    </div>
                    <Button
                      type="submit"
                      variant="dark"
                      className="loginBtn"
                      // onClick={doLogin}
                      // disabled={loginBtn}
                    >
                      <b>Login</b>
                    </Button>
                  </form>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ToastComponent />
    </>
  );
}
