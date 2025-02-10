import { Link } from "react-router-dom";
import avatar from "../../assets/imgs/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div className="h-16 border-b border-slate-300 flex items-center justify-between">
      <FontAwesomeIcon icon={faList} className="text-lg ml-5" />

      <div className="mr-8 flex items-center relative group">
        <button>
          <img
            className="size-10 rounded-full mr-2"
            src={avatar}
            alt="avatar"
          />
        </button>
        <h6 className="font-semibold">B21DCCN721</h6>

        {/* Menu thả xuống dùng group của tailwind để đánh dấu các element giúp điều khiển trạng thái của phần tử con dựa trên trạng thái của phần tử cha */}
        <div className="absolute z-50 top-10 right-30 bg-white border border-slate-300 shadow-md rounded-md hidden group-hover:block">
          <Link to="#" className="block px-4 py-2 hover:bg-slate-100">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </Link>
          <Link to="#" className="block px-4 py-2 hover:bg-slate-100">
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
