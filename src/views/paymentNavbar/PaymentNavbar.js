import { CCol, CRow, CCallout } from '@coreui/react'
import { Col, Container, Row } from 'react-bootstrap';
import "./PaymentNavbar.css";
import WidgetsDropdown from '../widgets/WidgetsDropdown';

function PaymentNavbar() {
  return (
    <CRow>
      <WidgetsDropdown />
    </CRow>
  );
}


export default PaymentNavbar;
