import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import TableResultTest from "../../components/Table/TableResultTest";
import DefaultLayout from "../../Layouts/DefaultLayout";
import CardQuestion from "../../components/Card/CardQuestion";
import { tableData, data } from "./data";


function ResultTest() {
    const {id} = useParams()
    const navigate = useNavigate()
    const handleClickRedoTest = () => {
        navigate(`/test/${id}`)
    }
    return ( 
        <DefaultLayout>
            <h1 className="font-bold ml-5 my-10 text-xl">Tên bài thi</h1>
            <TableResultTest data={tableData}/>
            <div className="flex items-center ml-5"><h2 className="font-bold text-xl text-gray-600">Chi tiết các câu hỏi</h2>
                <Button onClick={handleClickRedoTest}>Làm lại</Button>
            </div>
            <div>
            {data.map((item, index) => (
              <CardQuestion
                key={index}
                info={item}
              />
            ))}
            </div>
        </DefaultLayout>
     );
}

export default ResultTest;