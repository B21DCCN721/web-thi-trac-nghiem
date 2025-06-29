import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import {
  faPlus,
  faSquarePollVertical,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../configs/axiosClient";
import { useNavigate } from "react-router-dom";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axiosClient.post("api/auth/logout");
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
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
        <div className="h-16 w-full border-b border-slate-300 flex items-center justify-end px-5">
          <button className="mr-5 font-bold" onClick={handleLogout}>
            Logout
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="mx-2" />
          </button>
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
