import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import Nav from "../../component/Nav";

const CreateCourse = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");

    const CreateCourseHandler = async () => {
        if (!title || !category) {
            toast.error("Please fill all fields");
            return;
        }
        setLoading(true);
        try {
            const result = await axios.post(
                serverUrl + "/api/course/create",
                { title, category },
                { withCredentials: true }
            );
            toast.success("Course Created");
            navigate("/courses");
            setTitle("");
            setCategory("");
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10">
            <Nav/>
            <div className="max-w-xl w-full mx-auto p-6 bg-white shadow-lg rounded-xl relative">
                {/* Back Arrow */}
                <FaArrowLeftLong
                    className="absolute top-6 left-6 w-6 h-6 text-[#7B61FF] cursor-pointer hover:text-[#C7B8FF] transition-colors"
                    onClick={() => navigate("/courses")}
                />

                <h2 className="text-2xl font-bold mb-6 text-center text-[#1B1F3B]">
                    Create Course
                </h2>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    {/* Course Title */}
                    <div>
                        <label className="block text-sm font-medium text-[#1B1F3B] mb-1">
                            Course Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter course title"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-[#1B1F3B] mb-1">
                            Category
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        onClick={CreateCourseHandler}
                        className="w-full bg-gradient-to-r from-[#7B61FF] to-[#C7B8FF] text-white py-2 px-4 rounded-lg hover:opacity-90 transition flex justify-center items-center cursor-pointer"
                    >
                        {loading ? <ClipLoader size={25} color="white" /> : "Create"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCourse;
