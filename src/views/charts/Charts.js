import React from "react";
import { CCard, CCardBody, CCol, CCardHeader, CRow } from "@coreui/react";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import "./Charts.css";

const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Charts = ({ chartData, chartData1, chartData2, chartData3 }) => {
  const filterData = (value) => {
    const result = Array.from({ length: 14 }).fill(0);

    if (value === "purchase") {
      chartData.forEach((item) => {
        const index = item.month;
        const formattedAmount = parseFloat(
          item.total_purchase_amount.replace(",", "")
        );
        result[index-1] = formattedAmount;
      });
    } else if (value === "redemption") {
      chartData1.forEach((item) => {
        const index = item.month;
        const formattedAmount = parseFloat(
          item.total_quantity.replace(",", "")
        );
        result[index-1] = formattedAmount;
      });
    } else if (value === "wallets") {
      chartData2.forEach((item) => {
        const index = item.month;
        const formattedAmount = item.total_count;
        result[index-1] = formattedAmount;
      });
    } else if (value === "quantity") {
      chartData3.forEach((item) => {
        const index = item.month;
        const formattedAmount = item.total_quantity;
        result[index-1] = formattedAmount;
      });
    }

    return result;
  };

  return (
    <div className="dashboard_main">
      <div className="overlay">
        <div className="charts-container">
          <div className="chart-item">
            <CRow>
              <CCol xs={12}>
                <CCard className="mb-4 golden-border" style={{ maxWidth: '900px' }}>
                  <CCardHeader>Sales (₹)</CCardHeader>
                  <CCardBody>
                    <CChartBar
                      data={{
                        labels: monthsArray,
                        datasets: [
                          {
                            label: "sales",
                            backgroundColor: "#be943a",
                            data: filterData("purchase"),
                          },
                        ],
                      }}
                      labels="months"
                    />
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol xs={12}>
                <CCard className="mb-4 golden-border" style={{ maxWidth: '900px' }}>
                  <CCardHeader>Gold Redemption (g)</CCardHeader>
                  <CCardBody>
                    <CChartLine
                      data={{
                        labels: monthsArray,
                        datasets: [
                          {
                            label: "gold redemption",
                            backgroundColor: "rgba(151, 187, 205, 0.2)",
                            borderColor: "rgba(151, 187, 205, 1)",
                            pointBackgroundColor: "#be943a",
                            pointBorderColor: "#be943a",
                            data: filterData("redemption"),
                          },
                        ],
                      }}
                    />
                  </CCardBody>
                </CCard>
              </CCol>

              <CCol xs={12}>
                <CCard className="mb-4 golden-border" style={{ maxWidth: '900px' }}>
                  <CCardHeader>Number of Active Wallets</CCardHeader>
                  <CCardBody>
                    <CChartLine
                      data={{
                        labels: monthsArray,
                        datasets: [
                          {
                            label: "number of active wallets",
                            backgroundColor: "rgba(151, 187, 205, 0.2)",
                            borderColor: "rgba(151, 187, 205, 1)",
                            pointBackgroundColor: "#be943a",
                            pointBorderColor: "#be943a",
                            data: filterData("wallets"),
                          },
                        ],
                      }}
                    />
                  </CCardBody>
                </CCard>
              </CCol>

              <CCol xs={12}>
                <CCard className="mb-4 golden-border" style={{ maxWidth: '900px' }}>
                  <CCardHeader>Quantity Of Gold (g)</CCardHeader>
                  <CCardBody>
                    <CChartBar
                      data={{
                        labels: monthsArray,
                        datasets: [
                          {
                            label: "quantity of gold",
                            backgroundColor: "#be943a",
                            data: filterData("quantity"),
                          },
                        ],
                      }}
                      labels="months"
                    />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
