import React, { useState, useRef, useMemo, useEffect } from "react";
import { Form, Row, Col as CCol, Container, Button } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import { cilCloudDownload, cilPrint } from "@coreui/icons";
import ReactToPrint from "react-to-print";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTable,
  CTableDataCell,
} from "@coreui/react";
import DateRangeComponent from "src/components/DateRange";
import "../Treasurer.css";
import "./TreasurerReport.css";
import generatePDF, { Margin } from "react-to-pdf"; //for pdf download
import { getInwardByDate, inwardDetail } from "src/reducers/Inward";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TreasurerReport() {
  const [selectedJwLabels, setSelectedJwLabels] = useState([]);
  const [selectDateRange, setSelectDateRange] = useState("");
  const [totalgrm, setTotalGram] = useState(0);
  const [tableResponse, setTableResponse] = useState([]);
  const [totalInward, setTotalInward] = useState(0);
  const [openPosition, setOpenPosition] = useState(0);

  //for printing
  const componentRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Replace `useHistory` with `useNavigate`

  //for downloading in pdf
  const targetRef = useRef();

  const response = useSelector(inwardDetail);

  useMemo(() => {
    setTableResponse(response && response.result);
    setTotalInward(response && response.inwardTotal);
    setTotalGram(JSON.parse(response && response.totalOp));
  }, [response]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = () => {
    // Fetch your data here
    // Example dispatch call
    // dispatch(getInwardByDate(selectDateRange));
    // You can also reset states here if necessary
    setTableResponse([]);
    setTotalInward(0);
    setTotalGram(0);
    setOpenPosition(0);
  };

  const searchPosition = () => {
    dispatch(getInwardByDate(selectDateRange));
  };

  // Function to navigate to details page
  const navigateToDetails = () => {
    // Navigate to the details page using history.push()
    navigate("/e-gold/treasurer-form"); // Change "/details" to the path of your details page
  };

  return (
    <div className="App">
      <div className="image">
        <Container className="TreasurerReportContainer">
          <h5>
            <p>Report</p>
          </h5>
          <CCard className="mb-4">
            <CCardHeader>Report Generation</CCardHeader>
            <CCardBody>
              <div className="selectionData">
                <Row>
                  <CCol>
                    <DateRangeComponent
                      selectedDateRange={(data) =>
                        data &&
                        setSelectDateRange(
                          `${
                            data[0] &&
                            new Date(data[0]).toLocaleDateString("en-US")
                          } - ${
                            data[1] &&
                            new Date(data[1]).toLocaleDateString("en-US")
                          }`
                        )
                      }
                    />
                  </CCol>
                  <CCol>
                    <button className="btn-common" onClick={searchPosition}>
                      Search
                    </button>
                  </CCol>
                  <CCol className="text-center">
                    <ReactToPrint
                      trigger={() => (
                        <button className="btn icon-common">
                          <CIcon icon={cilPrint} title="Print" />
                        </button>
                      )}
                      content={() => componentRef.current}
                    />
                    &nbsp;&nbsp;
                    <button
                      className="btn icon-common"
                      onClick={() =>
                        generatePDF(targetRef, {
                          filename: "treasurer_report.pdf",
                          page: {
                            margin: Margin.MEDIUM,
                            format: "A4",
                            orientation: "portrait",
                          },
                        })
                      }
                    >
                      <CIcon icon={cilCloudDownload} title="Download" />
                    </button>
                  </CCol>
                </Row>
              </div>
              <br />
              <br />
              <div ref={componentRef}>
                <div ref={targetRef}>
                  <h6 className="text-center mb-3">
                    <b>Treasurer Report</b>
                  </h6>

                  <p>Open Position(g): {totalgrm ? totalgrm.toFixed(2) : 0}</p>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col" className="tborder">
                          #
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col" className="tborder">
                          Date
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col" className="tborder">
                          Covered Position(g)
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col" className="tborder">
                          Net Position(g)
                        </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {tableResponse &&
                        tableResponse.map((item, index) => (
                          <CTableRow key={index}>
                            <CTableHeaderCell scope="row" className="tborder">
                              {index + 1}
                            </CTableHeaderCell>
                            <CTableDataCell className="tborder">
                              {new Date(item.createdAt).toLocaleString("en-US")}
                            </CTableDataCell>
                            <CTableDataCell className="tborder">
                              {item.coveredPosition}
                            </CTableDataCell>
                            <CTableDataCell className="tborder">
                              {item.netPosition}
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                    </CTableBody>
                  </CTable>
                </div>
              </div>
              {/* <Button variant="dark" onClick={navigateToDetails}>
                View details
              </Button> */}
            </CCardBody>
          </CCard>
        </Container>
      </div>
    </div>
  );
}

export default TreasurerReport;
