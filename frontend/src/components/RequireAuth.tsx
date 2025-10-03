import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../context/Authprovider";

const RequireAuth = ({ allowedRoles } : any) => {
  const { auth } = useContext(AuthContext);

  if (!auth?.token) {
    return <Navigate to="login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(auth?.role)) {
    return <Navigate to="unauthorized" replace />; 
  }

  return <Outlet />;
};

export default RequireAuth;
