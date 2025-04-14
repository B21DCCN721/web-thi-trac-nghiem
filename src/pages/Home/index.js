import { useEffect, useState } from "react";
import { CardTest } from "../../components/Card";
import DefaultLayout from "../../Layouts/DefaultLayout";
import avatar from "../../assets/imgs/avatar.png";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import useGetPaginationData from "../../hooks/useGetPaginationData";
import Loading from "../../components/Loading";

function Home() {
  const [limit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const apiGetListTest = useGetPaginationData(
    `/test?limit=${limit}&page=${currentPage}`
  );
  useEffect(() => {
    document.title = "Home";
  }, []);
  const navigate = useNavigate();
  const handleClickDetail = (id) => {
    navigate(`/home/info-test/${id}`);
  };
  const handleClickStartTest = (id) => {
    navigate(`/test/${id}`);
  };
  if (apiGetListTest.data === null || apiGetListTest.loading === true) {
    return (
      <DefaultLayout>
        <Loading />
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout>
      <div className="search-home flex items-center mt-5">
        <h1 className="text-2xl text-gray-500 font-bold ml-5">
          Danh sách bài thi
        </h1>
        <div className="mx-auto">
          <Search onSearch={(e) => console.log(e.target.value)} />
        </div>
      </div>
      {apiGetListTest.data.map((item) => (
        <CardTest
          key={item.id}
          image={avatar}
          info={item}
          handleClickDetail={() => handleClickDetail(item.id)}
          handleClickStartTest={() => handleClickStartTest(item.id)}
        />
      ))}
      <Pagination
        totalItems={apiGetListTest.pagination.totalTests}
        itemsPerPage={limit}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </DefaultLayout>
  );
}

export default Home;
