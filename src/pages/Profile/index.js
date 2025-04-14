import { useState, useEffect } from "react";
import DefaultLayout from "../../Layouts/DefaultLayout";
import useGetData from "../../hooks/useGetData";
import avatar from "../../assets/imgs/avatar.png";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import usePatchData from "../../hooks/usePatchData";

function Profile() {
  const apiGetProfile = useGetData("/profile");
  const apiPatchProfile = usePatchData();

  const [name, setName] = useState("");
  const [lop, setLop] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (apiGetProfile.data) {
      setName(apiGetProfile.data.username || "");
      setLop(apiGetProfile.data.class || "");
      setDescription(apiGetProfile.data.description || "");
      setEmail(apiGetProfile.data.email || "");
    }
  }, [apiGetProfile.data]);

  const [checkEdit, setCheckEdit] = useState(false);

  const handleClickEditInfo = () => {
    setCheckEdit(true);
  };
  const handleConfim = async (e) => {
    e.preventDefault();
    await apiPatchProfile.patch("/update/profile", {
      username: name,
      email,
      classUser: lop,
      description,
    });
    setCheckEdit(false);
    console.log(name, lop, description, email);
  };
  if (apiGetProfile.loading) {
    console.log("load");
    return (
      <DefaultLayout>
        <Loading />
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout>
      <div className="flex justify-center mt-10 mx-20">
        <img className="size-28" src={avatar} alt="avatar" />
      </div>
      <div className="flex justify-end mx-20">
        <Button sx="mt-5" onClick={handleClickEditInfo}>
          Chỉnh sửa thông tin
        </Button>
      </div>
      <form onSubmit={handleConfim}>
        <div className="grid grid-cols-2 border-t text-gray-500 mx-20">
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
            <label htmlFor="acc">Chi tiết:</label>
            <input
              className="bg-gray-300 outline-none p-2 rounded"
              id="acc"
              value={description}
              type="text"
              readOnly={!checkEdit}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
            <input
              className="bg-gray-300 outline-none p-2 rounded"
              id="email"
              value={email}
              type="email"
              readOnly={!checkEdit}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
