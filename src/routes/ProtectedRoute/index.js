import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  // Kiểm tra trạng thái đăng nhập (ví dụ từ localStorage hoặc Redux store)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    // Chuyển hướng về trang login nếu chưa đăng nhập
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;