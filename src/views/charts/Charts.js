import React, { useState } from "react";
import { CCard, CCardBody, CCol, CCardHeader, CRow } from "@coreui/react";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import "./Charts.css";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-cyan/theme.css";

const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Charts = ({ chartData, chartData1, chartData2, chartData3 }) => {
  const [selectedYear, setSelectedYear] = useState({
    name: "2023",
    code: "23",
  });
  const [selectedWeek, setSelectedWeek] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const filterData = (value) => {
    const result = Array.from({ length: 14 }).fill(0);

    if (value === "purchase") {
      chartData.forEach((item) => {
        const index = item.month;
        const formattedAmount = parseFloat(
          item.total_purchase_amount.replace(",", "")
        );
        result[index - 1] = formattedAmount;
      });
    } else if (value === "redemption") {
      chartData1.forEach((item) => {
        const index = item.month;
        const formattedAmount = parseFloat(
          item.total_quantity.replace(",", "")
        );
        result[index - 1] = formattedAmount;
      });
    } else if (value === "wallets") {
      chartData2.forEach((item) => {
        const index = item.month;
        const formattedAmount = item.total_count;
        result[index - 1] = formattedAmount;
      });
    } else if (value === "quantity") {
      chartData3.forEach((item) => {
        const index = item.month;
        const formattedAmount = item.total_quantity;
        result[index - 1] = formattedAmount;
      });
    }

    return result;
  };

  const years = [
    { name: "2024", code: "24" },
    { name: "2023", code: "23" },
    { name: "2022", code: "22" },
    { name: "2021", code: "21" },
    { name: "2020", code: "20" },
  ];

  const week = [
    { name: "week 1", code: "1" },
    { name: "week 2", code: "2" },
    { name: "week 3", code: "3" },
    { name: "week 4", code: "4" },
    { name: "week 5", code: "5" },
  ];
  const months = [
    { name: "January", code: "Jan" },
    { name: "February", code: "Feb" },
    { name: "March", code: "Mar" },
    { name: "April", code: "Apr" },
    { name: "May", code: "May" },
    { name: "June", code: "Jun" },
    { name: "July", code: "Jul" },
    { name: "August", code: "Aug" },
    { name: "September", code: "Sep" },
    { name: "October", code: "Oct" },
    { name: "November", code: "Nov" },
    { name: "December", code: "Dec" },
  ];

  return (
    <div className="dashboard_main">
      <div className="overlay">
        <div className="charts-container">
          <div className="chart-item">
            <div className="dropdown">
            <Dropdown
              value={selectedYear}
              // onChange={(e) => setSelectedYear(e.value)}
              options={years}
              optionLabel="name"
              placeholder="Year"
              className="w-full md:w-14rem custom-dropdown" // Add custom class
            />{" "}
            <Dropdown
              value={selectedWeek}
              // onChange={(e) => setSelectedWeek(e.value)}
              options={week}
              optionLabel="name"
              placeholder="week"
              className="w-full md:w-14rem custom-dropdown" // Add custom class
            />{" "}
            <Dropdown
              value={selectedMonth}
              // onChange={(e) => setSelectedMonth(e.value)}
              options={months}
              optionLabel="name"
              placeholder="month"
              className="w-full md:w-14rem custom-dropdown" // Add custom class
            />
            </div>
            <CRow>
              <CCol xs={12}>
                <CCard
                  className="mb-4 golden-border"
                  style={{ maxWidth: "900px",marginTop:'20px' }}
                >
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
                <CCard
                  className="mb-4 golden-border"
                  style={{ maxWidth: "900px" }}
                >
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
                <CCard
                  className="mb-4 golden-border"
                  style={{ maxWidth: "900px" }}
                >
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
                <CCard
                  className="mb-4 golden-border"
                  style={{ maxWidth: "900px" }}
                >
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
