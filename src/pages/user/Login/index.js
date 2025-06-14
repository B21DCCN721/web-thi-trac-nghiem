import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../../configs/axiosClient";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../store/slices/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Hàm xử lý đăng nhập
  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("api/auth/login", {
        email,
        password,
      });
      if (response.status === 200 && response.data.code === 1) {
        const token = response.data.token;
        const role = response.data.user.role;
        dispatch(loginSuccess({token, role}))
        navigate("/home");
      } else {
        alert(response.data.message || "Đăng nhập không thành công.");
      }
    } catch (error) {
      if(error.response) {
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
          QUIZ APP
        </h1>
        <form className="flex flex-col" onSubmit={handleLogin}>
          <input
            className="p-5 bg-gray-100 rounded-t-md placeholder:text-lg focus:outline-none"
            type="text"
            name="email"
            autoComplete="off"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              className="p-5 pr-12 bg-gray-100 rounded-b-md placeholder:text-lg focus:outline-none w-full"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              placeholder="Mật khẩu"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <div className="text-gray-500 flex justify-between mt-3">
            <label>
              <input
                className="border-8 border-red-500 cursor-pointer"
                type="checkbox"
                name="memo-password"
                id="memo-password"
              />
              <label className="cursor-pointer" htmlFor="memo-password">
                Ghi nhớ
              </label>
            </label>
            <Link className="underline" to={"/forgot-password"}>
              Quên mật khẩu
            </Link>
          </div>
          <Button
            sx="mx-0 mt-5"
            type="submit"
          >
            Đăng nhập
          </Button>
        </form>
        <p className="text-center text-gray-500">
          Chưa có tài khoản,
          <span>
            <Link className="underline" to={"/register"}>
              Đăng ký
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
