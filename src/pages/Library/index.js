import DefaultLayout from "../../Layouts/DefaultLayout";
import Search from "../../components/Search";
import { TableLibrary } from "../../components/Table";
import Pagination from "../../components/Pagination";
import { useEffect } from "react";

import { header, colums, tableData } from "./data";
import Button from "../../components/Button";

function Library() {
    useEffect(() => {
        document.title="Library"
    },[])
    return ( 
        <DefaultLayout>
            <div className="mx-5 my-5 border rounded-t-lg shadow-lg">
                <h1 className="text-2xl text-white bg-red-500 font-bold p-3 rounded-t-lg"><span className="ml-3">Danh sách bài thi đã làm</span></h1>
                <div className="flex mt-3"><Search/>
                <Button>Tạo mới</Button>
                </div>
                <TableLibrary header={header} columns={colums} data={tableData}/>
                <Pagination totalItems={50} itemsPerPage={5} onPageChange={(page) => console.log('Current page:', page)} />
            </div>
        </DefaultLayout>
     );
}

export default Library;