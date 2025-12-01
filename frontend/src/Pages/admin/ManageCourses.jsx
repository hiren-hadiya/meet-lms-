import React, { useEffect, useState } from "react";
import { api } from "./api"; // Use axios instance
import CourseRequestModal from "./CourseRequestModal";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import Nav from "../../component/Nav.jsx";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [rejectModal, setRejectModal] = useState(null);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      let endpoint = "/course/admin/pending";
      if (activeTab === "approved") endpoint = "/course/admin/approved";
      if (activeTab === "rejected") endpoint = "/course/admin/rejected";

      const res = await api.get(endpoint);
      setCourses(res.data);
    } catch (error) {
      console.log("Error fetching courses:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [activeTab]);

  const handleApprove = async (id) => {
    try {
      await api.post(`/course/admin/approve/${id}`);
      fetchCourses();
    } catch (err) {
      console.log("Approve failed:", err);
    }
  };

  const handleReject = async (id, reason) => {
    try {
      await api.post(`/course/admin/reject/${id}`, { reason });
      setRejectModal(null);
      fetchCourses();
    } catch (err) {
      console.log("Reject failed:", err);
    }
  };

  return (
    <div className="py-6 bg-[#FFFFFF] min-h-screen">
      <Nav/>

      {/* Top Bar */}
      <div className="flex mt-18 p-6 flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <FaArrowLeftLong
            className="text-[#1B1F3B] w-6 h-6 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1 className="text-2xl md:text-3xl font-bold text-[#ac11e9]">Manage Courses</h1>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-4">
          {["pending", "approved", "rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 md:px-5 py-2 rounded-lg font-medium transition-colors duration-300
                ${
                  activeTab === tab
                    ? "bg-[#7B61FF] text-white"
                    : "bg-[#C7B8FF] text-[#1B1F3B] hover:bg-[#6AA9FF] hover:text-white"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="p-6 overflow-x-auto shadow-lg rounded-lg border border-[#C7B8FF]">
        <table className="w-full min-w-[600px] border-collapse text-[#1B1F3B]">
          <thead>
            <tr className="bg-[#C7B8FF] text-left">
              <th className="p-3 border border-[#C7B8FF]">Title</th>
              <th className="p-3 border border-[#C7B8FF]">Category</th>
              <th className="p-3 border border-[#C7B8FF]">Instructor</th>
              <th className="p-3 border border-[#C7B8FF]">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id} className="hover:bg-[#F0F4FF] transition-colors">
                <td className="p-3 border border-[#C7B8FF]">{course.title}</td>
                <td className="p-3 border border-[#C7B8FF]">{course.category}</td>
                <td className="p-3 border border-[#C7B8FF]">{course.creator?.name}</td>
                <td className="p-3 border border-[#C7B8FF] flex flex-wrap gap-2">
                  <button
                    onClick={() => navigate(`/admin/getcourse/${course._id}`)}
                    className="px-3 py-1 bg-[#6AA9FF] text-white rounded-lg hover:bg-[#7B61FF] transition-colors"
                  >
                    View
                  </button>
                  {activeTab === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(course._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setRejectModal(course)}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reject Modal */}
      {rejectModal && (
        <CourseRequestModal
          course={rejectModal}
          onClose={() => setRejectModal(null)}
          onReject={handleReject}
        />
      )}
    </div>
  );
}
