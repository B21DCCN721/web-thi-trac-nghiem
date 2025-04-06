import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import TableResultTest from "../../components/Table/TableResultTest";
import DefaultLayout from "../../Layouts/DefaultLayout";
import axiosClient from "../../configs/axiosClient";
import { useEffect, useState } from "react";

import Loading from "../../components/Loading";

function ResultTest() {
  const { id } = useParams();
  const url = `/test/history/${id}`;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [historyTest, setHistoryTest] = useState(null);
  const [user, setUser] = useState(null);
  console.log(error);
  
  const navigate = useNavigate();
  const handleClickRedoTest = () => {
    navigate(`/test/${historyTest.test.id}`);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosClient.get(url);
        if (response.status === 200) {
          setData(response.data.data);
          setHistoryTest(response.data.historyTest);
          setUser(response.data.user);
          setLoading(false);
        }
      } catch (err) {
        setError(err.response ? err.response.data : "Something went wrong");
      }
    };
    let timerId = setTimeout(() => {
      getData();
    }, 200);
    return () => clearTimeout(timerId);
  }, [url]);
  if (data === null || loading === true || historyTest === null) {
    return (
      <DefaultLayout>
        <Loading />
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout>
      <h1 className="font-bold ml-5 my-10 text-xl">Thông tin</h1>
      <TableResultTest dataHistory={historyTest} dataUser={user} />
      <div className="flex items-center ml-5">
        <h2 className="font-bold text-xl text-gray-600">
          Chi tiết các câu hỏi
        </h2>
        <Button onClick={handleClickRedoTest}>Làm lại</Button>
      </div>
      {/* <div>
        {data.map((item, index) => (
          <CardQuestion key={index} info={item} />
        ))}
      </div> */}
    </DefaultLayout>
  );
}

export default ResultTest;
