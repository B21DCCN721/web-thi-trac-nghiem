import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";

export default function EditTest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: null, // index (0-3)
    },
  ]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      questions,
    };

    console.log("Data gửi lên server:", payload);
    alert("Dữ liệu bài thi đã được log ở console (gửi lên server).");

    // Bạn có thể thay bằng gọi API như:
    // fetch("/api/quiz", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-700 text-center">
          Chỉnh sửa bài thi
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
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition block mx-auto"
          >
            Gửi bài thi
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
