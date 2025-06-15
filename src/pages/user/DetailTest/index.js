import { CardDetailTest } from "../../../components/Card";
import DefaultLayout from "../../../layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import Comment from "../../../components/Comment";
import axiosClient from "../../../configs/axiosClient";
import Button from "../../../components/Button";
function DetailTest() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loadingInfoTest, setLoadingInfoTest] = useState(true);
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

  if (loadingComment || loadingInfoTest) {
    return (
      <DefaultLayout>
        <Loading />
      </DefaultLayout>
    );
  }
  if (error) {
    return (
      <DefaultLayout>
        <div className="text-red-500 text-center mt-10">{error}</div>
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout>
      <CardDetailTest info={data} />
      <div className="mx-5 my-5 bg-white p-5 rounded-lg shadow-md">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Viết bình luận..."
          className="w-full p-3 border rounded-md text-sm"
        />
        <Button
          sx="m-0"
          onClick={handleCommentSubmit}
        >
          Gửi
        </Button>
      </div>

      <div className="mx-5 my-5 bg-white p-5 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-3">Bình luận</h2>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onReplySubmit={handleReplySubmit}
          />
        ))}
      </div>
    </DefaultLayout>
  );
}

export default DetailTest;
