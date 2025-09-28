import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";



const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();


  //check for token only
  return auth?.token 
  ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
