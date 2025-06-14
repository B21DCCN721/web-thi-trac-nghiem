import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import PropTypes from "prop-types";
import {
  faHouse,
  faSquarePollVertical,
  faRankingStar,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

function DefaultLayout({ children }) {
  return (
    <div className="container mx-0 min-h-screen flex">
      <Sidebar
        tabs={[
          {
            title: "Danh sách bài thi",
            icon: faHouse,
            path: "/home",
          },
          {
            title: "Kết quả",
            icon: faSquarePollVertical,
            path: "/result",
          },
          {
            title: "Bảng xếp hạng",
            icon: faRankingStar,
            path: "/ranking",
          },
          {
            title: "Đổi mật khẩu",
            icon: faKey,
            path: "/change-password",
          }
        ]}
      />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="content flex-1 m-5">{children}</div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node,
};

export default DefaultLayout;
