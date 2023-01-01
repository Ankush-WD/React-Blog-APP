import React, { Component, Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import PrivateRoutes from "./components/PrivateRoutes";
import PublicRoutes from "./components/PublicRoutes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route
            exact
            path="/login"
            name="Login Page"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route
            path="*"
            name="Home"
            element={
              <PrivateRoutes>
                <DefaultLayout />
              </PrivateRoutes>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
