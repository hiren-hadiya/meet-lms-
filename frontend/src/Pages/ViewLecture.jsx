import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlayCircle, FaFilePdf } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import Nav from "../component/Nav";
import { serverUrl } from "../App";

function ViewLecture() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { courseData } = useSelector((state) => state.course);

  const selectedCourse = courseData?.find(
    (course) => course._id === courseId
  );

  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures?.[0] || null
  );

  const [coursePdfs, setCoursePdfs] = useState([]);

  /* ================= FETCH COURSE PDFs ================= */
  useEffect(() => {
    const fetchCoursePdfs = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/course/getcoursepdfs/${courseId}`,
          { withCredentials: true }
        );
        setCoursePdfs(res.data.pdfs || []);
      } catch (error) {
        console.error("Failed to load course PDFs");
      }
    };

    fetchCoursePdfs();
  }, [courseId]);

  /* ================= UPDATE LECTURE ON COURSE CHANGE ================= */
  useEffect(() => {
    if (selectedCourse?.lectures?.length > 0) {
      setSelectedLecture(selectedCourse.lectures[0]);
    }
  }, [selectedCourse]);

  return (
    <div className="min-h-screen w-full bg-gray-50 py-6 flex flex-col md:flex-row gap-6">
      <Nav />

      {/* ================= LEFT SECTION ================= */}
      <div className="w-full mt-12 md:w-2/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
        
        {/* COURSE INFO */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-4 text-gray-800">
            <FaArrowLeftLong
              className="cursor-pointer"
              onClick={() => navigate("/")}
            />
            {selectedCourse?.title}
          </h1>

          <div className="mt-2 flex gap-4 text-sm text-gray-500 font-medium">
            <span>Category: {selectedCourse?.category}</span>
            <span>Level: {selectedCourse?.level}</span>
          </div>
        </div>

        {/* VIDEO PLAYER */}
        <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4 border border-gray-300">
          {selectedLecture?.videoUrl ? (
            <video
              src={selectedLecture.videoUrl}
              controls
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              Select a lecture to start watching
            </div>
          )}
        </div>

        {/* LECTURE TITLE */}
        <div className="mt-2">
          <h2 className="text-lg font-semibold text-gray-800">
            {selectedLecture?.lectureTitle}
          </h2>
        </div>
      </div>

      {/* ================= RIGHT SECTION ================= */}
      <div className="w-full mt-12 md:w-1/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200 h-fit">
        
        {/* ALL LECTURES */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          All Lectures
        </h2>

        <div className="flex flex-col gap-3 mb-6">
          {selectedCourse?.lectures?.length > 0 ? (
            selectedCourse.lectures.map((lecture) => (
              <button
                key={lecture._id}
                onClick={() => setSelectedLecture(lecture)}
                className={`flex items-center justify-between p-3 rounded-lg border transition text-left ${
                  selectedLecture?._id === lecture._id
                    ? "bg-gray-200 border-gray-500"
                    : "hover:bg-gray-50 border-gray-300"
                }`}
              >
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    {lecture.lectureTitle}
                  </h4>
                </div>
                <FaPlayCircle className="text-black text-xl" />
              </button>
            ))
          ) : (
            <p className="text-gray-500">No lectures available.</p>
          )}
        </div>

        {/* ================= COURSE PDFs ================= */}
        <div className="border-t pt-4">
          <h2 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-2">
            <FaFilePdf className="text-red-600" />
            Course PDFs
          </h2>

          {coursePdfs.length === 0 && (
            <p className="text-gray-500 text-sm">
              No PDFs available for this course.
            </p>
          )}

          <div className="flex flex-col gap-2">
            {coursePdfs.map((pdf) => (
              <a
                key={pdf._id}
                href={`${serverUrl}${pdf.pdfUrl}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
              >
                <span className="text-sm font-medium text-gray-700">
                  📄 {pdf.title}
                </span>
                <span className="text-xs text-blue-600 font-semibold">
                  Download
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ViewLecture;
