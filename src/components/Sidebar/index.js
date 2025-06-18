import { NavLink } from "react-router-dom";
import { memo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

/* tabs là 1 mảng obj có dạng {
  "title": "Danh sách bài thi",
  "icon": faHouse,
  "path": "/home"
}
*/
function Sidebar({ tabs }) {
  const [isOpenSidebar, setIsOpenSidebar] = useState(() => {
    const stored = localStorage.getItem("sidebarOpen");
    return stored === null ? true : stored === "true";
  });

  const handleOpenCloseSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
    localStorage.setItem("sidebarOpen", !isOpenSidebar);
  };
  return (
    <div
      className={`sidebar ${
        isOpenSidebar ? "min-w-64" : "min-w-16"
      } min-h-screen flex flex-col border-r border-slate-300 overflow-y-auto`}
    >
      <div className="sidebar-header border-b  h-16 flex items-center justify-end relative group">
        <FontAwesomeIcon
          icon={faList}
          className="text-lg mr-5 hover:cursor-pointer"
          onClick={handleOpenCloseSidebar}
        />
        <div className="absolute top-12 hidden bg-slate-800 rounded p-1 text-white text-sm group-hover:block text-nowrap">
          {isOpenSidebar ? "Đóng sidebar" : "Mở sidebar"}
        </div>
      </div>
      <ul className="sidebar-items flex-1 border-slate-300 pt-5">
        {tabs.map((item, index) => (
          <li className="mx-1 my-1.5" key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center py-2.5 px-4 h-12 rounded-lg font-medium  ${
                  isActive ? "bg-lime-500" : "hover:bg-gray-300"
                }`
              }
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="w-6 text-xl text-red-500 mr-2"
              />
              {isOpenSidebar ? item.title : ""}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(Sidebar);
