import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import GlobalStyle from "./layout/GlobalStyle";
import { publicRoute, privateRoute } from "./routers";
import { RouteType } from "./types";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./pages/Home";

function App() {
  const isLogged = true;
  return (
    <GlobalStyle>
      <Router>
        <Routes>
          {publicRoute?.map((route: RouteType, i: number) => {
            const Component = route.component;
            return (
              <Route
                key={i}
                path={route.patch}
                element={
                  <DefaultLayout>
                    <Component />
                  </DefaultLayout>
                }
              />
            );
          })}
          {privateRoute?.map((route: RouteType, i: number) => {
            const Component = route.component;
            const adminPath = route.patch.split("/")[1];
            console.log(adminPath);
            return (
              <Route
                key={i}
                path={route.patch}
                element={
                  isLogged ? (
                    <>
                      {adminPath === "admin" ? (
                        <Component />
                      ) : (
                        <DefaultLayout>
                          <Component />
                        </DefaultLayout>
                      )}
                    </>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            );
          })}
        </Routes>
      </Router>
    </GlobalStyle>
  );
}

export default App;
