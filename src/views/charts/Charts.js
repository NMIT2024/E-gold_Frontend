import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CCardHeader, CRow } from "@coreui/react";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import "./Charts.css";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { getGraphData } from "src/reducers/Auth";
import { useDispatch } from "react-redux";

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

const weekArray = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

const Charts = ({ chartData, chartData1, chartData2, chartData3 }) => {
  const [selectedYear, setSelectedYear] = useState();
  const [selectedWeek, setSelectedWeek] = useState();
  const [selectedMonth, setSelectedMonth] = useState();

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    const years = [];
    for (let i = 0; i < 5; i++) {
      years.push({ name: currentYear - i, code: currentYear - i });
    }
    setSelectedYear(years);
  }, []);

  const filterData = (value) => {
    const result = Array.from({ length: 14 }).fill(0);

    if (value === "purchase") {
      chartData.forEach((item) => {
        const index = item.month;
        let formattedAmount;
        if (item.total_purchase_amount.indexOf(",") !== -1) {
          formattedAmount = parseFloat(
            item.total_purchase_amount.replace(",", "")
          );
        } else {
          formattedAmount = parseFloat(item.total_purchase_amount);
        }
        result[index - 1] = formattedAmount;
      });
    } else if (value === "redemption") {
      chartData1.forEach((item) => {
        const index = item.month;
        let formattedAmount;
        if (item.total_quantity.indexOf(",") !== -1) {
          formattedAmount = parseFloat(
            item.total_quantity.replace(",", "")
          );
        } else {
          formattedAmount = parseFloat(
            item.total_quantity
          );
        }
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

  // const filterData = (value) => {
  //   const result = Array.from({ length: 14 }).fill(0);

  //   if (value === "purchase") {
  //     chartData.forEach((item) => {
  //       const index = item.month;
  //       const formattedAmount = parseFloat(
  //         item.total_purchase_amount.replace(",", "")
  //       );
  //       result[index - 1] = formattedAmount;
  //     });
  //   } else if (value === "redemption") {
  //     chartData1.forEach((item) => {
  //       const index = item.month;
  //       const formattedAmount = parseFloat(
  //         item.total_quantity ? item.total_quantity.replace(",", "") : 0
  //       );
  //       result[index - 1] = formattedAmount;
  //     });
  //   } else if (value === "wallets") {
  //     chartData2.forEach((item) => {
  //       const index = item.month;
  //       const formattedAmount = item.total_count;
  //       result[index - 1] = formattedAmount;
  //     });
  //   } else if (value === "quantity") {
  //     chartData3.forEach((item) => {
  //       const index = item.month;
  //       const formattedAmount = item.total_quantity;
  //       result[index - 1] = formattedAmount;
  //     });
  //   }

  //   return result;
  // };

  const week = [
    { name: "week 1", code: "1" },
    { name: "week 2", code: "2" },
    { name: "week 3", code: "3" },
    { name: "week 4", code: "4" },
    { name: "week 5", code: "5" },
  ];
  const months = [
    { name: "All", code: "all" },
    { name: "January", code: 1 },
    { name: "February", code: 2 },
    { name: "March", code: 3 },
    { name: "April", code: 4 },
    { name: "May", code: 5 },
    { name: "June", code: 6 },
    { name: "July", code: 7 },
    { name: "August", code: 8 },
    { name: "September", code: 9 },
    { name: "October", code: 10 },
    { name: "November", code: 11 },
    { name: "December", code: 12 },
  ];
  const dispatch = useDispatch();

  const fetchGraphData = (e) => {
    setSelectedMonth(e.value);
    dispatch(getGraphData({ input: e.value.code }));
  };

  console.log(selectedMonth);
  return (
    <div className="dashboard_main">
      <div className="overlay">
        <div className="charts-container">
          <div className="chart-item">
            <div className="dropdown">
              <Dropdown
                value={selectedYear && selectedYear[0]}
                // onChange={(e) => setSelectedYear(e.value)}
                options={selectedYear}
                optionLabel="name"
                placeholder="Year"
                className="w-full md:w-14rem custom-dropdown" // Add custom class
              />{" "}
              <Dropdown
                value={selectedMonth}
                onChange={(e) => fetchGraphData(e)}
                options={months}
                optionLabel="name"
                placeholder="Month"
                className="w-full md:w-14rem custom-dropdown" // Add custom class
              />
            </div>
            <CRow>
              <CCol xs={12}>
                <CCard
                  className="mb-4 golden-border"
                  style={{ maxWidth: "900px", marginTop: "20px" }}
                >
                  <CCardHeader>Sales (₹)</CCardHeader>
                  <CCardBody>
                    <CChartBar
                      data={{
                        labels:
                          selectedMonth && selectedMonth?.code !== "all"
                            ? weekArray
                            : monthsArray,
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
                        labels:
                          selectedMonth && selectedMonth?.code !== "all"
                            ? weekArray
                            : monthsArray,
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
                        labels:
                          selectedMonth && selectedMonth?.code !== "all"
                            ? weekArray
                            : monthsArray,
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
                        labels:
                          selectedMonth && selectedMonth?.code !== "all"
                            ? weekArray
                            : monthsArray,
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
