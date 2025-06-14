import DefaultLayout from "../../../layouts/DefaultLayout";
import { useState } from "react";
import Button from "../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../../configs/axiosClient";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  // Hàm xử lý đổi mật khẩu
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }
    if (newPassword.length < 8) {
      alert("Mật khẩu mới phải ít nhất 8 ký tự.");
      return;
    }
    try {
      const response = await axiosClient.patch("api/auth/change-password", {
        oldPassword: currentPassword,
        newPassword,
      });
      if (response.status === 200 && response.data.code === 1) {
        alert("Đổi mật khẩu thành công!");
      } else {
        alert(response.data.message || "Đổi mật khẩu thất bại.");
        return;
      }
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Đổi mật khẩu thất bại:", error);
      if (error.response) {
        alert(error.response.data.message || "Đổi mật khẩu thất bại.");
      }
    }
  };
  return (
    <DefaultLayout>
      <div className="flex justify-center mt-10 mx-20">
        <div className="w-full max-w-md">
          <h1 className="text-2xl text-gray-500 font-bold mb-5 text-center">
            Đổi mật khẩu
          </h1>
          <form className="flex flex-col" onSubmit={handleChangePassword}>
            <label htmlFor="current-password">
              <span className="mb-2 text-gray-500">Mật khẩu hiện tại:</span>
            </label>
            <div className="relative">
              <input
                className="w-full p-3 my-4 border border-gray-300 rounded focus:outline-none"
                type={showCurrentPassword ? "text" : "password"}
                id="current-password"
                name="current-password"
                autoComplete="new-password"
                placeholder="Ít nhất 8 ký tự"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={showCurrentPassword ? faEye : faEyeSlash}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              />
            </div>
            <label htmlFor="new-password">
              <span className="mb-2 text-gray-500">Nhập mật khẩu mới:</span>
            </label>
            <div className="relative">
              <input
                className="w-full p-3 my-4 border border-gray-300 rounded focus:outline-none"
                type={showNewPassword ? "text" : "password"}
                id="new-password"
                name="new-password"
                autoComplete="new-password"
                placeholder="Ít nhất 8 ký tự"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={showNewPassword ? faEye : faEyeSlash}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            </div>
            <label htmlFor="confirm-new-password">
              <span className="mb-2 text-gray-500">Xác nhận mật khẩu mới:</span>
            </label>
            <div className="relative">
              <input
                className="w-full p-3 my-4 border border-gray-300 rounded focus:outline-none"
                type={showConfirmNewPassword ? "text" : "password"}
                id="confirm-new-password"
                name="confirm-new-password"
                autoComplete="new-password"
                placeholder="Ít nhất 8 ký tự"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={showConfirmNewPassword ? faEye : faEyeSlash}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
              />
            </div>
            <Button sx="mx-auto" type="submit">
              Đặt lại mật khẩu
            </Button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default ChangePassword;
