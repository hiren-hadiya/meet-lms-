import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { serverUrl } from '../../App';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setLectureData } from '../../redux/lectureSlice';

function CreateLecture() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { lectureData } = useSelector((state) => state.lecture);

  // Create Lecture
  const createLectureHandler = async () => {
    if (!lectureTitle.trim()) {
      toast.error("Lecture title cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/course/createlecture/${courseId}`,
        { lectureTitle },
        { withCredentials: true }
      );
      dispatch(setLectureData([...lectureData, result.data.lecture]));
      toast.success("Lecture Created");
      setLectureTitle("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create lecture");
    } finally {
      setLoading(false);
    }
  };

  // Load Lectures
  useEffect(() => {
    const getLecture = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/course/getcourselecture/${courseId}`,
          { withCredentials: true }
        );
        dispatch(setLectureData(result.data.lectures));
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to load lectures");
      }
    };
    getLecture();
  }, [courseId, dispatch]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#1B1F3B] mb-1">Add a Lecture</h1>
          <p className="text-sm text-gray-500">
            Enter the title and add your video lectures to enhance your course content.
          </p>
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="e.g. Introduction to MERN Stack"
          className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6AA9FF] mb-4"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-[#7B61FF] to-[#C7B8FF] text-white text-sm font-medium hover:opacity-90 transition-all"
            onClick={() => navigate(`/editcourse/${courseId}`)}
          >
            <FaArrowLeft /> Back to Course
          </button>

          <button
            className="px-5 py-2 rounded-md bg-[#6AA9FF] text-white hover:bg-[#7BBEFF] transition-all text-sm font-medium shadow flex items-center justify-center"
            disabled={loading}
            onClick={createLectureHandler}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "+ Create Lecture"}
          </button>
        </div>

        {/* Lecture List */}
        <div className="space-y-2">
          {lectureData.length === 0 && (
            <p className="text-gray-400 text-sm text-center">No lectures added yet.</p>
          )}
          {lectureData.map((lecture, index) => (
            <div
              key={index}
              className="bg-[#F5F5FF] rounded-md flex justify-between items-center p-3 text-sm font-medium text-[#1B1F3B] hover:bg-[#E8E4FF] transition-colors"
            >
              <span>
                Lecture {index + 1}: {lecture.lectureTitle}
              </span>
              <FaEdit
                className="text-[#7B61FF] hover:text-[#C7B8FF] cursor-pointer"
                onClick={() => navigate(`/editlecture/${courseId}/${lecture._id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateLecture;
