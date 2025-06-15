// pages user
import Login from "../pages/user/Login";
import Home from "../pages/user/Home";
import Result from "../pages/user/Result";
import CreateAccout from "../pages/user/CreateAccout";
import DetailTest from "../pages/user/DetailTest";
import Profile from "../pages/user/Profile";
import StartTest from "../pages/user/StartTest";
import DetailResult from "../pages/user/DetailResult";
import ForgotPassword from "../pages/user/ForgotPassword";
import Ranking from "../pages/user/Ranking";
import ChangePassword from "../pages/user/ChangePassword";

// pages admin
import LoginAdmin from "../pages/admin/LoginAdmin";
import LibraryAdmin from "../pages/admin/LibraryAdmin";
import CreateTest from "../pages/admin/CreateTest";
import EditTest from "../pages/admin/EditTest";
import Statistical from "../pages/admin/Statistical";
import DetailTestAdmin from "../pages/admin/DetailTestAdmin";

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
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/admin",
    component: LoginAdmin,
  },
];

const privateRoutes = [
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
    component: StartTest,
  },
  {
    path: "/result/:id",
    component: DetailResult,
  },
  {
    path: "/ranking",
    component: Ranking
  },
  {
    path: "/change-password",
    component: ChangePassword
  },
  // role admin
  {
    path: "/admin/library",
    component: LibraryAdmin
  },
  {
    path: "/admin/create-test",
    component: CreateTest
  },
  {
    path: "/admin/library/edit-test/:id",
    component: EditTest
  },
  {
    path: "/admin/statistical",
    component: Statistical
  },
  {
    path: "/admin/library/detail-test/:id",
    component: DetailTestAdmin
  }
];

export { publicRoutes, privateRoutes };
