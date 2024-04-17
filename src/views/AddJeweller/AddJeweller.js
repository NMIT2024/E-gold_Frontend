import React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Form, Row, Col, Container } from "react-bootstrap";
import { CCol, CCard } from "@coreui/react";
import { useDispatch } from "react-redux";
import { addJeweller } from "src/reducers/Jeweller";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddJeweller.css";

function AddJeweller() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(addJeweller(data)).then((action) => {
      if (addJeweller.fulfilled.match(action)) {
        toast.success("Jeweller added!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // Log or use the form data
        const formData = getValues();
        // Reset the form
        reset();
      }
    });
  };

  return (
    <>
      <div className="image">
        <Container className="InwardFormContainer">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h5>
              <p>Add Jeweller</p>
            </h5>
            <CCard className="mb-4">
              <div className="card-header"></div>
              <div className="card-body">
                <div className="treasurer-container">
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="formJewellerName">
                        <Form.Label>
                          <b>Jeweller Name</b>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Jeweller Name"
                          {...register("jewellerName", { required: true })}
                        />
                        {errors.jewellerName && (
                          <p className="text-danger mb-3">
                            Jeweller Name is required
                          </p>
                        )}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formJewellerAddress"
                      >
                        <Form.Label>
                          <b>Jeweller Address</b>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Jeweller Address"
                          {...register("jewellerAddress", { required: true })}
                        />
                        {errors.jewellerAddress && (
                          <p className="text-danger mb-3">
                            Jeweller Address is required
                          </p>
                        )}
                      </Form.Group>

                      <Form.Group
                        className="text-center"
                        controlId="formSubmit"
                      >
                        <CCol xs={12} style={{ textAlign: "center" }}>
                          <Button
                            type="submit"
                            variant="dark"
                            style={{
                              fontSize: "1rem",
                              padding: "0.5rem",
                              width: "20%",
                              marginTop: "15px",
                            }}
                          >
                            <b>Add</b>
                          </Button>
                        </CCol>
                        <div>
                          <ToastContainer />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </div>
            </CCard>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default AddJeweller;
