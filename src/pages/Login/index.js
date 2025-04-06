import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import useLogin from "../../hooks/useLogin";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const apiLogin = useLogin("");

  const handleLogin = (e) => {
    e.preventDefault();
    apiLogin.login(username, password);
  };

  return (
    <div className="container mx-0 min-h-screen flex justify-center items-center">
      <div className="w-80">
        <h1 className="font-bold text-red-500 text-xl text-center mb-3">
          QUIZZ APP
        </h1>
        <form className="flex flex-col" onSubmit={handleLogin}>
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
            <Link className="underline" to={"#"}>
              Quên mật khẩu
            </Link>
          </div>
          <Button sx="mx-0 mt-5" type="submit" disabled={username === "" || password === ""}>
            Đăng nhập
          </Button>
        </form>
        <p className="text-center text-gray-500">
          Chưa có tài khoản,
          <span>
            <Link className="underline" to={"/dangky"}>
              Đăng ký
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
