import { Link } from "react-router-dom";
import Button from "../../components/Button";
function CreateAccout() {
    return ( 
        <div className="container mx-0 min-h-screen flex justify-center items-center">
      <div className="w-80">
        <h1 className="font-bold text-red-500 text-xl text-center mb-3">QUIZZ APP</h1>
        <form className="flex flex-col">
        <input className="p-5 bg-gray-100 rounded-t-md placeholder:text-lg focus:outline-none" type="email" name="email" autoComplete="off" placeholder="Email" required/>
          <input className="p-5 bg-gray-100 rounded-t-md placeholder:text-lg focus:outline-none" type="text" name="username" autoComplete="off" placeholder="Mã sinh viên" required/>
          <input className="p-5 bg-gray-100 rounded-b-md placeholder:text-lg focus:outline-none" type="password" name="password" autoComplete="new-password" placeholder="Mật khẩu" required/>
          <Button sx="mx-0 mt-5">Đăng ký</Button>
        </form>
        <p className="text-center text-gray-500">Đã có tài khoản,<span><Link className="underline" to={'/'}>Đăng nhập</Link></span></p>
      </div>

    </div>
    );
}

export default CreateAccout;