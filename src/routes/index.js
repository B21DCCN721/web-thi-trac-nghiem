import Login from "../pages/Login";
import Home from "../pages/Home";
import Result from "../pages/Result";
import Library from "../pages/Library";

const publicRoutes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/thuvien",
    component: Library,
  },
  {
    path: "/ketqua",
    component: Result,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
