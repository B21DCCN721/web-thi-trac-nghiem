
import PropTypes from "prop-types";

function TestLayout({nameTest='Tên bài thi', children}) {
    return ( 
        <div className="container mx-auto bg-gray-200 min-h-screen">
            <h1 className="font-bold text-center text-lg pt-10 pb-5">{nameTest}</h1>
            {children}
        </div>
     );
}

TestLayout.propTypes = {
    nameTest: PropTypes.string,
    children: PropTypes.node,
}
export default TestLayout;