import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true" ||
    sessionStorage.getItem("isAuthenticated") === "true";
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Không cho student vào route admin
  if (role === "student" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
