import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import Nav from '../component/Nav';

function Profile() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
      <Nav/>
      <div className='bg-white shadow-xl rounded-3xl p-8 max-w-xl w-full relative'>

        {/* Back button */}
        <FaLongArrowAltLeft
          className='absolute top-6 left-6 w-6 h-6 cursor-pointer text-black hover:text-[#7B61FF] transition'
          onClick={() => navigate("/")}
        />

        {/* User Avatar */}
        <div className='flex flex-col justify-center items-center text-center mt-4'>
          {userData?.user.photoUrl ? (
            <img
              src={userData?.user.photoUrl}
              className='w-28 h-28 rounded-full object-cover border-4 border-[#6AA9FF]'
              alt="User Avatar"
            />
          ) : (
            <div className='w-28 h-28 rounded-full flex items-center justify-center text-4xl font-bold text-white bg-[#6AA9FF] border-2 border-white'>
              {userData?.user.email.slice(0, 1).toUpperCase()}
            </div>
          )}

          {/* Name with gradient */}
          <h2 className='text-2xl md:text-3xl font-extrabold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#6AA9FF] to-[#7B61FF]'>
            {userData.user.name}
          </h2>

          {/* Role with normal color */}
          <p className='text-sm text-[#FF7F50] capitalize'>{userData.user.role}</p>
        </div>

        {/* User Info */}
        <div className='mt-6 space-y-4'>
          <div className='text-sm flex items-center justify-start gap-2'>
            <span className='font-semibold text-gray-700'>Email:</span>
            <span className='text-black'>{userData.user.email}</span>
          </div>
          <div className='text-sm flex items-center justify-start gap-2'>
            <span className='font-semibold text-gray-700'>Bio:</span>
            <span className='text-black'>{userData.user.description || "Not added yet"}</span>
          </div>
          <div className='text-sm flex items-center justify-start gap-2'>
            <span className='font-semibold text-gray-700'>Enrolled Courses:</span>
            {
              userData?.user.role !== "admin" ? <span className='text-black'>{userData.user.enrolledCourses.length}</span> : <span>view all course directly</span>
            }
          </div>

          {/* Edit Profile Button with gradient */}
          <div className='mt-6 flex justify-center'>
            <button
              onClick={() => navigate("/editprofile")}
              className='px-6 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-[#6AA9FF] to-[#7B61FF] hover:opacity-90 transition'
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
