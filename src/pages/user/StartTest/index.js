import { useEffect, useRef, useState } from "react";
import CardQuestion from "../../../components/Card/CardQuestion";
import ControlTest from "../../../components/ControlTest";
import Dialog from "../../../components/Dialog";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../configs/axiosClient";
import Loading from "../../../components/Loading";

function StartTest() {
  const navigate = useNavigate();
  const { id } = useParams();
  const itemsRef = useRef([]);
  const [showDialog, setShowDialog] = useState(false);
  const [answers, setAnswers] = useState([]); // Lưu đáp án đã chọn
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleExit = () => {
    setShowDialog(true);
  };

  const handleConfim = () => {
    // xử lý khi xác nhận thoát làm bài
    navigate("/home");
  };

  const handleClickAnswer = (question_id, answer_id) => {
    console.log(question_id, answer_id);

    // Cập nhật lại state của đáp án đã chọn
    setAnswers((prevAnswers) => {
      // Kiểm tra nếu đã chọn đáp án cho câu hỏi này rồi
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.question_id === question_id
      );

      if (existingAnswerIndex >= 0) {
        // Nếu có rồi, chỉ cần cập nhật lại
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { question_id, answer_id };
        return updatedAnswers;
      } else {
        // Nếu chưa có, thêm vào danh sách đáp án
        return [...prevAnswers, { question_id, answer_id }];
      }
    });
  };

  const handleSubmit = async() => {
    try {
      const response = await axiosClient.post("/api/test/submit-test", {
        test_id: id,
        answers: answers,
      });
      if(response.status === 201 && response.data.code === 1) {
        alert("Đáp án đã được gửi thành công.");
        navigate("/home");
      } else {
        alert("Không thể gửi đáp án. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi đáp án:", error);
      setError("Không thể gửi đáp án. Vui lòng thử lại sau.");
    }
  };

  // Hàm xử lý cuộn đến phần tử tương ứng
  const scrollToSection = (index) => {
    itemsRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };
  // call app để lấy dữ liệu bài thi
  useEffect(() => {
    const getInfoTest = async () => {
      try {
        const response = await axiosClient.get(`api/test/get-detail-test/${id}`);
        if (response.status === 200 && response.data.code === 1) {
          setData(response.data?.data);
        } else {
          setError("Không thể tải thông tin bài thi.");
        }
      } catch (error) {
        if (error.response) {
          console.error("Lỗi khi lấy thông tin bài thi:", error.response.data);
          setError(error.response.data.message || "Không thể tải thông tin bài thi.");
        }
      } finally {
        setLoading(false);
      }
    };
    getInfoTest();
  },[])
  if (loading) {
    return (
      <div className="container mx-auto min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mx-auto text-center mt-10">
        <h1 className="text-red-500 text-xl font-bold">{error}</h1>
      </div>
    );
  }
  return (
    <div className="container mx-auto bg-gray-200 min-h-screen">
      <h1 className="font-bold text-center text-lg pt-10 pb-5">{data.title}</h1>
      <div className="flex">
        <div className="flex-1">
          {data.Questions.map((item, index) => (
            <CardQuestion
              ref={(ele) => {
                itemsRef.current[index] = ele;
              }}
              key={index}
              info={item}
              indexQuestion={index + 1}
              onClickAnswer={handleClickAnswer}
            />
          ))}
        </div>
        <ControlTest
          data={data.Questions}
          handleExit={handleExit}
          handleScroll={scrollToSection}
          handleSubmit={handleSubmit}
        />
      </div>
      {showDialog && (
        <Dialog
          header="Thoát"
          text="Thoát sẽ không lưu kết quả làm bài, xác nhận thoát?"
          handleClose={() => setShowDialog(false)}
          handleConfim={handleConfim}
        />
      )}
    </div>
  );
}

export default StartTest;
