import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { useSelector } from "react-redux";
import { userData } from "src/reducers/Auth";
import { serverURL } from "src/app/Config";
import Moment from "moment";
import "./wallet.css";
import "primereact/resources/themes/saga-blue/theme.css"; // Import PrimeReact theme
import "primereact/resources/primereact.min.css"; // Import PrimeReact styles

const Wallet = () => {
  const response = useSelector(userData);
  const [result, setResult] = useState([]);
  const [couponResult, setCouponResult] = useState([]);
  const [purchaseCurrentPage, setPurchaseCurrentPage] = useState(1);
  const [redeemCurrentPage, setRedeemCurrentPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed

  const authToken = localStorage.getItem("authToken") || "";
  const headers = {
    headers: {
      "x-access-token": `${authToken}`,
    },
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo && userInfo[0] && userInfo[0].id) {
      fetch(`${serverURL}/purchase`, headers)
        .then((res) => res.json())
        .then((data) => {
          setResult(data.result);
        })
        .catch((error) => {
          console.log(error);
        });

      fetch(`${serverURL}/redemption/fetchCoupon/${userInfo[0].id}`, headers)
        .then((res) => res.json())
        .then((data) => {
          setCouponResult(data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const totalgrm = result?.[0]?.totalquantity;

  // const prices = result.map((product) => product.quantity);
  // const totalgrm =
  //   prices && prices.length > 0
  //     ? prices.reduce((acc, curr) => parseFloat(acc) + parseFloat(curr))
  //     : 0;

  // Pagination

  const purchaseIndexOfLastItem = purchaseCurrentPage * itemsPerPage;
  const purchaseIndexOfFirstItem = purchaseIndexOfLastItem - itemsPerPage;
  const purchaseCurrentItems =
    result && result.slice(purchaseIndexOfFirstItem, purchaseIndexOfLastItem);

  const redeemIndexOfLastItem = redeemCurrentPage * itemsPerPage;
  const redeemIndexOfFirstItem = redeemIndexOfLastItem - itemsPerPage;
  const redeemCurrentItems =
    couponResult &&
    couponResult.slice(redeemIndexOfFirstItem, redeemIndexOfLastItem);

  const purchasePaginate = (e) => setPurchaseCurrentPage(e.page + 1);
  const redeemPaginate = (e) => setRedeemCurrentPage(e.page + 1);

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = result.slice(indexOfFirstItem, indexOfLastItem);

  // const paginate = (e) => setCurrentPage(e.page + 1);

  return (
    <div className="image">
      <Container className="my-wallet">
        <Row>
          <h5>My Wallet</h5>
        </Row>
        <Row>
          <Col xs={4}>
            <div>
              <div style={{ textAlign: "center" }}>
                <img
                  src="https://cdn4.iconfinder.com/data/icons/avatars-63/33/female_4-1024.png"
                  width={"200px"}
                />
              </div>
              <hr></hr>
              <div
                style={{
                  padding: "10px",
                  textAlign: "center",
                  fontFamily: "sans-serif",
                  background: "white",
                  lineHeight: "25px",
                  borderRadius: "12px",
                  marginBottom: "12px",
                }}
              >
                <h2>
                  {response && response.user[0]
                    ? response.user[0].name
                    : "Finmet"}
                </h2>
                <p className="myGold">
                  My Gold : {totalgrm ? totalgrm.toFixed(2) : 0} grm
                </p>
                <hr />
                <h4>Contact Details</h4>
                <h6>
                  Phone Number:{" "}
                  <b>
                    +91-
                    {response && response.user[0]
                      ? response.user[0].phone
                      : "9844034554"}
                  </b>
                </h6>
              </div>
            </div>
          </Col>
          <Col xs={8}>
            <hr></hr>

            {/* Transaction History */}
            <div style={{ fontFamily: "sans-serif" }}>
              <h4>Transaction History</h4>
              <DataTable
                value={purchaseCurrentItems}
                emptyMessage="No transactions found"
              >
                <Column
                  style={{ borderBottom: "1px solid #ddd" }}
                  field="createdOn"
                  header="Date"
                  body={(rowData) =>
                    Moment(rowData.createdOn).format("MMMM Do YYYY, h:mm a")
                  }
                />
                <Column
                  style={{ borderBottom: "1px solid #ddd" }}
                  field="transId"
                  header="Receipt No"
                />
                <Column
                  style={{ borderBottom: "1px solid #ddd" }}
                  field="quantity"
                  header="Quantity (grm)"
                />
              </DataTable>
              <Paginator
                first={(purchaseCurrentPage - 1) * itemsPerPage}
                rows={itemsPerPage}
                totalRecords={result && result.length}
                onPageChange={purchasePaginate}
              />
            </div>
            <hr></hr>

            {/* Coupon History */}
            <div style={{ fontFamily: "sans-serif" }}>
              <h4>Redeem History</h4>
              <DataTable
                value={redeemCurrentItems}
                emptyMessage="No Redeem history found"
              >
                <Column
                  style={{ borderBottom: "1px solid #ddd" }}
                  field="createdOn"
                  header="Date"
                  body={(rowData) =>
                    Moment(rowData.createdOn).format("MMMM Do YYYY, h:mm a")
                  }
                />
                <Column
                  style={{ borderBottom: "1px solid #ddd" }}
                  field="weight"
                  header="Quantity (grm)"
                />
                <Column
                  style={{ borderBottom: "1px solid #ddd" }}
                  field="price"
                  header="Value"
                />
                <Column
                  style={{ borderBottom: "1px solid #ddd" }}
                  field="coupon"
                  header="Coupon Number"
                />
              </DataTable>
              <Paginator
                first={(redeemCurrentPage - 1) * itemsPerPage}
                rows={itemsPerPage}
                totalRecords={couponResult && couponResult.length}
                onPageChange={redeemPaginate}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Wallet;
