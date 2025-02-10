import PropTypes from "prop-types";

import Button from "../Button";


function Card({ image, info }) {
    return ( 
        <div className="card-baithi flex justify-between items-center rounded-md shadow-lg shadow-gray-400 bg-rose-200 max-width-full h-24 mx-5 my-3">
            <div className="image-time flex text-slate-600">
                <img className="rounded size-16 border-2 border-gray-300 mx-4" src={image} alt="ảnh bài thi "/>
                <div>
                    <h4 className="font-bold">{info.time}</h4>
                    <p className="mt-3">{info.name}</p>
                </div>
            </div>
            <div className="detail-info text-slate-600">
                <p>Tác giả: {info.author}</p>
                <p>Số câu: {info.quantity}</p>
                <p>Số lượt làm: {info.turn}</p>
            </div>
            <div className="action mr-4">
                <Button type={'button'}>Chi tiết</Button>
                <Button type={'button'}>Vào thi</Button>
            </div>
        </div>
     );
}

Card.propTypes = {
    img: PropTypes.node,
    info: PropTypes.object,
}
export default Card;