import { useEffect, useState } from "react";
import { CardTest } from "../../../components/Card";
import DefaultLayout from "../../../layouts/DefaultLayout";
import avatar from "../../../assets/imgs/avatar.png";
import Search from "../../../components/Search";
import Pagination from "../../../components/Pagination";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../configs/axiosClient";
import Loading from "../../../components/Loading";
function Home() {
  const limit = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  // call app lấy danh sách bài thi
  useEffect(() => {
    const getListTest = async () => {
      try {
        const response = await axiosClient.get("api/test/get-list-test", {
          params: {
            page: currentPage,
            limit: limit,
            search: search,
          },
        });
        if (response.status === 200 && response.data.code === 1) {
          setData(response.data?.data);
        } else {
          setError("Không thể tải danh sách bài thi.");
        }
      } catch (error) {
        if (error.response) {
          console.error("Lỗi khi lấy danh sách bài thi:", error.response.data);
          setError(error.response.data.message || "Không thể tải danh sách bài thi.");
        }
      }finally{
        setLoading(false);
      }
    };
    getListTest();
  }, [currentPage, search]);
  console.log("data", data);
  
  if (loading) {
    return <DefaultLayout>
      <Loading/>
    </DefaultLayout>
  }
  if (error) {
    return (
      <DefaultLayout>
        <div className="container mx-auto text-center mt-10">
          <h1 className="text-red-500 text-xl font-bold">{error}</h1>
        </div>
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout>
      <div className="search-home flex items-center">
        <h1 className="text-2xl text-gray-500 font-bold">Danh sách bài thi</h1>
        <div className="mx-auto">
          <Search
            valueSearch={search}
            onSearch={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1">
        {data?.tests.map((item) => (
          <CardTest
            key={item.id}
            image={avatar}
            info={item}
            handleClickDetail={() => handleClickDetail(item.id)}
            handleClickStartTest={() => handleClickStartTest(item.id)}
          />
        ))}
      </div>
      <Pagination
        totalItems={data?.pagination.total}
        itemsPerPage={limit}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </DefaultLayout>
  );
}

export default Home;
