import React, { useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import { setCreatorCourseData, updateCourseInList } from '../../redux/courseSlice.js';
import { FaArrowLeftLong } from "react-icons/fa6";
import img1 from "../../assets/empty.jpg";
import Nav from '../../component/Nav.jsx';

function Courses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { creatorCourseData } = useSelector(state => state.course);

  // Fetch creator courses
  useEffect(() => {
    const getCreatorData = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/course/getcreatorcourses",
          { withCredentials: true }
        );
        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Error loading courses");
      }
    };
    getCreatorData();
  }, []);

  // Re-Apply for course after rejection
  const handleReApply = async (id) => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/course/apply-again/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(updateCourseInList(res.data));
      toast.success("Course submitted again for approval!");
    } catch (error) {
      toast.error("Failed to re-apply");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      <Nav/>
      <div className="w-full mt-16 min-h-screen p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div className='flex items-center gap-3'>
            <FaArrowLeftLong
              className='w-8 h-8 cursor-pointer text-black bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-110 transition-transform'
              onClick={() => navigate("/dashboard")}
            />
            <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          </div>

          <button
             className="bg-gradient-to-r from-[#7B61FF] to-[#C7B8FF] text-white px-4 py-2 rounded-md hover:opacity-90 cursor-pointer"
            onClick={() => navigate("/createcourse")}
          >
            Create Course
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-lg p-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left">Course</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {creatorCourseData?.courses?.map((course, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4 flex items-center gap-4">
                    <img
                      src={course?.thumbnail || img1}
                      alt=""
                      className="w-24 h-14 object-cover rounded-md"
                    />
                    <span className="text-gray-800 font-medium">{course?.title}</span>
                  </td>

                  <td className="py-3 px-4 text-gray-700 font-medium">
                    ₹{course?.price || "NA"}
                  </td>

                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${course?.status === "approved" ? "text-green-600 bg-green-100" :
                        course?.status === "pending" ? "text-yellow-600 bg-yellow-100" :
                        "text-red-600 bg-red-100"}`}>
                      {course?.status?.toUpperCase()}
                    </span>

                    {course?.status === "rejected" && (
                      <p className="text-red-500 text-xs mt-1">Reason: {course?.rejectReason}</p>
                    )}
                  </td>

                  <td className="py-3 px-4 flex items-center gap-3">
                    <FaEdit
                      className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
                      onClick={() => navigate(`/editcourse/${course?._id}`)}
                    />
                    {/* {course?.status === "rejected" && (
                      <button
                        onClick={() => handleReApply(course._id)}
                        className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                      >
                        Apply Again
                      </button>
                    )} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-center text-sm text-gray-500 mt-6">
            A list of your recent courses.
          </p>
        </div>

        {/* Mobile Version */}
        <div className="md:hidden space-y-4">
          {creatorCourseData?.courses?.map((course, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
              <div className="flex gap-4 items-center">
                <img
                  src={course?.thumbnail || img1}
                  alt=""
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h2 className="font-medium text-gray-800 text-sm">{course?.title}</h2>
                  <p className="text-gray-600 text-xs mt-1">₹{course?.price || "NA"}</p>
                </div>
                <FaEdit
                  className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
                  onClick={() => navigate(`/editcourse/${course?._id}`)}
                />
              </div>

              <span className={`w-fit px-3 py-1 text-xs font-semibold rounded-full
                ${course?.status === "approved" ? "text-green-600 bg-green-100" :
                  course?.status === "pending" ? "text-yellow-600 bg-yellow-100" :
                  "text-red-600 bg-red-100"}`}>
                {course?.status?.toUpperCase()}
              </span>

              {/* {course?.status === "rejected" && (
                <>
                  <p className="text-red-500 text-xs mt-1">Reason: {course?.rejectReason}</p>
                  <button
                    className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                    onClick={() => handleReApply(course._id)}
                  >
                    Apply Again
                  </button>
                </>
              )} */}
            </div>
          ))}
          <p className="text-center text-sm text-gray-500 mt-4">
            A list of your recent courses.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Courses;
