import { useRef, useState } from "react";
import CardQuestion from "../../components/Card/CardQuestion";
import ControlTest from "../../components/ControlTest";
import TestLayout from "../../Layouts/TestLayout";
import Dialog from "../../components/Dialog";
import { useNavigate, useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import Loading from "../../components/Loading";
import usePostData from "../../hooks/usePostData";

function TestStart() {
  const navigate = useNavigate();
  const { id } = useParams();
  const itemsRef = useRef([]);
  const [showDialog, setShowDialog] = useState(false);
  const [answers, setAnswers] = useState([]); // Lưu đáp án đã chọn
  const apiGetDetailTest = useGetData(`/test/detail/${id}`);
  const apiSubmitTest = usePostData("/test/submit");
  console.log(answers);
  
  const handleExit = () => {
    setShowDialog(true);
  };

  const handleConfim = () => {
    // xử lý khi xác nhận thoát làm bài
    navigate('/home');
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

  const handleSubmit = () => {
    // Gửi dữ liệu đáp án lên server hoặc xử lý khác
    apiSubmitTest.post({
      "test_id":apiGetDetailTest.data.id,
      "answers": answers,
    })
    console.log("Submitted Answers:", answers, "test_id:", apiGetDetailTest.data.id);
    navigate('/home');
  };

  // Hàm xử lý cuộn đến phần tử tương ứng
  const scrollToSection = (index) => {
    itemsRef.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (apiGetDetailTest.data === null || apiGetDetailTest.loading === true) {
    return (
      <TestLayout>
        <Loading />
      </TestLayout>
    );
  }

  return (
    <TestLayout nameTest={apiGetDetailTest.data.title}>
      <div className="flex">
        <div className="flex-1">
          {apiGetDetailTest.data.Questions.map((item, index) => (
            <CardQuestion
              ref={(ele) => { itemsRef.current[index] = ele }}
              key={index}
              info={item}
              indexQuestion={index + 1}
              onClickAnswer={handleClickAnswer}
            />
          ))}
        </div>
        <ControlTest
          data={apiGetDetailTest.data.Questions}
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
    </TestLayout>
  );
}

export default TestStart;
