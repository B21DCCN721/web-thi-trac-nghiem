import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import axiosClient from "../../../configs/axiosClient";
import isValidQuestion from "../../../helpers/isValidQuestion";
import { useNavigate } from "react-router-dom";

export default function CreateTest() {
  const initialQuestion = {
    question: "",
    options: ["", "", "", ""],
    correctAnswer: null, // index (0-3)
  };
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([initialQuestion]);

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
    setQuestions([...questions, initialQuestion]);
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
    if (!title || !subject || !description) {
      alert("Vui lòng điền đầy đủ thông tin bài thi");
      return;
    }
    // const isValid = questions.every((q) => {
    //   return (
    //     q.question.trim() !== "" &&
    //     q.options.every((opt) => opt.trim() !== "") &&
    //     q.correctAnswer !== null
    //   );
    // });

    if (!isValidQuestion(questions)) {
      alert(
        "Vui lòng điền đầy đủ nội dung câu hỏi, các đáp án và chọn đáp án đúng."
      );
      return;
    }

    try {
      const response = await axiosClient.post("/api/admin/create-test", payload);
      if (response.status === 201 && response.data.code === 1) {
        alert("Tạo bài thi thành công!");
        // Reset form
        setTitle("");
        setSubject("");
        setDescription("");
        setQuestions([
          initialQuestion,
        ]);
        navigate("/admin/library")
      } else {
        alert("Tạo bài thi không thành công. Vui lòng thử lại.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Lỗi khi tạo bài thi:", error.response);
        alert("Đã xảy ra lỗi khi tạo bài thi. Vui lòng kiểm tra lại.");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-700 text-center">
          Tạo bài thi trắc nghiệm
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium">Tên bài thi</label>
            <input
              type="text"
              className="w-full border p-2 rounded mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium">Môn học</label>
            <input
              type="text"
              className="w-full border p-2 rounded mt-1"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium">Mô tả</label>
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
                <label className="block font-medium">
                  Câu hỏi {qIndex + 1}
                </label>
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
            Tạo bài thi
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
