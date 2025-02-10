import PropTypes from "prop-types";
function LayoutTest({nameTest='Tên bài thi', children}) {
    return ( 
        <div className="container mx-auto bg-gray-200">
            <h1 className="font-bold text-center text-lg">{nameTest}</h1>
            {children}
        </div>
     );
}

LayoutTest.propTypes = {
    nameTest: PropTypes.string,
    children: PropTypes.node,
}
export default LayoutTest;