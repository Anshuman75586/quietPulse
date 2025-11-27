import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { axios } = useAppContext();
  const { title, createdAt, isPublished, _id } = blog;

  const blogDate = createdAt ? new Date(createdAt).toDateString() : "—";

  const deleteBlog = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const { data } = await axios.post("/api/blog/delete", { id: _id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message || "Failed to delete blog");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message || "Failed to toggle publish state");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300 text-sm sm:text-base">
      <th className="px-2 py-4 text-center">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{blogDate}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <span
          className={`font-medium ${
            isPublished ? "text-green-600" : "text-orange-700"
          }`}
        >
          {isPublished ? "Published" : "Unpublished"}
        </span>
      </td>
      <td className="px-2 py-4 flex items-center gap-3">
        <button
          onClick={togglePublish}
          className={`border px-3 py-1 rounded transition-all duration-200 ${
            isPublished
              ? "border-orange-600 text-orange-600 hover:bg-orange-50"
              : "border-green-600 text-green-600 hover:bg-green-50"
          }`}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          src={assets.cross_icon}
          alt="delete"
          className="w-6 hover:scale-110 transition-all cursor-pointer"
          onClick={deleteBlog}
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
