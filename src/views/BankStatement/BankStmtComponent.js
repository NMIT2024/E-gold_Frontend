import { Form, Row, Col, Container, Button } from "react-bootstrap";
import "./BankStmtComponent.css";
import Fileupload from "../Common/Fileupload"

function BankStmtComponent() {
  return (
    <div className="BankStmt" >
    <div className="App">
      <div className="image">
        <Container className="BankStmtContainer">
          <h5 style={{padding: "10px"}}>
            <p>Upload your bank statement</p>
          </h5>
          <Row>
            <Col>
              <Form.Group className="mb-1">
                <Fileupload />
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    </div>
  );
}

export default BankStmtComponent;
