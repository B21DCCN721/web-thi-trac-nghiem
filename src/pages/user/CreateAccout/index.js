import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../../configs/axiosClient";
function CreateAccout() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  // Hàm xử lý đăng ký tài khoản
  const handleCreateAcc = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }
    if (password.length < 8) {
      alert("Mật khẩu phải ít nhất 8 ký tự.");
      return;
    }
    try {
      const response = await axiosClient.post("api/auth/register", {
        name,
        email,
        password,
      });
      if( response.status === 201 && response.data.code === 1) {
        alert("Đăng ký thành công. Vui lòng đăng nhập.");
        navigate("/");
      }
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      if( error.response) {
        alert(error.response.data.message || "Đăng ký thất bại.");
      }
    }
  };
  return (
    <div className="container mx-0 min-h-screen flex justify-center items-center">
      <div className="w-80">
        <h1 className="font-bold text-red-500 text-xl text-center mb-3">
          QUIZZ APP
        </h1>
        <form className="flex flex-col" onSubmit={handleCreateAcc}>
          <input
            className="p-5 bg-gray-100 rounded-t-md placeholder:text-lg focus:outline-none"
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-5 bg-gray-100 rounded-t-md placeholder:text-lg focus:outline-none"
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Họ và tên"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <div className="relative">
            <input
              className="p-5 pr-12 bg-gray-100 rounded-b-md placeholder:text-lg focus:outline-none w-full"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              placeholder="Mật khẩu ít nhất 8 ký tự"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="relative">
            <input
              className="p-5 pr-12 bg-gray-100 rounded-b-md placeholder:text-lg focus:outline-none w-full"
              type={showConfirmPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              placeholder="Xác nhận mật khẩu"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEye : faEyeSlash}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
          <Button sx="mx-0 mt-5" type="submit">
            Đăng ký
          </Button>
        </form>
        <p className="text-center text-gray-500">
          Đã có tài khoản,
          <span>
            <Link className="underline" to={"/"}>
              Đăng nhập
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default CreateAccout;
