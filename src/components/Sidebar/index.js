import { NavLink } from "react-router-dom";
import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* tabs là 1 mảng obj có dạng {
  "title": "Danh sách bài thi",
  "icon": faHouse,
  "path": "/home"
}
*/
function Sidebar({tabs}) {
  return (
    <div className="sidebar min-w-[256px] min-h-screen flex flex-col">
      <h3 className="sidebar-header border-r border-b border-slate-300 h-16 flex items-center justify-center font-bold hover:cursor-pointer">
        QUIZZ APP
      </h3>
      <ul className="sidebar-items flex-1 border-r border-slate-300 pt-5">
        {tabs.map((item, index) => (
          <li className="mx-1 my-1.5" key={index}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex items-center py-2.5 px-4 rounded-lg font-medium hover:bg-lime-500 ${
                isActive ? "bg-lime-500" : ""
              }`
            }
          >
            <FontAwesomeIcon
              icon={item.icon}
              className="w-6 text-xl text-red-500 mr-2"
            />
            {item.title}
          </NavLink>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(Sidebar);
