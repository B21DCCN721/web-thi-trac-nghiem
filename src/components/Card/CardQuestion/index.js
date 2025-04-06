import { forwardRef, useState } from "react";
import PropTypes from "prop-types";

function CardQuestion({ info, indexQuestion, onClickAnswer }, ref) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClickAnswer = (index, item) => {
    setSelectedIndex(index);
    onClickAnswer(info.id,item.id);
  };
  
  return (
    <div
      className="shadow-lg shadow-rose-100 ml-10 mr-2 mt-5 rounded-lg bg-white w-3/4"
      ref={ref}
    >
      <div className="grid grid-rows-6 px-10 py-10 ">
        <h1 className="font-bold text-2xl">Câu {indexQuestion}</h1>
        <h1 className="font-bold text-lg">{info.question_text}</h1>
        {info.Answers.map((item, index) => (
          <input
            key={index}
            className={`outline-none cursor-pointer p-2 rounded shadow shadow-rose-100 bg-rose-200 my-1 ${
              selectedIndex === index
                ? "bg-rose-200/20 ease-in-out duration-700 delay-[25ms]"
                : ""
            } `}
            type="text"
            value={item.answer_text}
            readOnly
            onClick={(e) => handleClickAnswer(index, item)}
          />
        ))}
      </div>
    </div>
  );
}
CardQuestion.propTypes = {
  info: PropTypes.object,
  index: PropTypes.number,
  onClickAnswer: PropTypes.func,
};

export default forwardRef(CardQuestion);
