import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import PropTypes from "prop-types";
import {
  faHouse,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";

function AdminLayout({ children }) {
  return (
    <div className="container mx-0 min-h-screen flex">
      <Sidebar
        tabs={[
          {
            title: "Thư viện bài thi",
            icon: faHouse,
            path: "/admin/library",
          },
          {
            title: "Tạo mới bài thi",
            icon: faSquarePollVertical,
            path: "/admin/create-test",
          },
        ]}
      />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="content flex-1">{children}</div>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node,
};

export default AdminLayout;
