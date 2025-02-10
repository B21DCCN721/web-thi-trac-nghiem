import { useEffect } from "react";
import Card from "../../components/Card";
import DefaultLayout from "../../Layouts/DefaultLayout";

import avatar from "../../assets/imgs/avatar.png"
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import ToggleSwitch from "../../components/ToggleSwitch";
function Home() {
  useEffect(() => {
    document.title = 'Home'
  },[])
  return (
    <DefaultLayout>
      <div className = "search-home flex justify-between items-center mt-5">
      <h1 className="text-2xl text-gray-500 font-bold ml-5">Danh sách bài thi</h1>
      <Search/>
     <ToggleSwitch onChange={(check) => console.log(check)}/>
      </div>
      <Card image={avatar} info={{time:'30/4', name:'Bài thi', author: 'B21DCCN721', quantity: '100', turn: '8'}}/>
      <Pagination totalItems={50} itemsPerPage={5} onPageChange={(page) => console.log('Current page:', page)} />
    </DefaultLayout>
  );
}

export default Home;
