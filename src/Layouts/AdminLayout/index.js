import Sidebar from "../../components/Sidebar";
import PropTypes from "prop-types";
import {
  faPlus,
  faSquarePollVertical,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    // Redirect to login page or perform any other logout actions
  };
  return (
    <div className="flex h-screen">
      <Sidebar
        tabs={[
          {
            title: "Thống kê",
            icon: faSquarePollVertical,
            path: "/admin/statistical",
          },
          {
            title: "Tạo mới bài thi",
            icon: faPlus,
            path: "/admin/create-test",
          },
          {
            title: "Thư viện bài thi",
            icon: faBook,
            path: "/admin/library",
          },
        ]}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="h-16 w-full border-b border-slate-300 flex items-center px-5">
          <button className="ml-auto mr-5 font-bold" onClick={handleLogout}>Logout</button>
          {/* Có thể thêm các nút hoặc thông tin khác ở đây */}
        </div>
        {/* Phần content cuộn */}
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node,
};

export default AdminLayout;
