import { forwardRef } from "react";
import PropTypes from "prop-types";

function CardQuestion({info, onClickAnswer}, ref) {

    return ( 
        <div className="shadow-lg shadow-rose-100 ml-10 mr-2 mt-5 rounded-lg bg-white w-3/4" ref={ref}>
            <div className="grid grid-rows-6 px-10 py-10 ">
                <h1 className="font-bold text-2xl">Câu {info.number}</h1>
                <h1 className="font-bold text-lg">{info.question}</h1>
                {info.answer.map((item, index) => (
                    <input key={index} className={`outline-none cursor-pointer p-2 rounded shadow shadow-rose-100 bg-rose-200 my-1 `} type="text" value={item} readOnly onClick={onClickAnswer}/>
                ))}
            </div>
        </div>
     );
}
CardQuestion.propTypes = {
    info: PropTypes.object,
    onClickAnswer: PropTypes.func,
}

export default forwardRef(CardQuestion);