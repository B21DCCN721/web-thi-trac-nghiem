import avatar from "../../assets/imgs/avatar.png";

function Header() {
  const username = localStorage.getItem("username") || "username";
  return (
    <header className="h-16 w-full border-b border-slate-300 flex items-center justify-between">
      <h1 className="font-bold ml-5">QUIZ APP</h1>

      <div className="mr-8 flex items-center min-w-[150px] relative group">
        <button>
          <img
            className="size-10 rounded-full mr-2"
            src={avatar}
            alt="avatar"
          />
        </button>
        <h6 className="font-semibold">{username}</h6>

        {/* Menu thả xuống dùng group của tailwind để đánh dấu các element giúp điều khiển trạng thái của phần tử con dựa trên trạng thái của phần tử cha */}
        {/* <div className="absolute z-50 top-10 right-30 min-w-[150px] bg-white border border-slate-300 shadow-md rounded-md hidden group-hover:block">
          <Link to="/profile" className="block px-4 py-2 hover:bg-slate-100">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </Link>
          <button
            className="w-full flex justify-start items-center px-4 py-2 hover:bg-slate-100"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" />
            Logout
          </button>
        </div> */}
      </div>
    </header>
  );
}

export default Header;
