import DefaultLayout from "../../Layouts/DefaultLayout";
import Pagination from "../../components/Pagination";
import { TableResult } from "../../components/Table";
import { header, colums, tableData } from "./data";
import {useEffect} from "react";

function Result() {
    useEffect(() => {
        document.title="Result"
    },[])
    return ( 
        <DefaultLayout>
            <h1 className="text-2xl text-gray-500 font-bold ml-5 mt-5">Danh sách bài thi</h1>
            <TableResult header={header} columns={colums} data={tableData}/>
            <Pagination totalItems={50} itemsPerPage={5} onPageChange={(page) => console.log('Current page:', page)} />
        </DefaultLayout>
     );
}

export default Result;