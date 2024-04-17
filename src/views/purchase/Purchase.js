import React from "react";
import PurchaseTab from "../paymentNavbar/PurchaseTab";
import { CCard, CCardBody, CCardGroup, CCol, CForm, CRow } from "@coreui/react";
import "./Purchase.css";

function purchase({socket}) {
  return (
    <>
      <div className="main_bg">
        <div className="overlay">
          <CRow
            className="justify-content-center"
            style={{ width: "fit-content", backgroundColor: "pink" }}
          >
            <CCol>
              <CCardGroup className="main_card1">
                <CCard
                  className=""
                  style={{ border: "none", background: "none" }}
                >
                  <CCardBody>
                    <div
                      style={{
                        background: "white",
                        padding: "42px",
                        border: "solid 1px #cfb53b",
                        fontFamily: "Nanum Myeongjo",
                      }}
                    >
                      <h3
                        style={{
                          fontWeight: "bold",
                          color: "#be943a",
                          paddingLeft: "25px",
                          fontFamily: "Playfair Display SC",
                        }}
                      >
                        BUY GOLD
                      </h3>
                      <PurchaseTab socket={socket}/>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </div>
      </div>
    </>
  );
}

export default purchase;
