import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "./ConfirmOrder.css";

function TransactionReview(props) {
  const [averageRate, setAverageRate] = useState(0);

  useEffect(() => {
    props.socket.emit("getGoldRate", {
      data: {},
      name: "goldRate",
      id: `${props.socket.id}${Math.random()}`,
      socketID: props.socket.id,
    });
    
    props.socket.on("getGoldResponse", (result) => {
      setAverageRate(result.rate);
    });
  }, [props.socket]);

  useEffect(() => {
    localStorage.setItem("quantity", props.quantity);
  }, [props]);

  return (
    <div className="contentForm">
      <Container>
        <Row>
          <Col>
            <Table style={{ textAlign: "left" }}>
              <thead>
                <tr>
                  <th className="tableTitle">
                    <strong>Buying Details</strong>
                  </th>
                  <th className="tableTitle">
                    <strong>Price valid for</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Transaction ID</td>
                  <td>DIG-{Math.floor(100000 + Math.random() * 900000)}</td>
                </tr>
                <tr>
                  <td>
                    Gold Weight(g)
                    <hr />
                  </td>
                  <td>
                    {props.quantity} g
                    <hr />
                  </td>
                </tr>
                <tr>
                  <td>Gold Buy rate(per g)</td>
                  <td>
                    {averageRate.toFixed(2)}
                    {/* {props.averageRate} */}/ g
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Digital gold Value(Rs.)</strong>
                    <hr />
                  </td>
                  <td>
                    <strong>
                      {averageRate.toFixed(2)}
                      {/* {props.selectedCarat}  */}/ g
                    </strong>
                    <hr />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Purchase Amount</strong>
                  </td>
                  <td>
                    <strong>
                      {(props.quantity * averageRate + props.gstValue).toFixed(
                        2
                      )}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </Table>
            <hr />
          </Col>
          <Col>
            <div style={{ textAlign: "left" }}>
              <h6 className="tableTitle" style={{ padding: "10px" }}>
                Billing Information
              </h6>
              <div className="basicInfo">
                <label>
                  <strong>Full Name:</strong> {props.basicInfo.name}{" "}
                </label>
                <br />
                <label>
                  <strong>Mobile Number:</strong> {props.basicInfo.phone}{" "}
                </label>
                <br />
                <label>
                  <strong>Address:</strong> {props.basicInfo.address} &nbsp;
                  {props.basicInfo.city}&nbsp;{props.basicInfo.state} &nbsp;
                  {props.basicInfo.zipcode}
                </label>
                <br />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TransactionReview;
