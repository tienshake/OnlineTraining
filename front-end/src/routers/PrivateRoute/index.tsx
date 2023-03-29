import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
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
  const user = useSelector((state: RootState) => state.auth.user);
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

  if (user.id) {
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
