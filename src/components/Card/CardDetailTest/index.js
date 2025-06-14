// import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCircleQuestion, faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import formatDate from "../../../helpers/fomatDate";
function CardDetailTest({info}) {
    const navigate = useNavigate();
    // const [selectedTime, setSelectedTime] = useState('0');

    // const handleChange = (event) => {
    //     setSelectedTime(event.target.value);
    // };
    const handleStartTest = () => {
        navigate(`/test/${info.id}`)
    }
    return ( 
        <div className="mx-5 mt-5 rounded-md shadow-lg *:m-5">
            <h1 className="font-bold text-xl">{info.title}</h1>
            <p><span className="mr-3"><FontAwesomeIcon icon={faUser} /></span>Môn học: {info.subject}</p>
            <p><span className="mr-3"><FontAwesomeIcon icon={faUser} /></span>Mã bài thi: {info.code}</p>
            <p><span className="mr-3"><FontAwesomeIcon icon={faClock} /></span>Thời gian làm tạo: {formatDate(info.created_at)}</p>
            <p><span className="mr-3"><FontAwesomeIcon icon={faUser} /></span>Tác giả: {info.author}</p>
            <p><span className="mr-3"><FontAwesomeIcon icon={faCircleQuestion} /></span>Số câu hỏi: {info.quantity}</p>
            <p><span className="mr-3"><FontAwesomeIcon icon={faUser} /></span>Số lượt làm: {info.attempts}</p>
            <p><span className="mr-3"><FontAwesomeIcon icon={faUser} /></span>Mô tả: {info.description}</p>
            {/* <div>
                <select 
                    value={selectedTime} 
                    onChange={handleChange} 
                    className="p-2 border rounded-lg text-lg w-full outline-none"
                >
                    <option value="0">0 phút</option>
                    <option value="15">15 phút</option>
                    <option value="30">30 phút</option>
                    <option value="60">60 phút</option>
                    <option value="120">120 phút</option>
                </select>
            </div> */}
            <Button onClick={handleStartTest}>Bắt đầu</Button>
        </div>
     );
}
CardDetailTest.propTypes = {
    info: PropTypes.object,
}
export default CardDetailTest;