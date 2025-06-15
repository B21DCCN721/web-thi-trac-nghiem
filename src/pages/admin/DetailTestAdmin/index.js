import AdminLayout from "../../../layouts/AdminLayout";

function DetailTestAdmin() {
    return (  
        <AdminLayout>
            <div className="p-5">
                <h1 className="text-2xl font-bold mb-4">Chi tiết bài thi</h1>
                {/* Nội dung chi tiết bài thi sẽ được hiển thị ở đây */}
                <p>Thông tin chi tiết về bài thi sẽ được hiển thị tại đây.</p>
            </div>
        </AdminLayout>
    );
}

export default DetailTestAdmin;