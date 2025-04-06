import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />

          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<PublicRoute element={Page} />} />;
          })}

          {privateRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<PrivateRoute element={Page} />} />;
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
