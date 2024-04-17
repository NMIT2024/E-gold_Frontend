import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./SelectQuantity.css";
import InputGroup from "react-bootstrap/InputGroup";

const DEFAULTTIME = 60;

function SelectQuantity({ changeHandler, inGram, socket }) {
  const [isCash, setCash] = useState(true);
  const [priceValue, setPriceValue] = useState(null);
  const [timer, setTimer] = useState(DEFAULTTIME);
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
    progress(DEFAULTTIME, DEFAULTTIME);
  }, []);

  const handleQuickTab = (value) => {
    if (value) {
      setPriceValue(value);
      changeHandler(value, isCash);
    }
  };

  const progress = (timeleft, timetotal) => {
    if (timeleft > 0) {
      setTimer(timeleft);
      setTimeout(function () {
        progress(timeleft - 1, timetotal);
      }, 1000);
    }
  };

  return (
    <div className="contentForm">
      <Row style={{ marginLeft: "40px" }}>
        <Col>
          <Form>
            {["radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  className="custom-checkbox"
                  style={{ fontWeight: "bold", paddingLeft: "25px" }}
                  inline
                  label="Buy in Rupees"
                  name="group1"
                  type={type}
                  defaultChecked={true}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCash(true);
                      setPriceValue(""); // Clear the value when switching to Rupees
                      changeHandler("", true); // Pass an empty string to the changeHandler when switching to Rupees
                    }
                  }}
                />

                <Form.Check
                  className="custom-checkbox"
                  style={{ fontWeight: "bold", paddingLeft: "50px" }}
                  inline
                  label="Buy in Grams"
                  name="group1"
                  type={type}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCash(false);
                      setPriceValue(""); // Clear the value when switching to Grams
                      changeHandler("", false); // Pass an empty string to the changeHandler when switching to Grams
                    }
                  }}
                />
              </div>
            ))}
          </Form>

          <InputGroup
            className="mb-3"
            style={{
              margin: "1px",
              width: "80%",
              height: "50px",
            }}
          >
            <InputGroup.Text
              style={{ backgroundColor: "white", color: "#be943a" }}
            >
              {isCash && (
                <span
                  style={{
                    color: "#be943a",
                    fontSize: "14px",
                    fontWeight: "bolder",
                  }}
                >
                  {inGram > 0 ? ` ₹ ` : "₹"}
                  {""}
                </span>
              )}
              {!isCash && (
                <span
                  style={{
                    color: "#be943a",
                    fontSize: "14px",
                    fontWeight: "bolder",
                  }}
                >
                  {inGram > 0 ? ` g ` : "g"}
                  {""}
                </span>
              )}
            </InputGroup.Text>
            <Form.Control
              aria-label="Amount (to the nearest dollar)"
              placeholder="0.00"
              type="text"
              name="title"
              value={priceValue}
              onChange={(e) => {
                setPriceValue(e.target.value);
                changeHandler(e.target.value, isCash);
              }}
            />
            <InputGroup.Text
              style={{ backgroundColor: "white", color: "#be943a" }}
            >
              {isCash && (
                <span
                  style={{
                    color: "#be943a",
                    fontSize: "14px",
                    fontWeight: "bolder",
                  }}
                >
                  {inGram > 0 ? ` ${inGram} g ` : "0.00g"}
                  {""}
                </span>
              )}
              {!isCash && (
                <span
                  style={{
                    color: "#be943a",
                    fontSize: "14px",
                    fontWeight: "bolder",
                  }}
                >
                  {inGram > 0
                    ? `₹ ${inGram * averageRate.toFixed(2)}`
                    : "₹ 0.00"}{" "}
                </span>
              )}
            </InputGroup.Text>
          </InputGroup>

          <Row className="mb-3" style={{ display: "flex" }}>
            <div>
              {/* Update button labels based on isCash */}
              <Button
                type="button"
                variant="outline-secondary"
                className="main_btn"
                style={{ border: "solid 1px #be943a", fontSize: "17px" }}
                onClick={() => handleQuickTab(isCash ? 500 : 0.5)}
              >
                {isCash ? "+ 500" : "+ 0.5g"}
              </Button>
              <Button
                type="button"
                variant="outline-secondary"
                className="main_btn"
                style={{ border: "solid 1px #be943a", fontSize: "17px" }}
                onClick={() => handleQuickTab(isCash ? 1000 : 1)}
              >
                {isCash ? "+ 1000" : "+ 1g"}
              </Button>
              <Button
                type="button"
                variant="outline-secondary"
                className="main_btn"
                style={{ border: "solid 1px #be943a", fontSize: "17px" }}
                onClick={() => handleQuickTab(isCash ? 2000 : 2)}
              >
                {isCash ? "+ 2000" : "+ 2g"}
              </Button>
              <Button
                variant="outline-secondary"
                className="main_btn"
                type="button"
                style={{ border: "solid 1px #be943a", fontSize: "17px" }}
                onClick={() => handleQuickTab(isCash ? 5000 : 5)}
              >
                {isCash ? "+ 5000" : "+ 5g"}
              </Button>
            </div>
          </Row>
        </Col>

        <Col>
          <div className="purchase_card">
            <Row>
              <Col>
                <h5 style={{ width: "300px" }}>
                  <span style={{ color: "#be943a" }}>24K Pure</span>{" "}
                  <span>Digital Gold Rate</span>{" "}
                </h5>
              </Col>
            </Row>
            <h2>Gold Rate ₹{averageRate && averageRate.toFixed(2)}/g </h2>
            <h6 style={{ color: "grey" }}>Excluding 3 % GST</h6>
            <h6 style={{ color: "#be943a" }}>Gold Purity : 24K (99.5%)</h6>
          </div>
        </Col>
      </Row>

      <br />
    </div>
  );
}

export default SelectQuantity;
