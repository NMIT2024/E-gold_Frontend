import React, { useEffect, useState, createRef } from "react";
import { CButton, CCol, CCard, CCardHeader, CCardBody } from "@coreui/react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Colors = () => {
  const [searchinput, setsearchinput] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const [id, setId] = useState();
  const [idFromButtonClick, setidFromButtonClick] = useState();

  const handleClick = () => {
    setidFromButtonClick(id);
  };

  const getEmployee = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        let result = data.find((item) => item.id === parseInt(searchinput));
        setUserInfo(result);
      });
  };
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Customer</CCardHeader>
        <CCardBody>
          <div style={{ width: "400px", display: "inline-flex" }}>
            <Form.Control
              type="text"
              placeholder="Search EmpID"
              onChange={(e) => setsearchinput(e.target.value)}
            />
            &nbsp;&nbsp;
            <CButton color="primary" className="px-3" onClick={getEmployee}>
              Search
            </CButton>
          </div>
        </CCardBody>
      </CCard>
      {userInfo && userInfo.address && (
        <div style={{ background: "white", padding: "15px" }}>
          <h5>Name:{userInfo.name}</h5>
          <h5>Email:{userInfo.email}</h5>
          <h5>City:{userInfo.address.city}</h5>
          <h5>PinCode:{userInfo.address.zipcode}</h5>
        </div>
      )}
    </>
  );
};

export default Colors;
