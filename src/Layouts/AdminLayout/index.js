import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import PropTypes from "prop-types";
import {
  faPlus,
  faSquarePollVertical,
  faBook
} from "@fortawesome/free-solid-svg-icons";

function AdminLayout({ children }) {
  return (
    <div className="mx-0 min-h-screen flex">
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
      <div className="flex-1 flex flex-col m-5">
        <div className="content flex-1">{children}</div>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node,
};

export default AdminLayout;
