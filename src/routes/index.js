import Login from "../pages/Login";
import Home from "../pages/Home";
import Result from "../pages/Result";
import Library from "../pages/Library";
import CreateAccout from "../pages/CreateAccout";
import DetailTest from "../pages/DetailTest";
import Profile from "../pages/Profile";
import TestStart from "../pages/TestStart";
import ResultTest from "../pages/ResultTest";

const publicRoutes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/dangky",
    component: CreateAccout,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/home/chitietbaithi",
    component: DetailTest,
  },
  {
    path: "/thuvien",
    component: Library,
  },
  {
    path: "/ketqua",
    component: Result,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/test/:id",
    component: TestStart,
  },
  {
    path: "/ketqua/:id",
    component: ResultTest,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
