import { NavLink } from "react-router-dom";
import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSquarePollVertical,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {

  return (
    <div className="sidebar w-64 min-h-screen flex flex-col">
      <h3 className="sidebar-header border-r border-b border-slate-300 h-16 flex items-center justify-center font-bold hover:cursor-pointer">
        QUIZZ APP
      </h3>
      <ul className="sidebar-items flex-1 border-r border-slate-300 pt-5">
        <li className="mx-1">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center py-2.5 px-4 rounded-lg font-medium hover:bg-lime-500 ${
                isActive ? "bg-lime-500" : ""
              }`
            }
          >
            <FontAwesomeIcon
              icon={faHouse}
              className="w-6 text-xl text-red-500 mr-2"
            />
            Danh sách bài thi
          </NavLink>
        </li>

        <li className="mx-1 mt-2.5">
          <NavLink
            to="/ketqua"
            className={({ isActive }) =>
              `flex items-center py-2.5 px-4 rounded-lg font-medium hover:bg-lime-500 ${
                isActive ? "bg-lime-500" : ""
              }`
            }
          >
            <FontAwesomeIcon
              icon={faSquarePollVertical}
              className="w-6 text-xl text-red-500 mr-2"
            />
            Kết quả
          </NavLink>
        </li>

        <li className="mx-1 mt-2.5">
          <NavLink
            to="/thuvien"
            className={({ isActive }) =>
              `flex items-center py-2.5 px-4 rounded-lg font-medium hover:bg-lime-500 ${
                isActive ? "bg-lime-500" : ""
              }`
            }
          >
            <FontAwesomeIcon
              icon={faBookOpen}
              className="w-6 text-xl text-red-500 mr-2"
            />
            Thư viện
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default memo(Sidebar);
