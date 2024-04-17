import { Form, Row, Col, Container, Button } from "react-bootstrap";
import "./CreditBureauComponent.css";
import { CButton,CCol} from "@coreui/react";
function CreditBureauComponent() {
  return (
    <div className="App">
      <div className="image">
        <Container className="creditContainer">
          <h5>
            <p>CHECK YOUR CREDIT SCORE</p>
          </h5>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Label><b>Full Name</b></Form.Label>
                <Form.Control type="text" placeholder="first name" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Label><b>Birthday</b></Form.Label>
                <Form.Control type="date" placeholder="dd/mm/yy" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Label><b>Mobile No</b></Form.Label>
                <Form.Control type="number" placeholder="Number" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Label><b>Email Id</b></Form.Label>
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Label><b>Pan Card Number</b></Form.Label>
                <Form.Control type="number" placeholder="Enter Pan Number" />
              </Form.Group>
              <Form.Group className="text-center" controlId="formBasicEmail">
                {/* <CButton color="primary" className="mt-3">
                        Login Now!
                      </CButton> */}
                <CCol xs={12} style={{ textAlign: "center" }}>
                  <button type="button" className="loginBtn">
                  Submit
                  </button>
                </CCol>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default CreditBureauComponent;
