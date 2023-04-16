import React from "react";
import { Navigate } from "react-router-dom";
import { getUserToken, removeUserToken } from "../../utils/userToken";
import DefaultLayout from "../../layout/DefaultLayout";
import decodedToken from "../../utils/decodedToken";

interface Props {
  children: any;
  allowedRoles?: any;
  defaultLayout?: boolean;
}

const PrivateRoute = ({
  children,
  allowedRoles = [],
  defaultLayout,
}: Props) => {
  const token: any = getUserToken();
  const userToken: any = decodedToken();

  const clearToken = () => {
    removeUserToken();
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  // check role user permissions
  if (allowedRoles && !allowedRoles.includes(userToken?.role)) {
    return <Navigate to="/" />;
  }

  if (userToken.id) {
    if (defaultLayout) {
      return <DefaultLayout>{children}</DefaultLayout>;
    } else {
      return children;
    }
  }

  clearToken();

  return <Navigate to="/" />;
};
export default PrivateRoute;
