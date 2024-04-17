import { useEffect, useState } from "react";
import React from "react";
import { Tabs, Tab, Row, Col, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button"; // Make sure to include this line
import "./PurchaseTab.css";
import SelectQuantity from "./SelectQuantity";
import TransactionReview from "./TransactionReview";
import Payment from "./Payment";
import ConfirmOrder from "./ConfirmOrder";
import CheckoutForm from "../Home/CheckoutForm";


const currentGoldRate22 = 5530;
const currentGoldRate18 = 4525;
const currentGoldRate24 = 5817;
const gstValue = 0;

export default function PurchaseTab({ socket }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [selectedCarat, setCarat] = useState(currentGoldRate24);
  const [goldRate, setGoldRate] = useState(5817);
  const [totalPrice, setTotalPrice] = useState(0);
  const [averageRate, setAverageRate] = useState(0);
  const [basicInfo, setBasicInfo] = React.useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
  });
  const isQuantityProvided = quantity > 0;
  // const isBasicInfoProvided = basicInfo && basicInfo.name;
  const isBasicInfoProvided =
    basicInfo.name &&
    basicInfo.email &&
    basicInfo.address &&
    basicInfo.city &&
    basicInfo.state &&
    basicInfo.zipcode &&
    basicInfo.phone;

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
  }, [socket]);

  const areAllFieldsFilled = () => {
    // Check if all fields in basicInfo are filled
    for (const key in basicInfo) {
      if (!basicInfo[key]) {
        return false;
      }
    }
    return true;
  };

  const canMoveToNextTab = () => {
    if (currentTab === 0) {
      return isQuantityProvided;
    } else if (currentTab === 1) {
      const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneregex = /^[0-9]{10}$/;
      const nameregex = /^[a-zA-Z ]+$/;
      const cityregex = /^[a-zA-Z ]+$/;
      const stateregex = /^[a-zA-Z ]+$/;
      const zipcoderegex = /^\d{6}$/;
      if (
        nameregex.test(basicInfo.name) &&
        emailregex.test(basicInfo.email) &&
        phoneregex.test(basicInfo.phone) &&
        cityregex.test(basicInfo.city) &&
        stateregex.test(basicInfo.state) &&
        zipcoderegex.test(basicInfo.zipcode)
      ) {
        return isBasicInfoProvided;
      } else {
        return false;
      }
    } else {
      // Additional checks for other tabs if needed
      return true;
    }
  };

 

  const handleTabChange = (newTab) => {
    setTotalPrice((quantity * averageRate + gstValue).toFixed(2));
    // // newTab === 3 verify the payment is success
    if (newTab === 3) {
      setCurrentTab(newTab);
    } else {
      setCurrentTab(newTab);
    }
  };

  const getQuantity = (value, type, method = "") => {
    if (selectedCarat === 22) {
      setGoldRate(currentGoldRate22);
    } else if (selectedCarat === 18) {
      setGoldRate(currentGoldRate18);
    } else {
      setGoldRate(currentGoldRate24);
    }

    if (type) {
      // Cash mode
      let inGram = averageRate > 0 ? (value / averageRate).toFixed(2) : 0;
      setQuantity(inGram);
    } else {
      // in Gram
      setQuantity(value);
    }
  };

  return (
    <>
      <hr></hr>
      <Container style={{ paddingLeft: "10px", fontFamily: "sans-serif" }}>
        <Row>
          <Col id="crumbs">
            <Tabs activeKey={currentTab} id="tabbedItem">
              <Tab
                eventKey={0}
                title="Select Quantity"
                disabled={currentTab !== 0}
              >
                <SelectQuantity
                  changeHandler={getQuantity}
                  // selectCarat={(value) => setCarat(value)}
                  inGram={quantity}
                  // goldRate={goldRate}
                  socket={socket}
                />
              </Tab>
              <Tab
                eventKey={1}
                title="Payment Details"
                disabled={currentTab !== 1}
              >
                <Payment
                  setBasicData={(data) => setBasicInfo(data)}
                  price={100}
                />
              </Tab>
              <Tab
                eventKey={2}
                title="Transaction Review"
                disabled={currentTab !== 2}
              >
                <TransactionReview
                  quantity={quantity}
                  selectedCarat={goldRate}
                  basicInfo={basicInfo}
                  gstValue={gstValue}
                  socket={socket}
                />
              </Tab>
              <Tab
                eventKey={3}
                title="Confirm Order"
                disabled={currentTab !== 3}
              >
                {/* Render ConfirmOrder only when currentTab is 3 */}
                {currentTab === 3 && (
                  <ConfirmOrder
                    currentTab={currentTab}
                    quantity={quantity}
                    selectedCarat={selectedCarat}
                    name={basicInfo && basicInfo.name}
                  />
                )}
              </Tab>
            </Tabs>
          </Col>
        </Row>
        {/* Render Next or Confirm Order button conditionally based on currentTab */}
        <Row gap={3} direction="horizontal" className="contentForm">
          <Col>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {currentTab > 0 && currentTab !== 3 && (
                <Button
                  className={`btn-common ${
                    !canMoveToNextTab() ? "disabled" : ""
                  }`}
                  style={{ marginRight: "10px" }}
                  disabled={!canMoveToNextTab()}
                  variant="dark"
                  onClick={() => handleTabChange(currentTab - 1)}
                >
                  Prev
                </Button>
              )}
              {currentTab < 3 && currentTab !== 2 && averageRate > 0 && (
                <Button
                  className={`btn-common ${
                    !canMoveToNextTab() ? "disabled" : ""
                  }`}
                  style={{ marginLeft: "10px" }}
                  disabled={!canMoveToNextTab()}
                  variant="dark"
                  onClick={() => handleTabChange(currentTab + 1)}
                >
                  {currentTab === 2 ? "Confirm" : "Next"}
                </Button>
              )}
              {currentTab === 2 && currentTab < 3 && (
                <CheckoutForm
                  amount={totalPrice}
                  quantity={quantity}
                  handleTabChange={() => handleTabChange(currentTab + 1)}
                  socket={socket}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
