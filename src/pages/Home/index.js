import { useEffect } from "react";
import { CardTest } from "../../components/Card";
import DefaultLayout from "../../Layouts/DefaultLayout";

import avatar from "../../assets/imgs/avatar.png";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import ToggleSwitch from "../../components/ToggleSwitch";

import data from "./data";
import { useNavigate } from "react-router-dom";
function Home() {
  useEffect(() => {
    document.title = "Home";
  }, []);
  const navigate = useNavigate();
  const handleClickDetail = (name) => {
    navigate(`/home/chitietbaithi?name=${name}`);
  };
  const handleClickStartTest = (id) => {
    navigate(`/test/${id}`);
  };
  return (
    <DefaultLayout>
      <div className="search-home flex justify-between items-center mt-5">
        <h1 className="text-2xl text-gray-500 font-bold ml-5">
          Danh sách bài thi
        </h1>
        <Search />
        <ToggleSwitch onChange={(check) => console.log(check)} />
      </div>
      {data.map((item) => (
        <CardTest
          key={item.id}
          image={avatar}
          info={item}
          handleClickDetail={handleClickDetail}
          handleClickStartTest={handleClickStartTest}
        />
      ))}
      <Pagination
        totalItems={50}
        itemsPerPage={5}
        onPageChange={(page) => console.log("Current page:", page)}
      />
    </DefaultLayout>
  );
}

export default Home;
