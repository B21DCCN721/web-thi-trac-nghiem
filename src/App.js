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
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* Public routes (Login, Register, Admin Login) */}
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={<PublicRoute element={Page} />}
              />
            );
          })}

          {/* Private routes (user & admin) */}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            const requiredRole = route.path.startsWith("/admin") ? "admin" : "user";
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute
                    element={Page}
                    requiredRole={requiredRole}
                  />
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
