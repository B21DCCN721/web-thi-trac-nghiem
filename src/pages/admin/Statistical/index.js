import React from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { LineChart } from "../../../components/Chart";


function Statistical() {
    return ( 
        <AdminLayout>
            <div className="border rounded-t-lg shadow-lg">
                <h1 className="text-2xl text-white bg-red-600 font-bold p-3 rounded-t-lg">
                    <span className="ml-3">Thống kê</span>
                </h1>
                <div className="p-5 flex justify-between items-center flex-wrap gap-5 *:text-center *:flex-1 *:border *:rounded-lg *:p-5 *:shadow-md *:bg-rose-200">
                    <div>
                        <h2 className="text-xl font-bold mb-3">Số lượng bài thi đã tạo</h2>
                        <p className="text-lg"><span className="font-semibold">10</span></p>
                    </div>
                    <div >
                        <h2 className="text-xl font-bold mb-3">Số lượng sinh viên đã làm bài</h2>
                        <p className="text-lg"><span className="font-semibold">50</span></p>
                    </div>
                    <div >
                        <h2 className="text-xl font-bold mb-3">Điểm trung bình của các bài thi</h2>
                        <p className="text-lg"><span className="font-semibold">8.5</span></p>
                    </div>
                </div>
            </div>
            <div className="mt-5 border rounded-t-lg shadow-lg">
                <LineChart/>
            </div>
        </AdminLayout>
     );
}

export default Statistical;