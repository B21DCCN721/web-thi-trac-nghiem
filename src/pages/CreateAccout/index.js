import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from "react";
import useCreateAccout from "../../hooks/useCreateAccout";
function CreateAccout() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [classUser, setClassUser] = useState("");
  const apiRegister = useCreateAccout("/register");
  const handleCreateAcc = (e) => {
    e.preventDefault();
    apiRegister.createAccout(username, password, email, classUser);
  }
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
            name="username"
            autoComplete="off"
            placeholder="Mã sinh viên"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="p-5 bg-gray-100 rounded-b-md placeholder:text-lg focus:outline-none"
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Mật khẩu"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="p-5 bg-gray-100 rounded-t-md placeholder:text-lg focus:outline-none"
            type="text"
            name="class_user"
            autoComplete="off"
            placeholder="Lớp"
            required
            onChange={(e) => setClassUser(e.target.value)}
          />
          <Button sx="mx-0 mt-5" type="submit">Đăng ký</Button>
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
