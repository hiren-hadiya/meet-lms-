import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaFilePdf, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { serverUrl } from "../../App";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setLectureData } from "../../redux/lectureSlice";

function CreateLecture() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const dispatch = useDispatch();
  const { lectureData } = useSelector((state) => state.lecture);

  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // PDF states
  const [pdfTitle, setPdfTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [coursePdfs, setCoursePdfs] = useState([]);

  /* ================= CREATE LECTURE ================= */
  const createLectureHandler = async () => {
    if (!lectureTitle.trim()) {
      toast.error("Lecture title required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/course/createlecture/${courseId}`,
        { lectureTitle },
        { withCredentials: true }
      );

      dispatch(setLectureData([...lectureData, res.data.lecture]));
      setLectureTitle("");
      toast.success("Lecture created");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create lecture");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPLOAD PDF ================= */
  const uploadPdfHandler = async () => {
    if (!pdfTitle.trim() || !pdfFile) {
      toast.error("PDF title & file required");
      return;
    }

    const formData = new FormData();
    formData.append("title", pdfTitle);
    formData.append("pdf", pdfFile);

    try {
      const res = await axios.post(
        `${serverUrl}/api/course/uploadpdf/${courseId}`,
        formData,
        { withCredentials: true }
      );

      setCoursePdfs(res.data.pdfs);
      setPdfTitle("");
      setPdfFile(null);
      toast.success("PDF uploaded");
    } catch (err) {
      toast.error("PDF upload failed");
    }
  };

  /* ================= DELETE PDF ================= */
  const deletePdfHandler = async (pdfId) => {
    if (!window.confirm("Are you sure you want to delete this PDF?")) return;

    try {
      const res = await axios.delete(
        `${serverUrl}/api/course/deletepdf/${courseId}/${pdfId}`,
        { withCredentials: true }
      );

      setCoursePdfs(res.data.pdfs);
      toast.success("PDF deleted");
    } catch (err) {
      toast.error("Failed to delete PDF");
    }
  };

  /* ================= LOAD LECTURES + PDF ================= */
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/course/getcourselecture/${courseId}`,
          { withCredentials: true }
        );

        dispatch(setLectureData(res.data.lectures || []));
        setCoursePdfs(res.data.pdfs || []);
      } catch (err) {
        toast.error("Failed to load course data");
      }
    };

    fetchCourseData();
  }, [courseId, dispatch]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-3xl p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#1B1F3B]">
            Manage Course Content
          </h1>
          <p className="text-sm text-gray-500">
            Add lectures and PDFs for your course
          </p>
        </div>

        {/* LECTURE INPUT */}
        <input
          type="text"
          placeholder="Lecture title"
          className="w-full border rounded-md p-3 mb-4"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
        />

        {/* LECTURE BUTTONS */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => navigate(`/editcourse/${courseId}`)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded cursor-pointer"
          >
            <FaArrowLeft /> Back
          </button>

          <button
            onClick={createLectureHandler}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 text-white rounded cursor-pointer"
          >
            {loading ? <ClipLoader size={18} color="white" /> : "+ Create Lecture"}
          </button>
        </div>

        {/* PDF UPLOAD SECTION */}
        <div className="bg-[#F5F5FF] p-4 rounded mb-6">
          <h2 className="font-semibold mb-2 flex items-center gap-2">
            <FaFilePdf className="text-red-600" /> Upload Course PDF
          </h2>

          <input
            type="text"
            placeholder="PDF Title"
            className="border p-2 rounded w-full mb-2"
            value={pdfTitle}
            onChange={(e) => setPdfTitle(e.target.value)}
          />

          <input
            type="file"
            accept="application/pdf"
            className="border-1 border-red-600 p-2 rounded mb-2"
            onChange={(e) => setPdfFile(e.target.files[0])}
          />

          <button
            onClick={uploadPdfHandler}
            className="px-4 py-2 ml-5 bg-green-600 text-white rounded cursor-pointer"
          >
            Upload PDF
          </button>
        </div>

        {/* ================= LECTURES ================= */}
        <h2 className="text-lg font-semibold mb-2">📘 Lectures</h2>

        {lectureData.length === 0 && (
          <p className="text-gray-400 text-sm">No lectures added</p>
        )}

        {lectureData.map((lecture, index) => (
          <div
            key={lecture._id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2"
          >
            <span>
              Lecture {index + 1}: {lecture.lectureTitle}
            </span>

            <FaEdit
              className="cursor-pointer text-blue-600"
              onClick={() =>
                navigate(`/editlecture/${courseId}/${lecture._id}`)
              }
            />
          </div>
        ))}

        {/* ================= PDFs ================= */}
        <h2 className="text-lg font-semibold mt-6 mb-2">📄 Course PDFs</h2>

        {coursePdfs.length === 0 && (
          <p className="text-gray-400 text-sm">No PDFs uploaded</p>
        )}

        {coursePdfs.map((pdf) => (
          <div
            key={pdf._id}
            className="flex justify-between items-center bg-[#F5F5FF] p-3 rounded mb-2"
          >
            <a
              href={`${serverUrl}${pdf.pdfUrl}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              📄 {pdf.title}
            </a>

            <FaTrash
              className="text-red-600 cursor-pointer hover:text-red-800"
              onClick={() => deletePdfHandler(pdf._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateLecture;
