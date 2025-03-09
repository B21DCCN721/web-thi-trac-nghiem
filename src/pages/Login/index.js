
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button";

function Login() {
  const navigate = useNavigate();
  const handleClickLogin = () => {
    navigate("/home");
  };
  return (
    <div className="container mx-0 min-h-screen flex justify-center items-center">
      <div className="w-80">
        <h1 className="font-bold text-red-500 text-xl text-center mb-3">QUIZZ APP</h1>
        <form className="flex flex-col">
          <input className="p-5 bg-gray-100 rounded-t-md placeholder:text-lg focus:outline-none" type="text" name="username" autoComplete="off" placeholder="Mã sinh viên" required/>
          <input className="p-5 bg-gray-100 rounded-b-md placeholder:text-lg focus:outline-none" type="password" name="password" autoComplete="new-password" placeholder="Mật khẩu" required/>
          <div className="text-gray-500 flex justify-between mt-3">
            <label>
              <input className="border-8 border-red-500 cursor-pointer" type="checkbox" name="memo-password" id="memo-password"/>
              <label className="cursor-pointer" htmlFor="memo-password">Ghi nhớ</label>
            </label>
            <Link className="underline" to={'#'}>Quên mật khẩu</Link>
          </div>
          <Button sx="mx-0 mt-5" onClick={handleClickLogin}>Đăng nhập</Button>
        </form>
        <p className="text-center text-gray-500">Chưa có tài khoản,<span><Link className="underline" to={'/dangky'}>Đăng ký</Link></span></p>
      </div>

    </div>
  );
}

export default Login;
