import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Blogtableitem from "../../components/admin/Blogtableitem.jsx";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentblogs: [],
  });

  const { axios } = useAppContext();

  // Fetch dashboard data
  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      if (data.success) {
        // Apply safe defaults
        setDashboard({
          blogs: data.dashboard.blogs ?? 0,
          comments: data.dashboard.comments ?? 0,
          drafts: data.dashboard.drafts ?? 0,
          recentblogs: data.dashboard.recentblogs ?? [],
        });
      } else {
        toast.error(data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {/* Top Cards */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboard.blogs}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboard.comments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboard.drafts}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      {/* Latest Blogs Table */}
      <div className="m-4 mt-6 text-gray-600">
        <div className="flex items-center gap-3 mb-3">
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th className="px-2 py-4">#</th>
                <th className="px-2 py-4">Blog Title</th>
                <th className="px-2 py-4 max-sm:hidden">Date</th>
                <th className="px-2 py-4">Status</th>
                <th className="px-2 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {dashboard.recentblogs?.length > 0 ? (
                dashboard.recentblogs.map((blog, index) => (
                  <Blogtableitem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboard}
                    index={index + 1}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-400 italic"
                  >
                    No blogs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
