import React, { Component, Suspense, useEffect, useState } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./views/Home/Main";
import Contact from "./views/Home/Contact";
import Faq from "./views/Home/Faq";
import socketIO from "socket.io-client";
import { socketURL } from "./app/Config";

const socket = socketIO.connect(socketURL);

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/Registration/Registration"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const App = () => {
  return (
    // <HashRouter>
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route
            exact
            path="/register"
            name="Register"
            element={<Register />}
          />
          <Route exact path="/login" name="Login" element={<Login />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route exact path="/contact" name="Contact" element={<Contact />} />
          <Route exact path="/faq" name="faq" element={<Faq />} />
            <Route
              path="/e-gold/*"
              name="Dashnoard"
              element={<DefaultLayout socket={socket} />}
            />
          <Route exact path="*" name="Page 404" element={<Page404 />} />
          <Route
            exact
            path="/"
            name="Landing Page"
            element={<Main socket={socket} />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
export default App;
