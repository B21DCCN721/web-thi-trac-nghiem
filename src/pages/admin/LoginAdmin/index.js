import { useState } from "react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../store/slices/authSlice";
import axiosClient from "../../../configs/axiosClient";

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("api/auth/login", {
        email,
        password,
      });
      if (response.status === 200 && response.data.code === 1) {
        const token = response.data.token;
        const role = response.data.user.role;
        dispatch(loginSuccess({ token, role }));
        navigate("/admin/statistical");
      } else {
        alert(response.data.message || "Đăng nhập không thành công.");
      }
    } catch (error) {
      if (error.response) {
        console.log("Đăng nhập thất bại:", error.response);
      }
      console.error("Đăng nhập thất bại:", error);
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.");
    }
  };

  return (
    <div className="container mx-0 min-h-screen flex justify-center items-center">
      <div className="w-80">
        <h1 className="font-bold text-red-500 text-xl text-center mb-3">
          ADMIN LOGIN
        </h1>
        <form className="flex flex-col" onSubmit={handleLogin}>
          <input
            className="p-5 bg-gray-100 rounded-t-md placeholder:text-lg focus:outline-none"
            type="text"
            name="email"
            autoComplete="off"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-5 bg-gray-100 rounded-b-md placeholder:text-lg focus:outline-none"
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Mật khẩu"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button sx="mx-0 mt-5" type="submit">
            Đăng nhập
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginAdmin;
