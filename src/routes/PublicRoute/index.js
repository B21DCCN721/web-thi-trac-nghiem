// src/routes/PublicRoute.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ element: Component }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);

  if (isAuthenticated) {
    return role === "admin" ? <Navigate to="/admin/library" replace /> : <Navigate to="/home" replace />;
  }

  return <Component />;
};

export default PublicRoute;
