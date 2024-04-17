import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import { MdSpaceDashboard } from "react-icons/md";
import DashboardIcon from "@mui/icons-material/Dashboard";
const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/e-gold/dashboard",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "KYC",
    to: "/kyc",
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Credit Bureaus",
    to: "/credit_bureaus",
  },
  {
    component: CNavItem,
    name: "Bank Statement",
    to: "/bank_statement",
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Purchase",
    to: "/e-gold/purchase",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Wallet",
    to: "/e-gold/wallet",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Redeem",
    to: "/e-gold/redeem",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Treasurer",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Open Position",
        to: "/e-gold/treasurer",
      },
      {
        component: CNavItem,
        name: "Inward Form",
        to: "/e-gold/inward-form",
      },
      {
        component: CNavItem,
        name: "Report",
        to: "/e-gold/treasurer-report",
      },
    ],
  },
  {
    component: CNavItem,
    name: "Logout",
    href: "http://digigold.finmetgold.com:3000/",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
];

export default _nav;
