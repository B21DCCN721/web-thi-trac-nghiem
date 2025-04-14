import Login from "../pages/Login";
import Home from "../pages/Home";
import Result from "../pages/Result";
import CreateAccout from "../pages/CreateAccout";
import DetailTest from "../pages/DetailTest";
import Profile from "../pages/Profile";
import TestStart from "../pages/TestStart";
import DetailResult from "../pages/DetailResult";

// component admin
import LoginAdmin from "../pages/admin/LoginAdmin";
import LibraryAdmin from "../pages/admin/LibraryAdmin";
import CreateTest from "../pages/admin/CreateTest";

const publicRoutes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/register",
    component: CreateAccout,
  },
  {
    path: "/admin",
    component: LoginAdmin,
  },
];

const privateRoutes = [
  //role user
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/home/info-test/:id",
    component: DetailTest,
  },
  {
    path: "/result",
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
    path: "/result/:id",
    component: DetailResult,
  },
  // role admin
  {
    path: "/admin/library",
    component: LibraryAdmin
  },
  {
    path: "/admin/create-test",
    component: CreateTest
  }
];

export { publicRoutes, privateRoutes };
