import React from 'react';
import { Row, Col, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TfiInstagram, TfiFacebook, TfiLinkedin, TfiTwitterAlt } from 'react-icons/tfi';
import Header from '../Header/Header';
import './Contact.css';
 
const Contact = () => {
  return (
    <>
    <Header/>
      <section style={{ backgroundColor: 'rgb(40, 38, 38)',width:'100%', height:'100vh' }} className="footer-section">
        <Row>
          <Col>
            <div className="footer_title">
              <h1>FINMET GOLD</h1>
            </div>
            <div>
            <p> +91 111 111 111</p>
            <p> finmet@test.com</p>
            </div>
          </Col>
          <Col>
            <div className="site_map">
              <h4>SITE MAP</h4>
              {/* Include your navigation links */}
              <Nav>
                <Nav.Link>
                  <Link to="/">Home</Link>
                </Nav.Link>
                {/* Add more navigation links as needed */}
              </Nav>
            </div>
          </Col>
          <Col>
            <div>
              <p>We are located here</p>
              <p>FinMet Inc.,1/35 Street address,City,State</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31089.68189063566!2d77.53561471190474!3d13.085858372615132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae18719e901e47%3A0xe958bfe5746782f7!2sVignana%20Kendra%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1676371258129!5m2!1sen!2sin"
                width="100%"
                height="250"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row>
          <Col sm={8}>
            <Navbar.Brand href="#home" style={{ fontSize: '20px' }}>
              Copyrighted 2023 FinMet{' '}
            </Navbar.Brand>
            <span>All Rights Reserved</span>
          </Col>
          <Col sm={4}>
            <div className="main_icons">
              <a className="icon_one" href="">
                <TfiInstagram />
              </a>
              <a className="icon_two" href="">
                <TfiFacebook />
              </a>
              <a className="icon_three" href="">
                <TfiLinkedin />
              </a>
              <a className="icon_four" href="">
                <TfiTwitterAlt />
              </a>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};
 
export default Contact;