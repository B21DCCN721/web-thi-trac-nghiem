import PropTypes from "prop-types";
import Button from "../Button";

function Dialog({ header, text, handleClose, handleConfim }) {
  return (
    <div className="h-screen w-full fixed flex justify-center items-center top-0 left-0 bg-gray-500/50">
      <div className="w-[400px] h-[200px] bg-white text-center rounded grid grid-rows-3">
        <h1 className="font-bold text-lg mt-5">{header}</h1>
        <p className="text-[18px]">{text}</p>
        <div>
          <Button onClick={handleClose}>Đóng</Button>
          <Button onClick={handleConfim}>Xác nhận</Button>
        </div>
      </div>
    </div>
  );
}

Dialog.propTypes = {
  handleClose: PropTypes.func,
  handleConfim: PropTypes.func,
};
export default Dialog;
