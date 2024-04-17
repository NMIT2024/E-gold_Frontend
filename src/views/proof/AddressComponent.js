import React , {useState} from "react";
import { Form, Col, Row, Container, Button, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Fileupload from "../Common/Fileupload";

function AddressComponent() {
  const { handleSubmit, formState: { errors } } = useForm();
  const [type, setType] = useState('')
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {/* <Form.Label>Select any</Form.Label> */}
              <Form.Select
                aria-label="Default select example"
                name="type"
                onChange={(e) => setType(e.target.value)}
              >
                <option>Select </option>
                <option value="1">Adhar Card</option>
                <option value="2">Pan Card</option>
                <option value="3">Passport</option>
                <option value="4">Driving Licence</option>
                <option value="4">Voters ID</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {type && <Fileupload />}
            </Form.Group>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AddressComponent;
