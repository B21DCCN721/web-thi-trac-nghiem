import { useState } from "react";
import DefaultLayout from "../../Layouts/DefaultLayout";

import avatar from "../../assets/imgs/avatar.png";
import Button from "../../components/Button";

function Profile() {
    const info = {
        name:'Đào Xuân Trí',
        msv: 'B21DCCN721',
        lop: 'D21CNPM1',
        accout: 'B21DCCN721',
        email: 'TriDX.B21CN721@stu.ptit.edu.vn',
    }
  const [name, setName] = useState(info.name);
  const [msv, setMsv] = useState(info.msv);
  const [lop, setLop] = useState(info.lop);
  const [accout, setAccout] = useState(info.accout)
  const [email, setEmail] = useState(info.email)

  const [checkEdit, setCheckEdit] = useState(false)

  const handleClickEditInfo = ()=>{
    setCheckEdit(true)
  }
  const handleConfim = () => {
    setCheckEdit(false)
  }
  return (
    <DefaultLayout>
      <div className="flex justify-center mt-10 mx-20">
        <img className="size-28" src={avatar} alt="avatar" />
        <p className="text-gray-500 mt-5 ml-5">abc.mail</p>
      </div>
      <div className="flex justify-end mx-20">
        <Button sx="mt-5" onClick={handleClickEditInfo}>Chỉnh sửa thông tin</Button>
      </div>
      <div className="grid grid-cols-2 border-t text-gray-500 mx-20 flex flex-col">
        <div className="flex flex-col mx-5 *:my-2">
          <label htmlFor="name">Họ tên:</label>
          <input
            className="bg-gray-300 outline-none p-2 rounded"
            id="name"
            value={name}
            type="text"
            readOnly={!checkEdit}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="msv">Mã sinh viên:</label>
          <input
            className="bg-gray-300 outline-none p-2 rounded"
            id="msv"
            value={msv}
            type="text"
            readOnly={!checkEdit}
            onChange={(e) => setMsv(e.target.value)}
          />
          <label htmlFor="lop">Lớp:</label>
          <input
            className="bg-gray-300 outline-none p-2 rounded"
            id="lop"
            value={lop}
            type="text"
            readOnly={!checkEdit}
            onChange={(e) => setLop(e.target.value)}
          />
        </div>
        <div className="flex flex-col mx-5 *:my-2">
          <label htmlFor="acc">Accout:</label>
          <input
            className="bg-gray-300 outline-none p-2 rounded"
            id="acc"
            value={accout}
            type="text"
            readOnly={!checkEdit}
            onChange={(e) => setAccout(e.target.value)}
          />
          <label htmlFor="email">Email:</label>
          <input
            className="bg-gray-300 outline-none p-2 rounded"
            id="email"
            value={email}
            type="text"
            readOnly={!checkEdit}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      {checkEdit && <div className="flex justify-center mt-10"><Button onClick={handleConfim}>Xác nhận</Button></div>}
    </DefaultLayout>
  );
}

export default Profile;
