import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import axiosClient from "../../../configs/axiosClient";
import Loading from "../../../components/Loading";
import isValidQuestion from "../../../helpers/isValidQuestion";

export default function EditTest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([
    // {
    //   question: "",
    //   options: ["", "", "", ""],
    //   correctAnswer: null, // index (0-3)
    // },
  ]);
  const [loading, setLoading] = useState(true);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswer = parseInt(value);
    setQuestions(newQuestions);
  };
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: null, // index (0-3)
      },
    ]);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      subject,
      questions,
    };
    if(!isValidQuestion(questions)){
      alert("Vui lòng điền đầy đủ nội dung câu hỏi, các đáp án và chọn đáp án đúng.")
      return;
    }
    try {
      const response = await axiosClient.put(
        `api/admin/update-test/${id}`,
        payload
      );
      if (response.status === 200 && response.data.code === 1) {
        alert("Cập nhật bài thi thành công");
        navigate(`/admin/library/detail-test/${id}`)
      }
    } catch (error) {
      console.log("Lỗi cập nhật bài thi: ", error);
      alert("Cập nhật bài thi thất bại vui lòng thử lại sau.");
    }
  };
  // api lấy dữ liệu bài thi
  useEffect(() => {
    const getDetailTest = async () => {
      try {
        const response = await axiosClient.get(
          `api/test/get-detail-test/${id}`
        );
        if (response.status === 200 && response.data.code === 1) {
          setTitle(response.data.data.title);
          setSubject(response.data.data.subject);
          setDescription(response.data.data.description);
          setQuestions(
            response.data.data.Questions.map((q) => {
              const options = q.Answers.map((a) => a.answer_text);
              const correctIndex = q.Answers.findIndex((a) => a.is_correct);

              return {
                question: q.question_text,
                options: options,
                correctAnswer: correctIndex,
              };
            })
          );
        }
      } catch (error) {
        console.log("Error fetching test data:", error);
      } finally {
        setLoading(false);
      }
    };
    getDetailTest();
  }, [id]);
  if (loading) {
    return (
      <AdminLayout>
        <Loading />
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-700 text-center">
          Chỉnh sửa bài thi
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-medium">Tên bài thi</label>
            <input
              type="text"
              className="w-full border p-2 rounded mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="font-medium">Môn học</label>
            <input
              type="text"
              className="w-full border p-2 rounded mt-1"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="font-medium">Mô tả</label>
            <textarea
              className="w-full border p-2 rounded mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="relative border p-4 rounded-lg bg-gray-50 space-y-4"
            >
              {/* Nút Xóa */}
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  title="Xóa câu hỏi"
                >
                  🗑
                </button>
              )}
              <div>
                <label className="font-medium">Câu hỏi {qIndex + 1}</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded mt-1"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {q.options.map((opt, oIndex) => (
                  <div key={oIndex} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      value={oIndex}
                      checked={q.correctAnswer === oIndex}
                      onChange={(e) =>
                        handleCorrectAnswerChange(qIndex, e.target.value)
                      }
                    />
                    <div className="w-full">
                      <label className="text-sm font-medium block">
                        Đáp án {String.fromCharCode(65 + oIndex)}
                      </label>
                      <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={opt}
                        onChange={(e) =>
                          handleOptionChange(qIndex, oIndex, e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            + Thêm câu hỏi
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition block mx-auto"
          >
            Xác nhận chỉnh sửa
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
