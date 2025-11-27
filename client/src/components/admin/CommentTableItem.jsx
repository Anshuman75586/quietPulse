import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  // Approve comment
  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });

      if (data.success) {
        toast.success(data.message);
        fetchComments(); // refresh comments after approval
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Delete comment
  const deleteComment = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this comment?"
      );
      if (!confirmDelete) return;

      const { data } = await axios.post("/api/admin/delete-comment", {
        id: _id,
      });

      if (data.success) {
        toast.success(data.message);
        fetchComments(); // refresh comments after deletion
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-6 py-4 align-middle">
        <p>
          <b className="font-medium text-gray-600">Blog:</b>{" "}
          {blog?.title || "N/A"}
        </p>
        <p>
          <b className="font-medium text-gray-600">Name:</b> {comment.name}
        </p>
        <p>
          <b className="font-medium text-gray-600">Comment:</b>{" "}
          {comment.content}
        </p>
      </td>

      <td className="px-6 py-4 align-middle max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>

      <td className="px-6 py-4 align-middle">
        <div className="flex items-center justify-center gap-3">
          {!comment.isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              alt="Approve"
              className="w-5 transform rotate-0 hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <p className="text-xs font-medium border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1 text-center">
              Approved
            </p>
          )}

          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt="Delete"
            className="w-5 transform rotate-0 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
