import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import PropTypes from "prop-types";
import {
  faHouse,
  faSquarePollVertical,
  faRankingStar,
  faKey,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer";

function DefaultLayout({ children }) {
  return (
   <div>
      <div className="flex h-screen">
        {/* Sidebar cố định */}
        <Sidebar
          tabs={[
            { title: "Danh sách bài thi", icon: faHouse, path: "/home" },
            { title: "Kết quả", icon: faSquarePollVertical, path: "/result" },
            { title: "Bảng xếp hạng", icon: faRankingStar, path: "/ranking" },
            { title: "Đổi mật khẩu", icon: faKey, path: "/change-password" },
            { title: "Thông tin cá nhân", icon: faUser, path: "/profile" },
          ]}
        />
        
        {/* Main content: header + content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />         
          {/* Phần content cuộn */}
          <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="p-5 flex-1">
              {children}
            </div>
            <Footer/>
          </div>
        </div>
      </div>
   </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node,
};

export default DefaultLayout;
