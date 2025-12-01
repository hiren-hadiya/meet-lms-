import axios from 'axios'
import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../../App'
import { setLectureData } from '../../redux/lectureSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'

function EditLecture() {

    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const { courseId, lectureId } = useParams()
    const { lectureData } = useSelector(state => state.lecture)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const selectedLecture = lectureData.find(lecture => lecture._id === lectureId)
    const [videoUrl, setVideoUrl] = useState(null)
    const [lectureTitle, setLectureTitle] = useState(selectedLecture?.lectureTitle || "")
    const [isPreviewFree, setIsPreviewFree] = useState(false)

    const formData = new FormData()
    formData.append("lectureTitle", lectureTitle)
    formData.append("videoUrl", videoUrl)
    formData.append("isPreviewFree", isPreviewFree)

    const editLecture = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + `/api/course/editlecture/${lectureId}`, formData, { withCredentials: true })
            dispatch(setLectureData([...lectureData, result.data]))
            toast.success("Lecture Updated")
            navigate(`/createlecture/${courseId}`)
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Lecture update error")
            setLoading(false)
        }
    }

    const removeLecture = async () => {
        setLoading1(true)
        try {
            await axios.delete(serverUrl + `/api/course/removelecture/${lectureId}`, { withCredentials: true })
            toast.success("Lecture Removed")
            navigate(`/createlecture/${courseId}`)
            setLoading1(false)
        } catch (error) {
            console.log(error)
            toast.error("Lecture remove error")
            setLoading1(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6">

                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                    <FaArrowLeft
                        className="text-gray-600 cursor-pointer"
                        onClick={() => navigate(`/createlecture/${courseId}`)}
                    />
                    <h2 className="text-xl font-semibold text-gray-800">Update Your Lecture</h2>
                </div>

                {/* Remove Button */}
                <div>
                    <button
                        className="mt-2 px-4 py-2 rounded-md text-white text-sm cursor-pointer 
                                   bg-gradient-to-r from-[#ff6a6a] to-[#ff0000] 
                                   hover:opacity-90 transition-all"
                        disabled={loading1}
                        onClick={removeLecture}
                    >
                        {loading1 ? <ClipLoader size={30} color='white' /> : "Remove Lecture"}
                    </button>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#6AA9FF] focus:outline-none"
                            placeholder={selectedLecture?.lectureTitle}
                            onChange={(e) => setLectureTitle(e.target.value)}
                            value={lectureTitle}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Video *</label>
                        <input
                            type="file"
                            required
                            accept='video/*'
                            className="w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gradient-to-r file:from-[#6AA9FF] file:to-[#7B61FF] file:text-white hover:file:opacity-90 cursor-pointer"
                            onChange={(e) => setVideoUrl(e.target.files[0])}
                        />
                    </div>

                    {/* Toggle */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            className="accent-[#7B61FF] h-4 w-4"
                            onChange={() => setIsPreviewFree(prev => !prev)}
                        />
                        <label htmlFor="isFree" className="text-sm text-gray-700">Is this video FREE</label>
                    </div>
                </div>

                {loading && <p>Uploading video... Please wait.</p>}

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                         className="w-full bg-gradient-to-r from-[#7B61FF] to-[#C7B8FF] text-white px-4 py-2 rounded-md hover:opacity-90"
                        disabled={loading}
                        onClick={editLecture}
                    >
                        {loading ? <ClipLoader size={30} color='white' /> : "Update Lecture"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditLecture
