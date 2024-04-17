import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import { CCard, CCardBody, CCardGroup, CCol, CForm, CRow } from "@coreui/react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import "./Main.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import {
  TfiLinkedin,
  TfiTwitterAlt,
  TfiInstagram,
  TfiFacebook,
} from "react-icons/tfi";

const DEFAULTTIME = 60;
let timer;

function Main({socket}) {
  const [show, setShow] = useState(false);
  const [isCash, setCash] = useState(true);
  const navigate = useNavigate();
  const [priceValue, setPriceValue] = useState(null);
  const [seconds, setSeconds] = useState(DEFAULTTIME); // Initial timer value
  const [averageRate, setAverageRate] = useState(0);

  useEffect(() => {
    socket.emit("getGoldRate", {
      data: {},
      name: "goldRate",
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });

    socket.on("getGoldResponse", (result) => {
      setAverageRate(result.rate);
    });

    // socket.on("goldResponses", (result) => {
    //   setAverageRate(result.rate);
    // });
  }, [socket]);

  useEffect(() => {
    if (seconds > 0) {
      // Only set up the timer if seconds are greater than 0
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    // Cleanup function to clear the interval when the component unmounts or when the timer reaches 0
    return () => clearInterval(timer);
  }, [seconds]); // Re-run the effect whenever seconds change

  const handleClose = () => {
    clearInterval(timer); // Clear the interval when the modal is closed
    setShow(false);
  };

  const handleShow = () => {
    // Start the timer when the modal is opened
    setShow(true);
  };

  const changeHandler = (value, isCash) => {
    setPriceValue(value);
  };

  const handleQuickTab = (value) => {
    if (value) {
      changeHandler(value, isCash);
    }
  };

  const Navigatepurchase = () => {
    clearInterval(timer); // Clear the interval when navigating to another page
    navigate("/login");
  };

  return (
    <>
      <Header />
      <div className="main_bg">
        <div className="overlay">
          <CRow
            className="justify-content-center"
            style={{ width: "fit-content", backgroundColor: "pink" }}
          >
            <CCol>
              <div className="bg_text">
                <h1>
                  BUY 99.9% <br />
                  PURE DIGITAL GOLD
                </h1>
                <p id="quote">
                  <b>
                    The easiest & smartest way to <br />
                    accumulate 24K 999 Pure Gold
                  </b>
                </p>
              </div>
            </CCol>
            <CCol>
              <CCardGroup className="main_card">
                <CCard
                  className="p-4"
                  style={{ border: "none", background: "none" }}
                >
                  <CCardBody>
                    <CForm
                      style={{
                        background: "white",
                        padding: "42px",
                        borderRadius: "8%",
                        border: "solid 1px #cfb53b",
                        fontFamily: "Nanum Myeongjo",
                      }}
                    >
                      <h4 className="mb-3">
                        24K 999 Pure Digital{" "}
                        <b>Gold Rate ₹ {averageRate.toFixed(2)}/g</b>
                      </h4>
                      <h5 className="mb-3">Buy Gold</h5>
                      <Row className="mb-3">
                        <Col>
                          <InputGroup
                            className="mb-3"
                            style={{
                              border: "solid 1px #be943a",
                              borderRadius: "6px",
                            }}
                          >
                            <InputGroup.Text id="inputGroup-sizing-default">
                              ₹
                            </InputGroup.Text>
                            <Form.Control
                              value={priceValue || ""}
                              placeholder="0.00"
                              aria-label="Default"
                              aria-describedby="inputGroup-sizing-default"
                              onChange={(e) => setPriceValue(e.target.value)}
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row className="mb-3" style={{ display: "flex" }}>
                        <div>
                          <Button
                            type="button"
                            variant="outline-secondary"
                            className="main_btn"
                            style={{ border: "solid 1px #be943a" }}
                            onClick={() => handleQuickTab("500")}
                          >
                            +500
                          </Button>
                          <Button
                            type="button"
                            variant="outline-secondary"
                            className="main_btn"
                            style={{ border: "solid 1px #be943a" }}
                            onClick={() => handleQuickTab(1000)}
                          >
                            +1000
                          </Button>
                          <Button
                            type="button"
                            variant="outline-secondary"
                            className="main_btn"
                            style={{ border: "solid 1px #be943a" }}
                            onClick={() => handleQuickTab(2000)}
                          >
                            +2000
                          </Button>
                          <Button
                            variant="outline-secondary"
                            className="main_btn"
                            type="button"
                            style={{ border: "solid 1px #be943a" }}
                            onClick={() => handleQuickTab(5000)}
                          >
                            +5000
                          </Button>
                        </div>
                      </Row>
                      
                      <CRow>
                        <CCol xs={12} style={{ textAlign: "right" }}>
                          <Button
                            type="button"
                            value="Input"
                            // className="mainBtn"
                            onClick={Navigatepurchase}
                            variant="dark"
                            style={{
                              fontSize: "1rem",
                              padding: "0.5rem",
                              width: "45%",
                              marginTop: "20px",
                            }}
                          >
                            {/* <button
                              type="button"
                              className="gotopurchase"
                              onClick={Navigatepurchase}
                            > */}
                              <b>Proceed To BUY</b>
                            {/* </button> */}
                          </Button>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </div>
      </div>

      <div>
        <section style={{ position: "relative" }}>
          <hr className="hr-left"></hr>
          <h1 className="mainTitle">
            <span>
              <b>WHAT IS FINMET DIGITAL GOLD?</b>
            </span>
          </h1>
          <hr className="hr-right"></hr>
          <div>
            <Container>
              <Row>
                <Col className="about_finmet">
                  <h5>
                    Today Gold is no longer used as currency but it can still be
                    used as money. In fact, Gold has been a store of value for
                    over 3000 years. Much longer than any currency anywhere. In
                    India, Gold is believed to be “God’s Money” and is offered
                    to holy temples on almost all auspicious occasions. This
                    makes India the largest importer of Gold in the world today.
                    Despite being in the midst of a global pandemic, Indians
                    have found a new way to invest in the yellow metal – Digital
                    Gold.
                  </h5>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </div>
      <section style={{ position: "relative", backgroundColor: "white" }}>
        <hr className="hr-left"></hr>
        <h1 className="mainTitle">
          <span>
            <b>Key Features</b>
          </span>
        </h1>
        <hr className="hr-right"></hr>
        <Container className="main_clipart">
          <Row
            style={{
              margin: "10px",
            }}
          >
            <Col>
              <img
                src="images/img1.png"
                width="200px"
                className="clipart_img"
              />
              <div className="clipart_text">
                <h4>Buy & Sell anytime, anywhere</h4>
                <p>
                  Buy and sell from any location at any time. Our services are
                  provided 24 hours/day, 7 days a week
                </p>
              </div>
            </Col>
            <Col>
              <img
                src="images/img2.png"
                width="165px"
                className="clipart_img"
              />
              <div className="clipart_text">
                <h4>Redeem</h4>
                <p>
                  Exchange Digital gold for jewelry/bars/coins at any of our
                  partnered stores or order online
                </p>
              </div>
            </Col>
            <Col>
              <img
                src="images/img3.png"
                width="185px"
                className="clipart_img"
              />
              <div className="clipart_text">
                <h4>Transparent pricing</h4>
                <p>
                  We provide fully transparent pricing based on the market with
                  additional costs
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <img
                src="images/img4.png"
                width="200px"
                className="clipart_img"
              />
              <div className="clipart_text">
                <h4>Safe</h4>
                <p>Stored in secure and fully insured vaults</p>
              </div>
            </Col>
            <Col>
              <img
                src="images/img5.png"
                width="200px"
                className="clipart_img"
              />
              <div className="clipart_text">
                <h4>Gift</h4>
                <p>Gift digital gold to your friends and family</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section
        style={{ position: "relative", backgroundColor: "rgb(254, 251, 246)" }}
      >
        <hr className="hr-left"></hr>
        <h1 className="mainTitle">
          <span>
            <b>How it works</b>
          </span>
        </h1>
        <hr className="hr-right"></hr>
        <Container>
          <Row>
            <Col>
              <Row>
                <Col>
                  <div className="tq_dg_flex">
                    <div className="tq_ico">
                      <span>1</span>
                    </div>
                    <p dir="ltr">Create an account OR login</p>
                  </div>
                </Col>
                <Col>
                  <div className="tq_dg_flex">
                    <div className="tq_ico">
                      <span>2</span>
                    </div>
                    <p dir="ltr">
                      Enter the amount of the gold in grams/rupees you wish to
                      buy
                    </p>
                  </div>
                </Col>
                <Col>
                  <div className="tq_dg_flex">
                    <div className="tq_ico">
                      <span>3</span>
                    </div>
                    <p dir="ltr">
                      Choose your payment method and confirm payment
                    </p>
                  </div>
                </Col>
                <Col>
                  <div className="tq_dg_flex">
                    <div className="tq_ico">
                      <span>4</span>
                    </div>
                    <p dir="ltr">View your gold in the digital wallet tab</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <section
        style={{ backgroundColor: "rgb(40, 38, 38)" }}
        className="footer-section"
      >
        <Row>
          <Col>
            <div className="footer_title">
              <h1>FINMET</h1>
            </div>
          </Col>
          <Col>
            <div className="site_map">
              <h4>SITE MAP</h4>
              <Nav>
                <Link to="/">Home</Link>
                <Link to="/login">Store</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">SignUP</Link>
                <Link to="/login">FAQ</Link>
                <Link to="/login">Contact US</Link>
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
                //   style="border:0;"
                allowfullscreen=""
                loading="lazy"
                //   referrerpolicy="no-referrer-when-downgrade"
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
            <Navbar.Brand style={{ fontSize: "20px" }}>
              Copyrighted 2023 FinMet{" "}
            </Navbar.Brand>
            <span>All Rights Reserved</span>
          </Col>
          <Col sm={4}>
            <div className="main_icons">
              <a className="icon_one" href="#">
                <TfiInstagram />
              </a>
              <a className="icon_two" href="#">
                <TfiFacebook />
              </a>
              <a className="icon_three" href="#">
                <TfiLinkedin />
              </a>
              <a className="icon_four" href="#">
                <TfiTwitterAlt />
              </a>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
}

export default Main;
