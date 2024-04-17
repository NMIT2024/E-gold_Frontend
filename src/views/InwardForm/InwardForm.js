import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInward, inwardDetail, postInward } from "src/reducers/Inward";
import { Container, Form, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import { CCard } from "@coreui/react";
import "./InwardForm.css";

const perGram = 5817;

const InwardForm = ({socket}) => {
  const [coverdQt, setCoverd] = useState(0);
  const [jwPrice, setJWprice] = useState(0);
  const [totalgrm, setTotalGram] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity
  const coveredPositionInputRef = useRef(null);
  const dispatch = useDispatch();
  const response = useSelector(inwardDetail);
  const [errors, setErrors] = useState({}); // State for form errors
  const [averageRate, setAverageRate] = useState(0);

  useEffect(() => {
    socket.on("goldResponses", (result) => {
      setAverageRate(result.rate);
    });
  }, [socket]);

  useEffect(() => {
    dispatch(getInward());
  }, []);

  useMemo(() => {
    setTotalGram(JSON.parse(response && response.totalOp));
  }, [response]);

  const handlePricePerGramChange = (e) => {
    setJWprice(e.target.value);
    validateForm(); // Validate form on input change
  };

  const handleCoveredPositionChange = (e) => {
    const value = e.target.value;
    setCoverd(value);
    validateForm(value); // Validate form on input change
  };

  const validateForm = (value) => {
    // Check if all fields are filled
    if (value !== "") {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const saveInward = async () => {
    // Check if covered position exceeds total open position
    if (parseFloat(coverdQt) > parseFloat(totalgrm)) {
      // Show error toast
      toast.error(
        "Insufficient balance. Covered position cannot exceed total open position."
      );
      return; // Exit function if there's an error
    }

    const inwardData = {
      openPosition: totalgrm ? totalgrm.toFixed(2) : 0,
      pricePerGram: perGram,
      jewellerPrice: jwPrice,
      coveredPosition: coverdQt,
    };

    // Dispatch action to save inward data
    await dispatch(postInward(inwardData));

    // Dispatch action to fetch updated inward data
    await dispatch(getInward());

    // Show toast after successful submission
    toast.success("Successfully submitted the form!");

    // Reset the form fields by clearing the covered position input
    setCoverd(0);
    coveredPositionInputRef.current.value = "";
    setIsFormValid(false); // Reset form validity
  };

  return (
    <>
      <div className="image">
        <Container className="InwardFormContainer">
          <h5>
            <p>Inward Form</p>
          </h5>
          <Row>{/* Rate Cards */}</Row>
          <CCard className="mb-4">
            {/* Card Header and Body */}
            <div className="card-header">
              Total Open Positions: {totalgrm ? totalgrm.toFixed(2) : 0} grm
            </div>
            <div className="card-body">
              {/* Form Inputs */}
              <div className="treasurer-container">
                <Row>
                  {/* Open Position */}
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="rate_cards1">
                        Open Position (Grms)
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Open Position"
                        readOnly
                        value={totalgrm ? totalgrm.toFixed(2) : 0}
                      />
                    </Form.Group>
                  </Col>
                  {/* Jeweller Price */}
                  <Col>
                    <Form.Group className="mb-3 " controlId="formBasicEmail">
                      <Form.Label className="rate_cards1">
                        Jeweller Price (per Grms)
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Jeweller price"
                        readOnly
                        // value={perGram}
                        value={averageRate.toFixed(2)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  {/* Covered Position */}
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicEmail"
                      style={{
                        width: "450px",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "auto",
                      }}
                    >
                      <Form.Label className="rate_cards1">
                        Covered Position
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Covered Position"
                        onChange={handleCoveredPositionChange}
                        ref={coveredPositionInputRef}
                        // value={coverdQt}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {/* Submit Button */}
                <Form.Group className="text-center" controlId="formBasicEmail">
                  <button
                    className={`btn-common ${!isFormValid ? "disabled" : ""}`}
                    onClick={saveInward}
                    // className="btn-common"
                    // onClick={saveInward}
                    disabled={!isFormValid}
                  >
                    Submit
                  </button>
                  <ToastContainer />
                </Form.Group>
              </div>
            </div>
          </CCard>
        </Container>
      </div>
    </>
  );
};

export default InwardForm;
