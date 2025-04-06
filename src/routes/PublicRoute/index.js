// src/routes/PublicRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element: Component }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  return isAuthenticated ? <Navigate to="/home" replace /> : <Component />;
};

export default PublicRoute;
