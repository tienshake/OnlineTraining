import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./layout/GlobalStyle";
import { publicRoute, privateRoute } from "./routers";
import { RouteType } from "./types";
import DefaultLayout from "./layout/DefaultLayout";
import NotFound from "./pages/NotFound";
import EditProfile from "./components/EditProfile";
import PrivateRoute from "./routers/PrivateRoute";
import { ADMIN_ROUTE, TEACHER_ROUTE } from "./constants/constants";

function App() {
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
                  <>
                    {route.defaultLayout ? (
                      <DefaultLayout
                        onlyHome={
                          route.patch === "/" || route.patch === "/course"
                            ? true
                            : false
                        }
                        onlyCourseDetail={route.internBanner}
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
            const adminPath = route.patch.split("/")[1];
            let checkRole =
              adminPath === TEACHER_ROUTE
                ? ["teacher", "admin"]
                : adminPath === ADMIN_ROUTE
                ? ["admin"]
                : "";
            return (
              <Route
                key={i}
                path={route.patch}
                element={
                  <PrivateRoute
                    defaultLayout={route.defaultLayout}
                    allowedRoles={checkRole}
                  >
                    <Component />
                  </PrivateRoute>
                }
              >
                {route.children &&
                  route.children?.map((item, index) => (
                    <React.Fragment key={index}>
                      <Route index element={<EditProfile />} />
                      <Route path={item.patch} element={<item.component />} />
                    </React.Fragment>
                  ))}
              </Route>
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

// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fab } from "@fortawesome/free-brands-svg-icons";
// import { faL } from "@fortawesome/free-solid-svg-icons";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// library.add(fab, faL);

// function Category({ name }: any) {
//   return (
//     <div>
//       <FontAwesomeIcon icon={["fab", name]} />
//     </div>
//   );
// }
// const categories = ["react", "nodejs", "angular"];
