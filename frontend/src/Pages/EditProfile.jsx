import React, { useState } from 'react';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import Nav from '../component/Nav';

function EditProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);

    const [name, setName] = useState(userData.user.name || "");
    const [description, setDescription] = useState(userData.user.description || "");
    const [photoUrl, setPhotoUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleEditProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        if (photoUrl) formData.append("photoUrl", photoUrl);

        try {
            const result = await axios.post(`${serverUrl}/api/user/profile`, formData, { withCredentials: true });
            dispatch(setUserData(result.data));
            toast.success("Profile Updated Successfully");
            navigate("/");
        } catch (error) {
            console.error("Edit Profile Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#6AA9FF]/10 to-[#C7B8FF]/10 px-4 py-10 flex items-center justify-center">
            <Nav/>
            <div className="bg-white mt-8 shadow-2xl rounded-3xl p-8 max-w-lg w-full relative border border-[#C7B8FF]">
                
                <FaLongArrowAltLeft
                    className="absolute top-6 left-6 text-black w-6 h-6 cursor-pointer hover:text-[#7B61FF] transition"
                    onClick={() => navigate("/profile")}
                />
                
                <h2 className="text-3xl font-bold text-center mb-6 text-[#7f62e7]">Edit Profile</h2>

                <form onSubmit={handleEditProfile} className="space-y-6">
                    
                    <div className="flex flex-col items-center text-center">
                        {userData?.user.photoUrl ? (
                            <img
                                src={userData.user.photoUrl}
                                alt="Avatar"
                                className="w-28 h-28 rounded-full object-cover border-4 border-gradient-to-r from-[#6AA9FF] to-[#C7B8FF]"
                                style={{ borderImageSlice: 1 }}
                            />
                        ) : (
                            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-[#6AA9FF] to-[#C7B8FF] text-white flex items-center justify-center text-3xl font-bold border-2 border-[#7B61FF]">
                                {userData.user.email[0].toUpperCase()}
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="photoUrl" className="text-sm font-medium text-[#1B1F3B]">Select Avatar</label>
                        <input
                            id="photoUrl"
                            type="file"
                            accept="image/*"
                            className="w-full mt-1 px-4 py-2 border border-[#C7B8FF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-[#6AA9FF] to-[#C7B8FF]"
                            onChange={(e) => setPhotoUrl(e.target.files[0])}
                        />
                    </div>

                    <div>
                        <label htmlFor="name" className="text-sm font-medium text-[#1B1F3B]">Username</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full mt-1 px-4 py-2 border border-[#C7B8FF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-[#6AA9FF] to-[#C7B8FF]"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[#1B1F3B]">Email</label>
                        <input
                            type="text"
                            value={userData.user.email}
                            readOnly
                            className="w-full mt-1 px-4 py-2 border border-[#C7B8FF] rounded-md text-sm bg-[#F7F7F7] text-[#1B1F3B]"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[#1B1F3B]">Bio</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tell us about yourself"
                            className="w-full mt-1 px-4 py-2 border border-[#C7B8FF] rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-[#6AA9FF] to-[#7B61FF]"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-md text-white font-medium bg-gradient-to-r from-[#6AA9FF] to-[#7B61FF] hover:from-[#7B61FF] hover:to-[#6AA9FF] active:scale-95 transition flex items-center justify-center"
                    >
                        {loading ? <ClipLoader size={25} color="white" /> : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
