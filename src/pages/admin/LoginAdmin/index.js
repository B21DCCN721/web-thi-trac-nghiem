import { useState } from "react";
import Button from "../../../components/Button";

function LoginAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
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
            name="username"
            autoComplete="off"
            placeholder="Tên đăng nhập"
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
          <Button sx="mx-0 mt-5" type="submit" disabled={username === "" || password === ""}>
            Đăng nhập
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginAdmin;
