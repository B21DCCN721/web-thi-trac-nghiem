import { useState } from "react";
import Button from "../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../../configs/axiosClient";
function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Hàm xử lý nhận mã OTP
  const handleReceiveOtp = async(e) => {
    try {
      const response = await axiosClient.post("/api/auth/receive-otp",{
        email,
      })
      if (response.status === 200 && response.data.code === 1) {
        alert("Mã OTP đã được gửi đến email của bạn.");
      } else {
        alert(response.data.message || "Gửi mã OTP thất bại.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Gửi mã OTP thất bại:", error.response);
        alert(error.response.data.message || "Gửi mã OTP thất bại.");
      }
    }
    console.log("Gửi OTP đến email:", email);
  };
  // Hàm xử lý đặt lại mật khẩu
  const handleResetPassword = async(e) => {
    e.preventDefault();
    if( !email || !otp || !password || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (password.length < 8) {
      alert("Mật khẩu mới phải ít nhất 8 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }
    try {
      const response = await axiosClient.post("/api/auth/reset-password", {
        email,
        otp,
        newPassword: password,
      });
      if (response.status === 200 && response.data.code === 1) {
        alert("Đặt lại mật khẩu thành công!");
        setEmail("");
        setOtp("");
        setPassword("");
        setConfirmPassword("");
      } else {
        alert(response.data.message || "Đặt lại mật khẩu thất bại.");
      }
    } catch (error) {
      console.error("Đặt lại mật khẩu thất bại:", error);
      if (error.response) {
        alert(error.response.data.message || "Đặt lại mật khẩu thất bại.");
      }
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-center mt-10">Quên mật khẩu</h1>
      <div className="w-1/3 mx-auto mt-5 p-5 bg-white shadow-lg rounded-lg">
        <form
          className="flex flex-col justify-center"
          onSubmit={handleResetPassword}
        >
          <label htmlFor="email">
            <span className="mb-2 text-gray-500">Nhận mã OTP:</span>
          </label>
          <div className="relative">
            <input
              className="w-full p-3 my-4 border border-gray-300 rounded focus:outline-none"
              id="email"
              type="email"
              name="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer underline underline-offset-4"
              onClick={handleReceiveOtp}
            >
              Nhận mã OTP
            </button>
          </div>
          <label className="text-gray-500" htmlFor="otp">
            Nhập mã OTP đã nhận:
            <input
              className="w-full p-3 my-4 border border-gray-300 rounded focus:outline-none"
              id="otp"
              type="text"
              name="otp"
              autoComplete="off"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Nhập mã OTP"
            />
          </label>
          <label htmlFor="password">
            <span className="mb-2 text-gray-500">Nhập mật khẩu mới:</span>
          </label>
          <div className="relative">
            <input
              className="w-full p-3 my-4 border border-gray-300 rounded focus:outline-none"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="Ít nhất 8 ký tự"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <label htmlFor="confirmPassword">
            <span className="mb-2 text-gray-500">Xác nhận mật khẩu mới:</span>
          </label>
          <div className="relative">
            <input
              className="w-full p-3 my-4 border border-gray-300 rounded focus:outline-none"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="Ít nhất 8 ký tự"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEye : faEyeSlash}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
          <Button sx="mx-0" type="submit">
            Đặt lại mật khẩu
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
