import AdminLayout from "../../../layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import Comment from "../../../components/Comment";
import axiosClient from "../../../configs/axiosClient";
import Button from "../../../components/Button";
import Pagination from "../../../components/Pagination";
import formatDate from "../../../helpers/fomatDate";
function DetailTestAdmin() {
  const { id } = useParams();
  const limit = 5; // số lượng bài làm mỗi trang
  const [data, setData] = useState(null); // dữ liệu bài thi
  const [submissions, setSubmissions] = useState([]); // danh sách bài làm của học sinh
  const [currentPage, setCurrentPage] = useState(1);
  const [averageScore, setAverageScore] = useState(0);
  const [loadingInfoTest, setLoadingInfoTest] = useState(true);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);
  const [loadingComment, setLoadingComment] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  // call api lấy thông tin bài thi và danh sách bình luận
  useEffect(() => {
    const getInfoTest = async () => {
      try {
        const response = await axiosClient.get(`api/test/get-info-test/${id}`);
        if (response.status === 200 && response.data.code === 1) {
          setData(response.data?.data);
        }
      } catch (error) {
        console.error(error);
        setError("Không thể tải thông tin bài thi.");
      } finally {
        setLoadingInfoTest(false);
      }
    };

    const getComments = async () => {
      try {
        const res = await axiosClient.get(`/api/comment/get-comments/${id}`);
        if (res.status === 200 && res.data.code === 1) {
          setComments(res.data.data);
        }
      } catch (err) {
        console.error("Lỗi khi lấy bình luận:", err);
      } finally {
        setLoadingComment(false);
      }
    };

    getInfoTest();
    getComments();
  }, [id]);
  // call api lấy điểm trung bình bài test
  useEffect(() => {
    const getAverageScore = async () => {
      try {
        const response = await axiosClient.get(
          `api/admin/average-score-test/${id}`
        );
        if (response.status === 200 && response.data.code === 1) {
          setAverageScore(response.data.data.average_score);
        }
      } catch (error) {
        console.log("Lỗi khi lấy điểm trung bình: ", error);
      }
    };
    getAverageScore();
  }, [id]);
  // call api lấy danh sách bài làm của học sinh
  useEffect(()=> {
    const getSubmissions = async () => {
      try {
        const response = await axiosClient.get(`api/admin/student-submissions/${id}`, {
          params: {
            page: currentPage,
            limit: limit,
          },
        });
        if (response.status === 200 && response.data.code === 1) {
          setSubmissions(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài làm:", error);
      }finally{
        setLoadingSubmissions(false);
      }
    };
    getSubmissions();
  }, [id, currentPage, limit]);

  // logic phần comment
  const handleReplySubmit = async (parentId, content) => {
    try {
      const res = await axiosClient.post("/api/comment/create-comment", {
        test_id: Number(id),
        content,
        parent_id: parentId, // nếu comment cha thì để null
      });

      if (res.status === 201 && res.data.code === 1) {
        // Reload comment sau khi gửi thành công
        const reload = await axiosClient.get(`/api/comment/get-comments/${id}`);
        if (reload.status === 200 && reload.data.code === 1) {
          setComments(reload.data.data);
        }
      }
    } catch (err) {
      console.error("Lỗi khi gửi phản hồi:", err);
    }
  };
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await axiosClient.post("/api/comment/create-comment", {
        test_id: Number(id),
        content: newComment,
        parent_id: null, // comment cha
      });

      if (res.status === 201 && res.data.code === 1) {
        setNewComment(""); // clear input
        const reload = await axiosClient.get(`/api/comment/get-comments/${id}`);
        if (reload.status === 200 && reload.data.code === 1) {
          setComments(reload.data.data);
        }
      }
    } catch (err) {
      console.error("Lỗi khi gửi bình luận:", err);
    }
  };

  if (loadingComment || loadingInfoTest || loadingSubmissions) {
    return (
      <AdminLayout>
        <Loading />
      </AdminLayout>
    );
  }
  if (error) {
    return (
      <AdminLayout>
        <div className="text-red-500 text-center mt-10">{error}</div>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <div className="p-5 rounded-lg shadow-md font-semibold *:my-2">
        <h1 className="text-2xl font-bold">Thông tin bài thi</h1>
        <p>Tên bài thi: {data.title}</p>
        <p>Môn học: {data.subject}</p>
        <p>Mã bài thi: {data.code}</p>
        <p>Thời gian tạo: {formatDate(data.created_at)}</p>
        <p>Số câu hỏi: {data.quantity}</p>
        <p>Số lượt làm: {data.attempts}</p>
        <p>Mô tả: {data.description}</p>
        <p>Điểm trung bình của bài thi: {averageScore}</p>
      </div>
      <div className="my-5 p-5 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Lịch sử làm bài của học sinh</h1>
        <table className="w-full table-auto mt-3 text-center border rounded-lg divide-y divide-solid shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2">Tên học sinh</th>
              <th className="px-4 py-2">Email học sinh</th>
              <th className="px-4 py-2">Điểm</th>
              <th className="px-4 py-2">Thời gian nộp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-3">Chưa có bài làm nào</td>
              </tr>
            ) : (
              submissions.submissions.map((submission, index) => (
                <tr key={index} className={`${index % 2 === 0 ? "bg-gray-200" : ""}`}>
                  <td className="px-4 py-3">{submission.User.name}</td>
                  <td className="px-4 py-3">{submission.User.email}</td>
                  <td className="px-4 py-3">{submission.score}</td>
                  <td className="px-4 py-3">{formatDate(submission.submitted_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination
          totalItems={submissions.pagination.total}
          itemsPerPage={limit}
          onPageChange={(page) =>setCurrentPage(page)}
        />
      </div>
      <div className="my-5 p-5 rounded-lg shadow-md">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Viết bình luận..."
          className="w-full p-3 border rounded-md text-sm"
        />
        <Button onClick={handleCommentSubmit}>Gửi</Button>
      </div>

      <div className="my-5 p-5 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-3">Bình luận</h2>
        {comments.length === 0 ? (
          <p>Chưa có bình luận nào</p>
        ) : (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onReplySubmit={handleReplySubmit}
            />
          ))
        )}
      </div>
    </AdminLayout>
  );
}

export default DetailTestAdmin;
