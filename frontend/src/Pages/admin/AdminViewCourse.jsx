import React, { useEffect, useState } from "react";
import { api } from "./api";
import { useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import img from "../../assets/empty.jpg"
import Card from "../../component/Card.jsx"
import { FaLock, FaPlayCircle } from "react-icons/fa";







export default function AdminViewCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  console.log(course)
    // const { courseId } = useParams();
  

  const navigate = useNavigate()
  const { userData } = useSelector(state => state.user)
  // const { courseId } = useParams();
  const { courseData } = useSelector(state => state.course)

const [selectedLecture, setSelectedLecture] = useState(null);
useEffect(() => {
  if (course?.lectures?.length > 0) {
    setSelectedLecture(course.lectures[0]);
  }
}, [course]);






  const fetchCourse = async () => {
    const res = await api.get(`/course/admin/getcourse/${id}`);
    setCourse(res.data);
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  if (!course) return <div>Loading...</div>;


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-6 ">

          {/* Thumbnail */}
          <div className="w-full md:w-1/2">
            <FaArrowLeftLong className='text-[black] w-[22px] h-[22px] cursor-pointer' onClick={() => navigate(-1)} />
            {course?.thumbnail ? <img
              src={course?.thumbnail}
              alt="Course Thumbnail"
              className="rounded-xl w-full object-cover"
            /> : <img
              src={img}
              alt="Course Thumbnail"
              className="rounded-xl  w-full  object-cover"
            />}
          </div>

          {/* Course Info */}
          <div className="flex-1 space-y-2 mt-[20px]">
            <h1 className="text-2xl font-bold">Course -{course?.title}</h1>
            <p className="text-gray-600">{course?.subTitle}</p>

            {/* Rating & Price */}
            <div className="flex items-start flex-col justify-between">
              {/* <div className="text-yellow-500 font-medium">
                ⭐ {avgRating} <span className="text-gray-500">(1,200 reviews)</span>
              </div> */}
              <div>
                <span className="text-lg font-semibold text-black">{course?.price}</span>{" "}
                <span className="line-through text-sm text-gray-400">{course?.price + 2000}</span>
              </div>
            </div>

            {/* Highlights */}
            <ul className="text-sm text-gray-700 space-y-1 pt-2">
              {/* <li>10+ hours of video content</li> */}
              <li>✅ Lifetime access to course materials</li>

            </ul>

            {/* Enroll Button */}
            {/* {!isEnrolled ?<button className="bg-[black] text-white px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer" onClick={()=>handleEnroll(courseId , userData.user._id)}>
              Enroll Now
            </button> :
            <button className="bg-green-200 text-green-600 px-6 py-2 rounded hover:bg-gray-100 hover:border mt-3" onClick={()=>navigate(`/viewlecture/${courseId}`)}>
             Watch Now
            </button>
            } */}

            {/* {userData.user.role === "admin" && <button className="bg-green-200 text-green-600 px-6 py-2 rounded hover:bg-gray-100 hover:border mt-3" onClick={() => navigate(`/viewlecture/${course._id}`)}>
              Admin Watch Now
            </button>} */}
          </div>
        </div>

        {/* What You'll Learn */}
        <div>
          <h2 className="text-xl font-semibold mb-2">What You’ll Learn</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Learn {course?.category} from Beginning</li>

          </ul>
        </div>

        {/* Requirements */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <p className="text-gray-700">Basic programming knowledge is helpful but not required.</p>
        </div>

        {/* Who This Course Is For */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Who This Course is For</h2>
          <p className="text-gray-700">
            Beginners, aspiring developers, and professionals looking to upgrade skills.
          </p>
        </div>

        {/* course lecture   */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side - Curriculum */}
<div className="bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200">
  <h2 className="text-xl font-bold mb-1 text-gray-800">Course Curriculum</h2>
  <p className="text-sm text-gray-500 mb-4">{course?.lectures?.length} Lectures</p>

  <div className="flex flex-col gap-3">
    {course?.lectures?.map((lecture, index) => (
      <button
        key={index}
        onClick={() => setSelectedLecture(lecture)} // <<-- MOST IMPORTANT FIX
        className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left
          ${selectedLecture?._id === lecture._id 
            ? "bg-gray-100 border-gray-400" 
            : "hover:bg-gray-100 border-gray-300"}
        `}
      >
        <span className="text-lg text-gray-700">
          <FaPlayCircle />
        </span>
        <span className="text-sm font-medium text-gray-800">
          {lecture.lectureTitle}
        </span>
      </button>
    ))}
  </div>
</div>


          {/* Right Side - Video + Info */}
<div className="bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200">
  
  <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center">
    {selectedLecture?.videoUrl ? (
      <video
        src={selectedLecture.videoUrl}
        controls
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="text-white text-sm">Select a preview lecture to watch</span>
    )}
  </div>

  <h3 className="text-lg font-semibold text-gray-900 mb-1">
    {selectedLecture?.lectureTitle || "Lecture Title"}
  </h3>

</div>

      </div>
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-2">Instructor Info </h2>
              {/* <div className="mb-4">
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (

                    <FaStar key={star}
                      onClick={() => setRating(star)} className={star <= rating ? "fill-yellow-500" : "fill-gray-300"} />

                  ))}
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your comment here..."
                  className="w-full border border-gray-300 rounded-lg p-2"
                  rows="3"
                />
                <button

                  className="bg-black text-white mt-3 px-4 py-2 rounded hover:bg-gray-800 cursor-pointer" onClick={handleReview}
                >
                  {loading ? <ClipLoader size={30} color='white' /> : "Submit Review"}
                </button>

              </div> */}

            {/* Instructor Info */}
              <div className="flex items-center gap-4 pt-4 border-t ">
                {course?.creator.photoUrl ? <img
                  src={course?.creator.photoUrl}
                  alt="Instructor"
                  className="w-16 h-16 rounded-full object-cover"
                /> : <img
                  src={img}
                  alt="Instructor"
                  className="w-16 h-16 rounded-full object-cover"
                />
                }
                <div>
                  <h3 className="text-lg font-semibold">Creator Name - {course?.creator.name}</h3>
                  <p className="md:text-sm text-gray-600 text-[10px] ">Course description -{course?.description}</p>
                  <p className="md:text-sm text-gray-600 text-[10px] ">Creator Email - {course?.creator.email}</p>

                </div>
              </div>

              {/* <div>
                <p className='text-xl font-semibold mb-2'>Other Published Courses by the Creator -</p>
                <div className='w-full transition-all duration-300 py-[20px]   flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px] '>

                  {
                    courseData?.map((item, index) => (
                      <Card key={index} thumbnail={item.thumbnail} title={item.title} id={item._id} price={item.price} reviews={item.reviews} category={item.category} />
                    ))
                  }
                </div>
              </div> */}
          </div>

      </div>
    </div>
  )
}
