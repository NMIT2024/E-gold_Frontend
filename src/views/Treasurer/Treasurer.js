import { CCard } from "@coreui/react";
import { useEffect, useMemo, useState } from "react";
import { Form, Row, Col, Container, Button, Card } from "react-bootstrap";
import { DocsCallout } from "src/components";
import DateRangeComponent from "src/components/DateRange";
import MultiselectComponent from "src/components/MultiselectComponent";
import Table from "react-bootstrap/Table";
import "./Treasurer.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getInward,
  inwardDetail,
  postInward,
  getInwardDetails,
  getCumulativePrice,
} from "src/reducers/Inward";

function Treasurer() {
  const [panelData, setPanelData] = useState(false);
  const [result, setResult] = useState({});
  const [selectedJwLabels, setSelectedJwLabels] = useState([]);
  const [selectDateRange, setSelectDateRange] = useState("");
  const [totalgrm, setTotalGram] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [avgPriceQuantity, setavgPriceQuantity] = useState(0);

  const dispatch = useDispatch();
  const response = useSelector(inwardDetail);

  const navigate = useNavigate()
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const authRole = userInfo && userInfo[0].role;
    if (authRole != 1) {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      navigate("/404");
    }

    dispatch(getInwardDetails());
    dispatch(getInward());
    dispatch(getCumulativePrice());
  }, []);

  useMemo(() => {
    if (response && response.inwardsDetails) {
      setResult(response.inwardsDetails);
      setTotalGram(JSON.parse(response && response.totalOp));
      setTotalPrice(
        response &&
          response.cumulativePrice &&
          response.cumulativePrice[0]?.total_price
      );
      setavgPriceQuantity(
        (response &&
          response.cumulativePrice &&
          response.cumulativePrice[0]?.average_price_per_quantity) ||
          0
      );
    }
  }, [response]);

  const searchPosition = () => {
    setPanelData(true);
    const navigate = useNavigate();
  };

  const slectedJeweller = (data) => {
    const selectJw = [];
    data &&
      data.length > 0 &&
      data.map((item) => {
        selectJw.push(item.label);
      });
    setSelectedJwLabels(selectJw);
  };

  const saveInward = () => {
    const inwardData = {
      openPosition: totalgrm ? totalgrm.toFixed(2) : 0,
      pricePerGram: perGram,
      jewellerPrice: jwPrice,
      coveredPosition: coverdQt,
    };

    // Dispatch action to save inward data
    dispatch(postInward(inwardData));
  };

  return (
    <>
      <div className="image">
        <Container className="TreasurerContainer">
          <Row>
            <Col className="rate_cards">
              $1940.0
              <br />
              <span style={{ color: " #be943a" }}>XAU Rate</span>
            </Col>
            <Col className="rate_cards">
              ₹58549
              <br />
              <span style={{ color: " #be943a" }}>GOLD INR</span>
            </Col>
            <Col className="rate_cards">
              ₹58549
              <br />
              <span style={{ color: " #be943a" }}>MCX GOLD</span>
            </Col>
            <Col className="rate_cards">
              ₹81.95
              <br />
              <span style={{ color: " #be943a" }}>USD/INR</span>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <p>Cumulative Open Position</p>
              <Row xs="auto">
                <Col>
                  {" "}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    {/* <Form.Control type="email" placeholder="grams" >                     
                    {totalgrm ? totalgrm.toFixed(2) : 0} grm
                      </Form.Control>  */}
                    <Form.Control
                      type="text"
                      placeholder="grams"
                      readOnly
                      value={totalgrm ? totalgrm.toFixed(2) : 0}
                    />
                  </Form.Group>
                </Col>
                <Col style={{ fontSize: "25px" }}>@</Col>
                <Col>
                  {" "}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="₹ per grams"
                      readOnly
                      value={(totalPrice/totalgrm).toFixed(2)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="dark" className="inward_button">
                <Link to="/e-gold/inward-form">Go to inward form</Link>
              </Button>
            </Col>

            <Col>
              <div className="rate_list">
                <p>
                  <b>Total inward trade for the day:</b>
                  <br />
                  Quantity: {result && result.netInward}
                  <br />
                  Rate: {result && result.netInwardPrice}
                </p>
              </div>
              <div className="rate_list">
                <p>
                  <b>Total sales for the day:</b>
                  <br />
                  Quantity: {result && result.netPurchaseQuantity}
                  <br />
                  Rate: {result && result.netPurchasePrice}
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
          {panelData && (
            <Row className="selectionData">
              <h4 className="positionData">
                Jeweller(s):{" "}
                <span style={{ color: "green" }}>
                  {selectedJwLabels &&
                    selectedJwLabels.length > 0 &&
                    selectedJwLabels.join(",")}
                </span>
              </h4>
              <h4 className="positionData">
                Date Range:{" "}
                <span style={{ color: "green" }}>{selectDateRange}</span>
              </h4>
              <h4 className="positionData">
                Open Position: <span style={{ color: "green" }}>18g</span>
              </h4>
            </Row>
          )}
        </Container>
      </div>
    </>
  );
}

export default Treasurer;
