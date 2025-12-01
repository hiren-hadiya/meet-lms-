import React from 'react';
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import img from "../../assets/empty.jpg"; // fallback photo
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import Nav from '../../component/Nav';

function Dashboard() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);

  // Prepare chart data
  const courseProgressData = creatorCourseData?.courses.map(course => ({
    name: course.title.length > 12 ? course.title.slice(0, 12) + "..." : course.title,
    lectures: course.lectures.length || 0
  })) || [];

  const enrollData = creatorCourseData?.courses.map(course => ({
    name: course.title.length > 12 ? course.title.slice(0, 12) + "..." : course.title,
    enrolled: course.enrolledStudents?.length || 0
  })) || [];

  const totalEarnings = creatorCourseData?.courses.reduce((sum, course) => {
    const studentCount = course.enrolledStudents?.length || 0;
    const courseRevenue = course.price ? course.price * studentCount : 0;
    return sum + courseRevenue;
  }, 0) || 0;

  // Gradient colors for bars
  const barColors = ["#4f46e5", "#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd"];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      <Nav/>
      {/* Back Arrow */}
      <FaArrowLeftLong
        className='absolute mt-16 top-10 left-10 w-8 h-8 cursor-pointer text-black bg-clip-text  hover:scale-110 transition-transform'
        onClick={() => navigate("/")}
      />

      <div className="w-full mt-16 px-6 py-10 space-y-10">
        {/* Welcome / Instructor Info */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
          <img
            src={userData?.user.photoUrl || img}
            alt="Educator"
            className="w-28 h-28 rounded-full object-cover border-4 border-gradient-to-r from-purple-500 to-pink-500 shadow-md"
          />
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, <span className="text-purple-600">{userData?.user.name || "Educator"}</span> 👋
            </h1>
            <h2 className='text-xl font-semibold text-gray-800'>
              Total Earnings: <span className='text-green-600 font-bold'>₹{totalEarnings.toLocaleString()}</span>
            </h2>
            <p className="text-gray-600 text-sm">{userData?.user.description || "Start creating amazing courses for your students!"}</p>
            <button
               className="bg-gradient-to-r from-[#7B61FF] to-[#C7B8FF] text-white px-4 py-2 rounded-md hover:opacity-90 cursor-pointer"
              onClick={() => navigate("/courses")}
            >
              Create Courses
            </button>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Course Progress Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Course Progress (Lectures)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="lectures" radius={[5, 5, 0, 0]}>
                  {courseProgressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enrolled Students Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Student Enrollment</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrolled" radius={[5, 5, 0, 0]}>
                  {enrollData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard;
