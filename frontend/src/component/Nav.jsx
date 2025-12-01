import React, { useState } from 'react'
import logo from '../assets/logo1.jpg'
import { IoPersonCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import SearchBar from "./SearchBar";

function Nav() {

    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(false);
    const [showHam, setShowHam] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
            dispatch(setUserData(null));
            toast.success("Logout Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    return (
        <div className="fixed top-0 w-full z-[999]">
            {/* NAVBAR */}
            <div className="
                w-full h-[70px] px-5 flex items-center justify-between 
                backdrop-blur-xl bg-white/60 shadow-md border-b border-[#C7B8FF]/40
            ">

                {/* Logo */}
                <div className="flex items-center cursor-pointer gap-2" >
                    <img
                        src={logo}
                        alt=""
                        className="w-[55px] rounded-2xl border-2 border-[#6AA9FF] shadow-sm"
                        onClick={() => navigate("/")}
                    />
                    {/* <span className="text-[#1B1F3B] font-bold text-xl tracking-wide hidden md:block">
                        MyCourse
                    </span> */}
                </div>

                {/* Search Bar */}
                <div className="hidden  items-center md:flex w-[32%]">
                    <SearchBar
                        className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-[#C7B8FF] 
                        focus-within:border-[#7B61FF] transition-all"
                    />
                </div>

                {/* Desktop Right Side */}
                <div className="hidden lg:flex items-center gap-4">

                    {/* No User */}
                    {!userData && (
                        <IoPersonCircleSharp className="w-[45px] h-[45px] text-[#1B1F3B]" />
                    )}

                    {/* Avatar */}
                    {userData && (
                        <div
                            className="w-[45px] h-[45px] rounded-full border-2 border-[#6AA9FF] bg-white shadow cursor-pointer"
                            onClick={() => setShowMenu(prev => !prev)}
                        >
                            {userData?.user?.photoUrl ? (
                                <img src={userData.user.photoUrl} className="rounded-full w-full h-full" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-[#1B1F3B] text-xl">
                                    {userData.user.name.slice(0, 1).toUpperCase()}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Instructor Dashboard */}
                    {userData?.user?.role === "instructor" && (
                        <button
                            className="px-4 py-2 rounded-xl bg-[#7B61FF] cursor-pointer text-white shadow"
                            onClick={() => navigate("/dashboard")}
                        >
                            Dashboard
                        </button>
                    )}

                    {/* Admin Dashboard */}
                    {userData?.user?.role === "admin" && (
                        <button
                            className="px-4 py-2 rounded-xl bg-[#7B61FF] cursor-pointer text-white shadow"
                            onClick={() => navigate("/admin/manage-courses")}
                        >
                           Admin Dashboard
                        </button>
                    )}

                    {/* Login / Logout */}
                    {!userData ? (
                        <button
                            className="px-5 py-2 rounded-xl bg-[#6AA9FF] text-white shadow"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            className="px-5 py-2 rounded-xl cursor-pointer bg-red-500 text-white shadow"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    )}
                </div>

                {/* Hamburger */}
                <GiHamburgerMenu
                    className="lg:hidden text-[#1B1F3B] w-[32px] h-[32px] cursor-pointer"
                    onClick={() => setShowHam(true)}
                />
            </div>

            {/* Profile Dropdown */}
            {showMenu && (
                <div
                    className="
                        absolute right-40 top-[75px] z-[9999]
                        bg-white shadow-xl border border-[#C7B8FF] 
                        rounded-2xl p-4 flex flex-col gap-2 w-[200px]
                    "
                >
                    <span
                        className="px-4 py-2 rounded-lg bg-[#6AA9FF] text-white cursor-pointer hover:bg-[#7B61FF]"
                        onClick={() => { setShowMenu(false); navigate("/profile") }}
                    >
                        My Profile
                    </span>

                    {userData?.user?.role !== "admin" && (
                        <span
                            className="px-4 py-2 rounded-lg bg-[#6AA9FF] text-white cursor-pointer hover:bg-[#7B61FF]"
                            onClick={() => { setShowMenu(false); navigate("/mycourses") }}
                        >
                            My Courses
                        </span>
                    )}

                    
                </div>
            )}

            {/* Mobile Menu */}
            <div
                className={`
                    fixed top-0 left-0 w-full h-full bg-white/95 backdrop-blur-md 
                    z-[999999] flex flex-col items-center justify-center gap-5 
                    transition-all duration-500
                    ${showHam ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <ImCross
                    className="absolute top-5 right-5 w-[35px] h-[35px] text-[#1B1F3B] cursor-pointer"
                    onClick={() => setShowHam(false)}
                />

                {/* User avatar */}
                {userData && (
                    <div className="w-[70px] h-[70px] rounded-full border-2 border-[#6AA9FF]">
                        {userData.user.photoUrl ? (
                            <img src={userData.user.photoUrl} className="rounded-full w-full h-full" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-[#1B1F3B] text-3xl">
                                {userData.user.name.slice(0, 1).toUpperCase()}
                            </div>
                        )}
                    </div>
                )}

                {/* Mobile buttons */}
                {userData && (
                    <button className="w-[200px] py-3 bg-[#6AA9FF] rounded-xl text-white shadow"
                        onClick={() => navigate("/profile")}>
                        My Profile
                    </button>
                )}

                {userData && (
                    <button className="w-[200px] py-3 bg-[#7B61FF] rounded-xl text-white shadow"
                        onClick={() => navigate("/mycourses")}>
                        My Courses
                    </button>
                )}

                {userData?.user?.role === "instructor" && (
                    <button className="w-[200px] py-3 bg-[#7B61FF] rounded-xl text-white shadow"
                        onClick={() => navigate("/dashboard")}>
                        Dashboard
                    </button>
                )}

                  {userData?.user?.role === "admin" && (
                    <button className="w-[200px] py-3 bg-[#7B61FF] rounded-xl text-white shadow"
                        onClick={() => navigate("/admin/manage-courses")}>
                        Dashboard
                    </button>
                )}

                {!userData ? (
                    <button className="w-[200px] py-3 bg-[#6AA9FF] rounded-xl text-white shadow"
                        onClick={() => navigate("/login")}>
                        Login
                    </button>
                ) : (
                    <button className="w-[200px] py-3 bg-red-500 rounded-xl text-white shadow"
                        onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
}

export default Nav;
