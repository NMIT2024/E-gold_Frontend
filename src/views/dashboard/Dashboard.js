import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./Dashboard.css";
import { CCol } from "@coreui/react";
import Charts from "../charts/Charts";
import { useDispatch, useSelector } from "react-redux";
import { getGraphData, userData } from "src/reducers/Auth";
import { Col, Row } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Dashboard = ({ socket }) => {
  const [hour, setHour] = useState(null);
  const [salesCountArray, setSalesCountArray] = useState([]);
  const [couponCountArray, setCouponCountArray] = useState([]);
  const [walletCountArray, setWalletCountArray] = useState([]);
  const [quantityListArray, setQuantityArray] = useState([]);
  const [monthlyReport, setMontlyReport] = useState([]);
  const [monthlyRedemptionReport, setMonthlyRedemptionReport] = useState([]);
  const [monthlyWalletReport, setMonthlyWalletReport] = useState([]);
  const [monthlyqunatityReport, setMonthlyqunatityReport] = useState([]);
  const [goldCeiling, setGoldCeiling] = useState(0);
  const [goldFloor, setGoldFloor] = useState(0);
  const [goldRate, setGoldRate] = useState(0);

  const dispatch = useDispatch();
  const response = useSelector(userData);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("getGoldRate", {
      data: {},
      name: "goldRate",
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });

    socket.on("getGoldResponse", (result) => {
      setGoldRate(result.rate);
    });

    socket.on("goldResponse", (result) => {
      setGoldFloor(result.floor);
      setGoldCeiling(result.ceilng);
    });
  }, [socket]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const authRole = userInfo && userInfo[0].role;
    if (authRole != 1) {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      navigate("/404");
    }
    const date = new Date();
    const hours = date.getHours();
    setHour(hours);
    dispatch(getGraphData());
  }, []);

  useEffect(() => {
    if (
      response &&
      response.graphData &&
      response.graphData.weeklySalesCount &&
      response.graphData.weeklySalesCount.length > 0
    ) {
      const weeklyData = response.graphData.weeklySalesCount;
      const couponData = response.graphData.weeklyCoupon;
      const walletData = response.graphData.weeklyWallet;
      const purchaseQuantity = response.graphData.weeklyPurchase;
      setMontlyReport(response.graphData.monthlyPurchase);
      setMonthlyRedemptionReport(response.graphData.monthlyRedemption);
      setMonthlyWalletReport(response.graphData.monthlyWallet);
      setMonthlyqunatityReport(response.graphData.monthlyQuantity);
      let daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      let countArray = Array(daysOfWeek.length).fill(0);
      let couponArray = Array(daysOfWeek.length).fill(0);
      let walletArray = Array(daysOfWeek.length).fill(0);
      let quantityArray = Array(daysOfWeek.length).fill(0);

      weeklyData.forEach((item) => {
        let dayIndex = new Date(item.createdAt).getDay();
        countArray[dayIndex] += item.count;
      });

      couponData.forEach((item) => {
        let dayIndex = new Date(item.createdAt).getDay();
        couponArray[dayIndex] += item.count;
      });

      walletData.forEach((item) => {
        let dayIndex = new Date(item.createdAt).getDay();
        walletArray[dayIndex] += item.count;
      });

      purchaseQuantity.forEach((item) => {
        let dayIndex = new Date(item.createdAt).getDay();
        quantityArray[dayIndex] += item.quantity;
      });
      setWalletCountArray(walletArray);
      setCouponCountArray(couponArray);
      setSalesCountArray(countArray);
      setQuantityArray(quantityArray);
    }
  }, [response]);

  const handleGenerate = () => {
    const minRate = parseFloat(goldFloor);
    const maxRate = parseFloat(goldCeiling);
    let newRate = Math.random() * (maxRate - minRate) + minRate;

    if (minRate > maxRate) {
      alert("Floor value cannot be higher than ceiling value");
    } else {
      let data = { rate: newRate, ceilng: maxRate, floor: minRate };
      socket.emit("generateGoldRate", {
        data: data,
        name: "goldRate",
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });

      toast.success(`New rate generated`);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="dashboard_main" style={{ position: "relative" }}>
        <h2
          style={{
            fontFamily: "'Playfair', serif",
            color: "#be943a",
            width: "fit-content",
            padding: "10px",
            textAlign: "center",
          }}
        >
          {hour < 12 ? "Good morning " : "Good evening "}{" "}
          {response && response.user[0] ? response.user[0].name : "finmet"},
        </h2>
        <Row>
          <Col>
            <h3 style={{ margin: "10px" }}>Daily Basis & Weekly Basis</h3>
          </Col>
          {goldRate !== null && (
            <Col>
              <h3 style={{ margin: "10px", paddingLeft: "80px" }}>
                Gold Rate: {goldRate && goldRate.toFixed(2)}
              </h3>
            </Col>
          )}
        </Row>
        <Row>
          <Col>
            <div className="table-responsive-sm">
              <table
                className="table table-striped"
                style={{ border: "1px solid #be943a", marginLeft: "10px" }}
              >
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    {daysOfWeek.map((day, idx) => {
                      return (
                        <th scope="col" key={idx}>
                          {day}
                        </th>
                      );
                    })}
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Number Of Sales</td>
                    {salesCountArray &&
                      salesCountArray.length > 0 &&
                      salesCountArray.map((item, idx) => {
                        return <td key={idx}>{item}</td>;
                      })}
                    <td>{salesCountArray.reduce((sum, a) => sum + a, 0)}</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Gold Redemption</td>
                    {couponCountArray &&
                      couponCountArray.length > 0 &&
                      couponCountArray.map((item, idx) => {
                        return <td key={idx}>{item}</td>;
                      })}
                    <td>{couponCountArray.reduce((sum, a) => sum + a, 0)}</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Number Of Active Wallets</td>
                    {walletCountArray &&
                      walletCountArray.length > 0 &&
                      walletCountArray.map((item, idx) => {
                        return <td key={idx}>{item}</td>;
                      })}
                    <td>{walletCountArray.reduce((sum, a) => sum + a, 0)}</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>Quantity Of Gold</td>
                    {quantityListArray &&
                      quantityListArray.length > 0 &&
                      quantityListArray.map((item, idx) => {
                        return <td key={idx}>{item.toFixed(2)}</td>;
                      })}
                    <td>{quantityListArray.reduce((sum, a) => sum + a, 0)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
          <Col>
            <div className="dashboard_card">
              <Row></Row>
              <Row>
                <Col>
                  <h5>Gold Rate Ceilng</h5>
                </Col>
                <Col>
                  <InputText
                    type="number"
                    style={{ height: "40px" }}
                    className="p-inputtext-sm"
                    placeholder="0.00"
                    value={goldCeiling}
                    onChange={(e) => setGoldCeiling(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5 style={{ marginTop: "10px" }}>Gold Rate Floor</h5>
                </Col>
                <Col>
                  <InputText
                    type="number"
                    style={{ height: "40px", marginTop: "10px" }}
                    className="p-inputtext-sm"
                    placeholder="0.00"
                    value={goldFloor}
                    onChange={(e) => setGoldFloor(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <CCol xs={12} style={{ textAlign: "center" }}>
                  <div>
                    <Button
                      onClick={handleGenerate}
                      variant="dark"
                      style={{
                        fontSize: "1rem",
                        padding: "0.5rem",
                        width: "50%",
                        marginTop: "15px",
                      }}
                    >
                      <b>Generate </b>
                    </Button>
                  </div>
                </CCol>
              </Row>
            </div>
          </Col>
        </Row>
        <Charts
          chartData={monthlyReport}
          chartData1={monthlyRedemptionReport}
          chartData2={monthlyWalletReport}
          chartData3={monthlyqunatityReport}
        />
      </div>
    </>
  );
};

export default Dashboard;
