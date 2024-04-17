import React, { Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

// routes config
import routes from "../routes";
import { useSelector } from "react-redux";
import { userData } from "src/reducers/Auth";
import { element } from "prop-types";
import Page404 from "src/views/pages/page404/Page404";

const AppContent = ({ socket }) => {
  const response = useSelector(userData);
  const [routesArray, setNewRoutes] = useState([])
  useEffect(() => {
    let authMenus = (response && response.menus) || [];
    const newRoutes = authMenus.map((item) => {
      return routes.find((element) =>{
        if(item.name == element.name){
          return element;
        }
      })
    });
    setNewRoutes(newRoutes)
  }, [response]);
 
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element socket={socket} />}
                />
              )
            );
          })}
          <Route path="*" name="Page 404" element={<Navigate to="/404" replace />} />
          <Route path="/" element={<Navigate to="login" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
