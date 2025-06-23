import { useState, useEffect, useRef } from "react";
import DefaultLayout from "../../../layouts/DefaultLayout";
import Button from "../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import avatarDefault from "../../../assets/imgs/avatar.png";
import axiosClient from "../../../configs/axiosClient";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(avatarDefault);
  const [rank, setRank] = useState(0);
  const fileInputRef = useRef(null);
  const [checkEdit, setCheckEdit] = useState(false);
  const navigate = useNavigate();

  const handleClickEditInfo = () => {
    setCheckEdit(true);
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setAvatar(base64String); // base64 URL (data:image/...;base64,...)
      };
      reader.readAsDataURL(file); // đọc file dưới dạng base64
    }
    setCheckEdit(true); // Bật chế độ chỉnh sửa khi chọn ảnh mới
  };
  // Hàm xác nhận chỉnh sửa thông tin
  const handleConfimEdit = async (e) => {
    e.preventDefault();
    try {
      // Chỉ gửi avatar nếu là base64 (ảnh mới được chọn)
      const isBase64 = avatar.startsWith("data:image");
      const payload = {
        name,
        email,
      };
      if (isBase64) {
        payload.avatar = avatar;
      }

      const response = await axiosClient.put(
        "api/auth/change-profile",
        payload
      );

      if (response.status === 200 && response.data.code === 1) {
        alert("Cập nhật thông tin thành công!");
        setCheckEdit(false);
      } else {
        console.error("Cập nhật thất bại:", response.data.message);
        alert("Cập nhật thất bại.");
      }
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error.response?.data || error);
      alert("Cập nhật thông tin thất bại.");
    }
  };
  // call API lấy thông tin người dùng
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axiosClient.get("api/auth/profile");
        if (response.status === 200 && response.data.code === 1) {
          const user = response.data.user;
          setName(user.name);
          setEmail(user.email);
          setAvatar(user.avatar || avatarDefault);
          setRank(user.rank); // Giả sử rank là một số nguyên
        } else {
          console.error(
            "Lấy thông tin người dùng thất bại:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Lấy thông tin người dùng thất bại:", error);
      }
    };
    getUserInfo();
  }, []);
  // Hàm xử lý đăng xuất
  const handleLogout = async () => {
    try {
      await axiosClient.post("api/auth/logout");
      localStorage.clear();
      sessionStorage.clear();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
    }
  };
  return (
    <DefaultLayout>
      <div className="flex justify-center mt-10 mx-20">
        <div className="relative group">
          <img
            className="size-28 rounded-full object-cover"
            src={avatar}
            alt="avatar"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 bg-white w-[30px] h-[30px] border rounded-full p-1 shadow-md group-hover:opacity-100 opacity-80 transition-opacity"
          >
            <FontAwesomeIcon icon={faCamera} />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mx-20">
        <Button sx="my-5" onClick={handleClickEditInfo}>
          Chỉnh sửa thông tin
        </Button>
        <button
          className="flex justify-start items-center px-4 py-2 hover:bg-slate-100"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" />
          Logout
        </button>
      </div>
      <form onSubmit={handleConfimEdit}>
        <div className="border-t mx-20 *:block *:my-3">
          <p className="font-bold">
            Xếp hạng của bạn: <span className="text-xl">{rank}</span>
          </p>
          <label htmlFor="name">Họ tên:</label>
          <input
            className="bg-gray-300 outline-none p-2 rounded w-1/2"
            id="name"
            value={name}
            type="text"
            readOnly={!checkEdit}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            className="bg-gray-300 outline-none p-2 rounded w-1/2"
            id="email"
            value={email}
            type="email"
            readOnly={!checkEdit}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {checkEdit && (
          <div className="flex justify-center mt-10">
            <Button type="submit">Xác nhận</Button>
          </div>
        )}
      </form>
    </DefaultLayout>
  );
}

export default Profile;
