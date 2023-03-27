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
import NotFound from "./pages/NotFound";

function App() {
  const isLogged = true;

  return (
    <GlobalStyle>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Navigate to="teacher/create-course" />} /> */}
          {publicRoute?.map((route: RouteType, i: number) => {
            const Component = route.component;
            return (
              <Route
                key={i}
                path={route.patch}
                element={
                  <>
                    {route.defaultLayout ? (
                      <DefaultLayout
                        onlyHome={route.patch === "/" ? true : false}
                      >
                        <Component />
                      </DefaultLayout>
                    ) : (
                      <Component />
                    )}
                  </>
                }
              />
            );
          })}
          {privateRoute?.map((route: RouteType, i: number) => {
            const Component = route.component;
            // const adminPath = route.patch.split("/")[1];
            return (
              <Route
                key={i}
                path={route.patch}
                element={
                  isLogged ? (
                    <>
                      {route.defaultLayout ? (
                        <DefaultLayout>
                          <Component />
                        </DefaultLayout>
                      ) : (
                        <Component />
                      )}
                    </>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            );
          })}

          <Route
            path="*"
            element={
              <DefaultLayout onlyNotFound>
                <NotFound />
              </DefaultLayout>
            }
          />
        </Routes>
      </Router>
    </GlobalStyle>
  );
}

export default App;
