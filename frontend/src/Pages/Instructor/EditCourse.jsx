import React, { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseData,
  setCreatorCourseData,
  updateCourseInList,
} from "../../redux/courseSlice";
import img from "../../assets/empty.jpg";
import { serverUrl } from "../../App";
import Nav from "../../component/Nav";

function EditCourse() {
  const dispatch = useDispatch();
  const { courseData, creatorCourseData } = useSelector((state) => state.course);
  const navigate = useNavigate();
  const { courseId } = useParams();
  const thumb = useRef();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [frontendImage, setFrontendImage] = useState(img);
  const [backendImage, setBackendImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [removing, setRemoving] = useState(false);

  // Fetch course by ID
  const getCourseById = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/course/getcourse/${courseId}`, { withCredentials: true });
      setSelectedCourse(result.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to load course");
    }
  };

  useEffect(() => {
    getCourseById();
  }, [courseId]);

  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title || "");
      setSubtitle(selectedCourse.subTitle || selectedCourse.subtitle || "");
      setDescription(selectedCourse.description || "");
      setCategory(selectedCourse.category || "");
      setLevel(selectedCourse.level || "");
      setPrice(selectedCourse.price || "");
      setFrontendImage(selectedCourse.thumbnail || img);
    }
  }, [selectedCourse]);

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  

  const handleEditCourse = async () => {
    if (!price || Number(price) < 1) {
    toast.error("Price must be at least ₹1");
    return;
  }
  if (!level) {
  toast.error("Please select a course level");
  return;
}
if (!category) {
  toast.error("Please select a course category");
  return;
}
if (!title) {
  toast.error("Please add course title");
  return;
}
if (!subtitle) {
  toast.error("Please add course subtitle");
  return;
}
if (!description) {
  toast.error("Please add course description");
  return;
}




    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subTitle", subtitle);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("level", level);
      formData.append("price", price);
      if (backendImage) formData.append("thumbnail", backendImage);

      const res = await axios.post(`${serverUrl}/api/course/editcourse/${courseId}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedCourse = res.data;
      dispatch(updateCourseInList(updatedCourse));

      if (updatedCourse.isPublished) {
        const updatedCourses = courseData.map((item) => (item._id === courseId ? updatedCourse : item));
        if (!courseData.some((item) => item._id === courseId)) updatedCourses.push(updatedCourse);
        dispatch(setCourseData(updatedCourses));
      } else {
        dispatch(setCourseData(courseData.filter((item) => item._id !== courseId)));
      }

      setIsLoading(false);
      toast.success("Course saved and submitted for review (pending).");
      navigate("/courses");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error(error.response?.data?.message || "Failed to update course");
    }
  };

  const handleRemoveCourse = async () => {
    if (!window.confirm("Are you sure you want to remove this course?")) return;
    setRemoving(true);
    try {
      await axios.delete(`${serverUrl}/api/course/removecourse/${courseId}`, { withCredentials: true });

      if (creatorCourseData?.courses) {
        const updatedList = creatorCourseData.courses.filter((c) => c._id !== courseId);
        dispatch(setCreatorCourseData({ ...creatorCourseData, courses: updatedList }));
      } else {
        dispatch(setCreatorCourseData({ courses: [] }));
      }

      dispatch(setCourseData(courseData.filter((item) => item._id !== courseId)));

      setRemoving(false);
      toast.success("Course removed");
      navigate("/courses");
    } catch (error) {
      console.error(error);
      setRemoving(false);
      toast.error(error.response?.data?.message || "Failed to remove course");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 mt-10 bg-white rounded-lg shadow-md">
      {/* Top Bar */}
       <FaArrowLeftLong
          className="absolute top-4 left-4 md:top-10 md:left-10 w-6 h-6 text-black hover:text-[#C7B8FF] transition-colors cursor-pointer"
          onClick={() => navigate("/courses")}
        />
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 mb-6 relative">
       
        <h2 className="text-2xl font-semibold md:pl-12 text-[#1B1F3B] text-center md:text-left">
          Add Detail Information regarding the Course
        </h2>
        <button
          className="bg-gradient-to-r from-[#7B61FF] to-[#C7B8FF] text-white px-4 py-2 rounded-md hover:opacity-90 mt-2 md:mt-0 w-full md:w-auto cursor-pointer"
          onClick={() => navigate(`/createlecture/${selectedCourse?._id}`)}
          disabled={!selectedCourse?._id}
        >
          Go to Lecture Page
        </button>
      </div>

      {/* Form */}
      <div className="bg-gray-50 p-4 md:p-6 rounded-md space-y-6">
        <h2 className="text-lg font-medium text-[#1B1F3B]">Basic Course Information</h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Course Title"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B61FF]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SubTitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter Course SubTitle"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B61FF]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Course Description"
              className="w-full border px-4 py-2 rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#7B61FF]"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B61FF]"
              >
                <option value="">Select category</option>
                <option value="App Development">App Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="UI UX Designing">UI UX Designing</option>
                <option value="Web Development">Web Development</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B61FF]"
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (INR)</label>
              <input
                type="number"
                min={1}
                // minLength={1}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Course Price ₹"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B61FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Thumbnail</label>
            <input type="file" hidden ref={thumb} accept="image/*" onChange={handleThumbnail} />
          </div>

          <div className="relative w-full sm:w-[300px] h-[170px]">
            <img
              src={frontendImage}
              alt="Thumbnail"
              className="w-full h-full border border-black rounded-md object-cover cursor-pointer"
              onClick={() => thumb.current.click()}
            />
            <FaEdit
              className="absolute top-2 right-2 w-5 h-5 text-[#7B61FF] cursor-pointer hover:text-[#C7B8FF]"
              onClick={() => thumb.current.click()}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md w-full sm:w-auto"
              onClick={() => navigate("/courses")}
            >
              Cancel
            </button>

            <button
              type="button"
              className="bg-gradient-to-r from-[#7B61FF] to-[#C7B8FF] text-white px-6 py-2 rounded-md hover:opacity-90 w-full sm:w-auto flex items-center justify-center gap-2"
              onClick={handleEditCourse}
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader size={20} color="white" /> : "Save"}
            </button>

            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:opacity-90 w-full sm:w-auto"
              onClick={handleRemoveCourse}
              disabled={removing}
            >
              {removing ? <ClipLoader size={18} color="white" /> : "Remove"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourse;
