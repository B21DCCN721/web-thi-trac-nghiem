import { useRef, useState } from "react";
import CardQuestion from "../../components/Card/CardQuestion";
import ControlTest from "../../components/ControlTest";
import TestLayout from "../../Layouts/TestLayout";
import data from "./data";
import Dialog from "../../components/Dialog";
import { useNavigate } from "react-router-dom";

function TestStart() {
    const navigate = useNavigate()
    const itemsRef = useRef([])
    const [showDialog, setShowDialog] = useState(false)
    const handleExit = () => {
        setShowDialog(true)
    }
    const handleConfim = () => {
        //xử lý khi xác nhận thoát làm bài
        navigate('/home')
    }
    const handleClickAnswer = (e) => {
      console.log(e.target.value);
    }
    
    // Hàm xử lý cuộn đến phần tử tương ứng
  const scrollToSection = (index) => {
    itemsRef.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" }); 
  };
  
  return (
    <TestLayout>
      <div className="flex">
        <div className="flex-1">
            {data.map((item, index) => (
              <CardQuestion
                ref={(ele) => {itemsRef.current[index] = ele}}
                key={index}
                info={item}
                onClickAnswer={handleClickAnswer}
              />
            ))}
        </div>
        <ControlTest data={data} handleExit={handleExit} handleScroll={scrollToSection}/>
      </div>
      {showDialog && <Dialog header='Thoát' text='Thoát sẽ không lưu kết quả làm bài, xác nhận thoát?' handleClose={() => setShowDialog(false)} handleConfim={handleConfim} />}
    </TestLayout>
  );
}

export default TestStart;
