import PropTypes from "prop-types";
import Button from "../../Button";

// tên của columns phải trùng với các key của các item trong data
function TableResult({header, data, columns}) {
    return ( 
        <div className="mx-5 my-5">
            <table className="w-full table-auto text-center border rounded-lg divide-y divide-solid shadow-md">
                <thead className="">
                    <tr>
                        {header.map((item, index) => (
                            <th key={index} className="py-2">{item}</th>
                        ))}
                        <th className="py-2">Chi tiết</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                    {data.map((item, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? "bg-gray-200" : ""}`}>
                            {columns.map((column, index) => (
                                <td key={index} className="py-3">{item[column]}</td>
                            ))}
                            <td>
                                <Button>Xem chi tiết</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
     );
}

TableResult.propTypes = {
    header: PropTypes.array,
    data: PropTypes.array,
    columns: PropTypes.array,
}

export default TableResult;