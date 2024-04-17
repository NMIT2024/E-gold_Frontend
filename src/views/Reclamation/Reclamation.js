import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Container } from "react-bootstrap";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./Reclamation.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import { Dropdown } from "primereact/dropdown";
import { serverURL } from "src/app/Config";
import moment from "moment";

export default function Reclamation() {
  const [customers, setCustomers] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState({});
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  const authToken = localStorage.getItem("authToken") || "";
  const headers = {
    headers: {
      "x-access-token": `${authToken}`,
    },
  };

  useEffect(() => {
    if (userInfo && userInfo[0] && userInfo[0].id) {
      fetch(`${serverURL}/reclamation/${userInfo[0].id}`, headers)
        .then((res) => res.json())
        .then((result) => {
          // Sort the data by date in ascending order
          const sortedCustomers = result.data.sort((a, b) => {
            return new Date(b.createdOn) - new Date(a.createdOn);
          });
          setCustomers(sortedCustomers);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedStatus]);

  const updateStatus = (couponId) => {
    fetch(`${serverURL}/reclamation/status/${couponId}`, headers)
      .then((res) => res.json())
      .then((result) => {
        // setCustomers(result.data);
        if (result.status == 1) {
          alert(result.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDownload = () => {
    const csvContent =
      "ID,Date,Customer Name,Mobile Number,Redemption in Grams,Value,Coupon Number,Status\n" +
      customers
        .map(
          (customer) =>
            `${customer.id},${formatDate(customer.date)},${customer.name},${
              customer.phone
            },${customer.weight},${customer.price},${customer.coupon},${
              selectedStatus[customer.id]
            }`
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "customers.csv";
    link.click();
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const date = new Date(dateString);

    if (!isNaN(date.getTime())) {
      // Check if the date is valid before formatting
      const formattedDate = date.toLocaleDateString(undefined, options);
      return formattedDate;
    } else {
      // Return an empty string or some default value if the date is invalid
      return "";
    }
  };

  const clearFilters = () => {
    setGlobalFilterValue("");
  };

 

  const header = (
    <div className="flex justify-content-between">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={(e) => setGlobalFilterValue(e.target.value)}
          placeholder="Search"
        />
      </span>
      <div style={{ position: "absolute", top: "10", right: "0" }}>
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          onClick={clearFilters}
        />
      </div>
    </div>
  );

 

  const validateCouponStatus = (input) => {
    let date1 = moment(input);
    let date2 = moment();
    let days = date2.diff(date1, "days");
    if (days < 3) {
      return false;
    } else {
      return true;
    }
  };

  const getActiveFilters = () => {
    const activeFilters = {};
    if (globalFilterValue) {
      activeFilters["name"] = {
        value: globalFilterValue,
        matchMode: "contains",
      };
      activeFilters["phone"] = {
        value: globalFilterValue,
        matchMode: "contains",
      };
      activeFilters["coupon"] = {
        value: globalFilterValue,
        matchMode: "contains",
      };
    }
    return activeFilters;
  };
  return (
    <div className="image">
      <div>
        <Container>
          <div
            className="admin_card"
            style={{
              width: "100%",
              marginTop: "50px",
              maxWidth: "1110px",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <h5
              style={{
                fontWeight: "bold",
                color: "#be943a",
                fontFamily: "Playfair Display SC",
                fontSize: "30px",
                textDecoration: "underline",
                textAlign: "center",
              }}
            >
              Coupon Data
            </h5>
            <DataTable
              value={customers}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
              globalFilter={globalFilterValue}
              globalFilterFields={["name", "phone", "coupon"]} // Include phone and coupon fields
              filters={getActiveFilters()}
              header={header}
              paginatorRight={
                <Button
                  type="button"
                  icon="pi pi-download"
                  text
                  onClick={handleDownload}
                />
              }
            >
              {/* <Column
                field="id"
                header="#"
                style={{ width: "5%", paddingTop: "30px" }}
              ></Column> */}
              <Column
                field="createdOn"
                header="Date"
                style={{ width: "15%", paddingTop: "30px" }}
                body={(rowData) => formatDate(rowData.createdOn)}
              />
              {userInfo && userInfo[0] && userInfo[0].role == "1" && (
                <Column
                  field="name"
                  header="Customer Name"
                  style={{ width: "15%", paddingTop: "30px" }}
                ></Column>
              )}
              {userInfo && userInfo[0] && userInfo[0].role == "1" && (
                <Column
                  field="phone"
                  header="Mobile Number"
                  style={{ width: "15%", paddingTop: "30px" }}
                ></Column>
              )}
              <Column
                field="weight"
                header="Redemption in Grams"
                style={{ width: "15%", paddingTop: "30px" }}
              ></Column>
              <Column
                field="price"
                header="Value"
                style={{ width: "15%", paddingTop: "30px" }}
              ></Column>
              <Column
                field="coupon"
                header="Coupon Number"
                style={{ width: "15%", paddingTop: "30px" }}
              ></Column>
              <Column
                field="status"
                header="Active/Used"
                style={{ width: "15%", paddingTop: "30px" }}
                body={(rowData) => (
                  <>
                    {userInfo && userInfo[0] && userInfo[0].role === "1" ? (
                      <>
                        {/* {validateCouponStatus(rowData.createdOn) === true ? ( */}
                        <Dropdown
                          value={rowData.status}
                          placeholder="Active"
                          options={[
                            { label: "Active", value: 1 },
                            { label: "Used", value: 0 },
                          ]}
                          disabled={
                            rowData.status === 0 ||
                            selectedStatus[rowData.id] === 0
                          }
                          onChange={(e) => {
                            setSelectedStatus({
                              ...selectedStatus,
                              [rowData.id]: e.value,
                            });
                            updateStatus(rowData.id);
                          }}
                        />
                        {/* ) : (
                          <p style={{ marginTop: "20px", color: "red" }}>
                            Processing
                          </p>
                        )} */}
                      </>
                    ) : (
                      <p style={{ marginTop: "20px" }}>
                        {/* {validateCouponStatus(rowData.createdOn) === true ? ( */}
                        <p>{rowData.status === 1 ? "Active" : "Used"}</p>
                        {/* ) : (
                          <p style={{ marginTop: "20px", color: "red" }}>
                            Processing
                          </p>
                        )} */}
                      </p>
                    )}
                  </>
                )}
              ></Column>
            </DataTable>
          </div>
        </Container>
      </div>
    </div>
  );
}
