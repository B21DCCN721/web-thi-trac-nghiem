// src/routes/PrivateRoute.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element: Component, requiredRole }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  //truyền requiredRole, kiểm tra role có đúng không
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Component />;
};

export default PrivateRoute;
