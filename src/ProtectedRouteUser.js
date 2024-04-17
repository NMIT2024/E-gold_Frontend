import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRouteUser = (props) => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const authRole = userInfo[0]?.role;
  const navigate = useNavigate();
  function presentPage() {
    navigate(-1);
  }

  if (!authRole) return <Navigate to="/" />;

  useEffect(() => {
    if (authRole && authRole != 2) {
      presentPage();
    }
  }, [authRole && authRole != 2]);

  if (authRole == 2) {
    return <Outlet {...props} />;
  } else if (authRole != 2) {
    presentPage();
  }
};

export default ProtectedRouteUser;
