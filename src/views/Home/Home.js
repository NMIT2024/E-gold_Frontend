import { Container, Nav, Navbar, Col, Row } from "react-bootstrap";
import Login from "../pages/login/Login";
import Register from "../Registration/Registration";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="bg1">
        <Navbar bg="light" variant="light" className="head">
          <Container>
            <Navbar.Brand href="#home">Demo</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features"></Nav.Link>
              <Nav.Link href="#pricing"></Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container className="bgHome">
          <Row>
            <Col></Col>
            <Col>
              <Login />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="foot">
        <div className="footlink">
          <div>@Copyright Bank Ltd.</div>
          <div>
          <span>Terms and Conditions</span>
          </div>
          <div>Privacy and Policy</div>
        </div>
      </div>
    </>
  );
}
export default Home;
