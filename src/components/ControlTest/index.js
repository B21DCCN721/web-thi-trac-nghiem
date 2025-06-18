import PropTypes from "prop-types";
import Button from "../Button";

function ControlTest({handleExit, handleSubmit, handleScroll, data}) {

    return (  
        <div className="fixed top-28 right-10 rounded shadow-lg shadow-rose-100 bg-white w-1/6">
            <p className="ml-5 text-center">Chọn để chuyển câu</p>
           <div className="flex justify-center items-center flex-wrap">
                {data.map((item, index) => (
                    <Button  key={index} sx="bg-white !text-black border border-black hover:bg-rose-200 m-2" onClick={() => handleScroll(index)}>{index + 1}</Button>
                ))}
           </div>
            <div className="m-5"><Button sx="w-full mx-0 font-bold" onClick={handleSubmit}>Nộp bài</Button></div>
            <div className="m-5"><Button sx="w-full mx-0 font-bold" onClick={handleExit}>Thoát</Button></div>
        </div>
    );
}
ControlTest.propTypes = {
    handleExit: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleScroll: PropTypes.func,
    data: PropTypes.array,
}
export default ControlTest;