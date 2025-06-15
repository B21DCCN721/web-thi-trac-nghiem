import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import avatarPlaceholder from "../../assets/imgs/avatar.png"; // hình mặc định

const Comment = ({ comment, onReplySubmit }) => {
  const [replying, setReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReply = () => {
    if (replyContent.trim() !== "") {
      onReplySubmit(comment.parent_id || comment.id, replyContent);
      setReplyContent("");
      setReplying(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2 my-2">
      <div className="flex items-start space-x-3">
        <img
          src={comment.User.avatar || avatarPlaceholder}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 bg-gray-100 p-3 rounded-lg shadow-sm">
          <div className="font-semibold text-gray-800">{comment.User.name}</div>
          <div className="text-sm text-gray-700 mt-1">{comment.content}</div>
          <div className="text-xs text-gray-500 mt-1">
            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: vi })}
          </div>
          <button
            onClick={() => setReplying(!replying)}
            className="text-sm text-blue-500 mt-1 hover:underline"
          >
            Phản hồi
          </button>

          {replying && (
            <div className="mt-2">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Viết phản hồi..."
                className="w-full p-2 border rounded-md text-sm"
              />
              <button
                onClick={handleReply}
                className="mt-1 text-white bg-blue-500 px-3 py-1 rounded-md text-sm"
              >
                Gửi
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Render comment con */}
      {comment.replies?.length > 0 && (
        <div className="pl-12 mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} onReplySubmit={onReplySubmit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
