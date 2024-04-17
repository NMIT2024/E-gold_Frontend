import {
  Container,
  Nav,
  Navbar,
  Row,
  Col
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Phone from "@mui/icons-material/Phone";
import Email from "@mui/icons-material/Email";

import "./Header.css";

function Header() {
  return (
    <>
      <div className="titleHead">
        <Row>
          <Col>
            <Phone fontSize="small" style={{ fontSize: "10px" }} />{" "}
            <span> +91 111 111 111</span>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Email fontSize="small" style={{ fontSize: "10px" }} />{" "}
            finmet@test.com
          </Col>
        </Row>
      </div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="navbar fixed-top navbar-expand-lg navbar-light bg-white"
        sticky="top"
        data-aos="fade-down"
      >
        <Container style={{ marginBottom: 0, padding: "10px" }}>
          <Navbar.Brand>
            <span className="logoBrand">Finmet</span>
          </Navbar.Brand>
          <Navbar.Brand href="#home">
            <span className="priceBrand">
              {/* Gold Price: <span style={{ color: "green" }}>₹ 5,400.9/g</span> */}
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features"></Nav.Link>
              <Nav.Link href="#pricing"></Nav.Link>
            </Nav>
            <Nav style={{ textAlign: "end" }}>
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/register">SignUP</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/faq">FAQ</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/contact">Contact US</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
