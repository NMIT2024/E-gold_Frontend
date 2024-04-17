import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSidebar, CSidebarBrand, CSidebarNav } from "@coreui/react";
import { AppSidebarNav } from "./AppSidebarNav";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import "./Sidebar.css";
import { getUserInfo, userData } from "src/reducers/Auth";
import { useNavigate } from "react-router-dom";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const response = useSelector(userData);
  let navigation = (response && response.menus) || [];
  const navigate = useNavigate();

  useEffect(() => {
    if (response?.user.length === 0) {
      let userInfo =
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user"));
      let userId = userInfo && userInfo[0]?.id;
      if (userId) {
        dispatch(getUserInfo());
      } else {
        navigate("/");
      }
    }
  }, [response]);

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
      style={{ background: "#040404" }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <span className="brandLogo">Finmet</span>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          {response?.user.length === 0 ? <p className="sidebarLoader">Loading...</p> : <AppSidebarNav items={navigation} /> }
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
