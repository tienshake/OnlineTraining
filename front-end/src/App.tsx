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
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
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
              return (
                <Route
                  key={i}
                  path={route.patch}
                  element={
                    isLogged ? (
                      <DefaultLayout>
                        <Component />
                      </DefaultLayout>
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
              );
            })}
            <>{console.log("re-render")}</>
          </Routes>
        </Router>
      </div>
    </GlobalStyle>
  );
}

export default App;
