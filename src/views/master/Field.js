import React, { useState } from "react";
import { Form, Col, Row, Container, Button, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fieldUpdate } from "../../reducers/Field";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { margin } from "@mui/system";
import { fields } from "src/app/Constants";

function Field() {
  const dispatch = useDispatch();
  const [inputList, setInputList] = useState([
    { title: "", type: "", isRequired: "", status: "" },
  ]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { title: "", type: "", isRequired: "", status: "" },
    ]);
  };

  const doSubmit = () => {
    dispatch(fieldUpdate({ clientId: 1, inputList }));
  };

  return (
    <div className="App">
      {inputList.map((x, i) => {
        return (
          <div className="box" key={i}>
            <Container onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>
                      <b>Title</b>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      type="text"
                      placeholder="Type"
                      name="title"
                      value={x.title}
                      onChange={(e) => handleInputChange(e, i)}
                    // {...register("fname", { required: true })}
                    />
                    {/* {errors.fname && <span style={{color:"red"}}>This field is required</span>} */}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      <b>Type</b>
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      name="type"
                      value={x.type}
                      onChange={(e) => handleInputChange(e, i)}
                    >
                      <option>Select </option>
                      {Object.keys(fields).map((keyName, i) => (
                        <option key={i} value={keyName}>{fields[keyName]}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      <b>Is required</b>
                    </Form.Label>
                    <br></br>
                    <Form.Select
                      aria-label="Default select example"
                      name="isRequired"
                      value={x.isRequired}
                      onChange={(e) => handleInputChange(e, i)}
                    >
                      <option>Select</option>
                      <option value="1">Yes</option>
                      <option value="2">No</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      <b>Status</b>
                    </Form.Label>
                    <br></br>
                    <Form.Select
                      aria-label="Default select example"
                      name="status"
                      value={x.status}
                      onChange={(e) => handleInputChange(e, i)}
                    >
                      <option>Select</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Row>
                    <div className="btn-box" style={{ display: "inline-flex" }}>
                      {inputList.length - 1 === i && (
                        <IconButton
                          sx={{
                            color: "#0d6efd",
                          }}
                          style={{ margin: "30px" }}
                          variant="primary"
                          type="button"
                          onClick={handleAddClick}
                        >
                          <AddCircleIcon />
                        </IconButton>
                      )}
                      {inputList.length !== 1 && (
                        <IconButton
                          sx={{
                            color: "#0d6efd",
                          }}
                          style={{ margin: "23px" }}
                          variant="primary"
                          type="button"
                          onClick={() => handleRemoveClick(i)}
                        >
                          <RemoveCircleIcon />
                        </IconButton>
                      )}
                    </div>
                  </Row>
                </Col>
              </Row>
            </Container>
          </div>
        );
      })}
      <Button
        variant="primary"
        type="button"
        onClick={doSubmit}
        style={{ margin: "10px", marginLeft: "40px", marginBottom: "50px" }}
      >
        Submit
      </Button>
    </div>
  );
}

export default Field;
