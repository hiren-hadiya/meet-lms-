import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import getCurrentUser from '../customHooks/getCurrentUser.js';
import Nav from '../component/Nav.jsx';

function MyEnrolledCourses() {
  getCurrentUser()

  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate()

  return (
    <div className="min-h-screen mt-12 w-full py-9 bg-[#FFFFFF]">
    {/* <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'> */}
      <Nav/>
      <FaArrowLeftLong
        className='absolute mt-12 top-[3%] md:top-[6%] left-[5%] w-6 h-6 cursor-pointer text-black hover:text-[#7B61FF] transition'
        onClick={() => navigate("/")}
      />
      <h1 className="text-3xl md:text-4xl text-center font-bold text-[#1B1F3B] mb-8">
        My Enrolled Courses
      </h1>

      {userData?.user.enrolledCourses.length === 0 ? (
        <p className="text-gray-500 text-center w-full text-lg">You haven’t enrolled in any course yet.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {userData?.user.enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="bg-[#FFFFFF] rounded-2xl shadow-lg border border-[#C7B8FF] overflow-hidden w-full sm:w-[300px] md:w-[320px] hover:scale-105 transition-transform duration-300"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col">
                <h2 className="text-lg font-semibold text-[#1B1F3B]">{course.title}</h2>
                <p className="text-sm text-[#7B61FF] mb-2">{course.category}</p>
                <p className="text-sm text-[#6AA9FF]">{course.level}</p>
                <button
                  className='mt-4 px-4 py-2 rounded-xl text-white font-medium bg-gradient-to-r from-[#6AA9FF] to-[#7B61FF] flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer'
                  onClick={() => navigate(`/viewlecture/${course._id}`)}
                >
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyEnrolledCourses;
