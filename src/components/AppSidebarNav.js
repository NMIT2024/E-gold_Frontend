import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { CNavGroup, CNavItem } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilHome,
  cilBank,
  cilCart,
  cilCash,
  cilCreditCard,
  cilContact,
  cilPuzzle,
  cilAccountLogout,
} from "@coreui/icons";

export const AppSidebarNav = ({ items }) => {
  const location = useLocation();

  const navLink = (name, icon, index) => {
    const icons = [
      cilHome,
      cilBank,
      cilBank,
      cilBank,
      cilCart,
      cilCash,
      cilCreditCard,
      cilContact,
      cilPuzzle,
      cilContact,
      cilAccountLogout,
    ];

    return (
      <>
        <CIcon icon={icons[index]} customClassName="nav-icon" />
        {name && name}
      </>
    );
  };

  // Render individual items including Logout button
  const navItem = (item, index) => {
    const { name, icon, ...rest } = item;
    const Component = CNavItem;
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
        onClick={() => {
          if (name === "Logout") {
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
          }
        }}
      >
        {navLink(name, icon, index)}
      </Component>
    );
  };

  // Render navigation groups
  const navGroup = (item, index) => {
    const { name, icon, to, ...rest } = item;
    const Component = CNavGroup;
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon, index)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
      </Component>
    );
  };

  // Add Logout button at the end
  const logoutItem = { name: "Logout", to: "/", icon: cilAccountLogout };

  // Render the sidebar navigation
  return (
    <React.Fragment>
      {items &&
        items.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
      {navItem(logoutItem, items.length)}
    </React.Fragment>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
