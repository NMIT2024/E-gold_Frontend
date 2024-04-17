import { useEffect } from "react";
import {
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";

const ProtectedRouteAdmin = (props) => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const authRole = userInfo[0]?.role;

  const navigate = useNavigate();
  function presentPage() {
    navigate(-1);
  }

  if (!authRole) return <Navigate to="/" />;

  useEffect(() => {
    if (authRole && authRole !== 1) {
      presentPage();
    }
  }, [authRole && authRole != 1]);


  if (authRole == 1) {
    return <Outlet {...props} />;
  } else if (authRole !== 1) {
    presentPage();
  }
};

export default ProtectedRouteAdmin;
