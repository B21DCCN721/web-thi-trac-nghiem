import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import DefaultLayout from "../../../layouts/DefaultLayout";
import axiosClient from "../../../configs/axiosClient";
import { useEffect, useState } from "react";
import formatDate from "../../../helpers/fomatDate";

import Loading from "../../../components/Loading";

function DetailResult() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null); // data submission

  const navigate = useNavigate();
  const handleClickRedoTest = () => {
    navigate(`/test/${data?.submission.Test.id}`);
  };
  // call api lấy thông tin kết quả
  useEffect(() => {
    const getInfoResult = async () => {
      try {
        const response = await axiosClient.get(
          `api/test/get-submission-answers/${id}`
        );
        if (response.status === 200 && response.data.code === 1) {
          setData(response.data?.data);
        }
      } catch (error) {
        if (error.response) {
          console.error("Lỗi khi lấy thông tin kết quả:", error.response.data);
          setError(
            error.response.data.message || "Không thể tải thông tin kết quả."
          );
        }
      } finally {
        setLoading(false);
      }
    };
    getInfoResult();
  }, [id]);
  if (loading) {
    return (
      <DefaultLayout>
        <Loading />
      </DefaultLayout>
    );
  }
  if (error) {
    return (
      <DefaultLayout>
        <div className="text-red-500 text-center mt-10">{error}</div>
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout>
      <h1 className="font-bold ml-5 mb-5 text-xl">Thông tin</h1>
      <div className="mx-5 my-5">
        <table className="w-full table-auto text-center border rounded-lg divide-y divide-solid shadow-md">
          <thead className="">
            <tr>
              <th className="py-2 pl-2 bg-gray-400 text-left">
                Thông tin bài thi
              </th>
              <th className="py-2 pl-2 bg-gray-400 text-left">
                Kết quả bài thi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            <tr className="*:py-3 text-left">
              <td>
                <div className="grid grid-cols-3 ml-2">
                  <span>Tên bài thi: {data.submission.Test.title}</span>
                  <span className="col-span-2"></span>
                </div>
              </td>
              <td>
                <div className="grid grid-cols-3 ml-2">
                  <span>Điểm: {data.submission.score}</span>
                  <span className="col-span-2"></span>
                </div>
              </td>
            </tr>
            <tr className="*:py-3 text-left bg-gray-300">
              <td>
                <div className="grid grid-cols-3 ml-2">
                  <span>Môn học: {data.submission.Test.subject}</span>
                  <span className="col-span-2"></span>
                </div>
              </td>
              <td>
                <div className="grid grid-cols-3 ml-2">
                  <span>Số câu đúng: {data.submission.score / 10}</span>
                  <span className="col-span-2"></span>
                </div>
              </td>
            </tr>
            <tr className="*:py-3 text-left">
              <td>
                <div className="grid grid-cols-3 ml-2">
                  <span>Mã bài: {data.submission.Test.code}</span>
                  <span className="col-span-2"></span>
                </div>
              </td>
              <td>
                <div className="grid grid-cols-3 ml-2">
                  <span>
                    Số câu sai:{" "}
                    {data.submission.Test.quantity - data.submission.score / 10}
                  </span>
                  <span className="col-span-2"></span>
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
      <div className="mx-5 mt-5">
        {data?.submission.Test.Questions.map((question, index) => {
          const studentAnswer = data.answers.find(
            (a) => a.question_id === question.id
          );

          return (
            <div
              key={question.id}
              className="mb-6 border border-gray-300 rounded-xl p-4 shadow-sm"
            >
              <h3 className="font-semibold mb-2">
                Câu {index + 1}: {question.question_text}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {question.Answers.map((ans) => {
                  const isStudentChosen = studentAnswer?.answer_id === ans.id;
                  const isCorrect = ans.is_correct;

                  let colorClass = "bg-white";
                  if (isStudentChosen && isCorrect) colorClass = "bg-green-200";
                  else if (isStudentChosen && !isCorrect)
                    colorClass = "bg-red-200";
                  return (
                    <div
                      key={ans.id}
                      className={`p-2 border rounded-md ${colorClass}`}
                    >
                      {ans.answer_text}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </DefaultLayout>
  );
}

export default DetailResult;
