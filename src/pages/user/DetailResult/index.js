import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import DefaultLayout from "../../../layouts/DefaultLayout";
import axiosClient from "../../../configs/axiosClient";
import { useEffect, useState } from "react";
import formatDate from "../../../helpers/fomatDate";

import Loading from "../../../components/Loading";

function DetailResult() {
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
      <div className="mx-5 my-5">
        <table className="w-full table-auto text-center border rounded-lg divide-y divide-solid shadow-md">
          <thead className="">
            <tr>
              <th className="py-2 pl-2 bg-gray-400 text-left">
                Thông tin sinh viên
              </th>
              <th className="py-2 pl-2 bg-gray-400 text-left">
                Thông tin bài thi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            <tr className="*:py-3 text-left">
              <td>
                <div className="grid grid-cols-3 ml-2">
                  <span>Tên:</span>
                  <span className="col-span-2">{user.username}</span>
                </div>
              </td>
              <td>
                <div className="grid grid-cols-3 ml-2">
                  <span>Tên bài thi:</span>
                  <span className="col-span-2">{historyTest.test.title}</span>
                </div>
              </td>
            </tr>
            <tr className="*:py-3 text-left bg-gray-300">
              <td>
                <div className="grid grid-cols-3 ml-2">
                  <span>Mô tả:</span>
                  <span className="col-span-2">{user.description}</span>
                </div>
              </td>
              <td>
                <div className="grid grid-cols-3 ml-2">
                  <span>Thời gian nộp bài:</span>
                  <span className="col-span-2">
                    {formatDate(historyTest.completed_at)}
                  </span>
                </div>
              </td>
            </tr>
            <tr className="*:py-3 text-left">
              <td>
                <div className="grid grid-cols-3 ml-2">
                  <span>Lớp:</span>
                  <span className="col-span-2">{user.class}</span>
                </div>
              </td>
              <td>
                <div className="grid grid-cols-3 ml-2">
                  <span>Điểm:</span>
                  <span className="col-span-2">{historyTest.score}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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

export default DetailResult;
