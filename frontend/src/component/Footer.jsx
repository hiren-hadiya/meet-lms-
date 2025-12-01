import React from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.jpg";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12">

        {/* Logo + Description */}
        <div className="lg:w-[35%]">
          <img 
            src={logo1} 
            alt="Logo" 
            className="w-20 h-20 mb-4 border border-blue-500/40 rounded-xl object-cover shadow-[0_0_10px_rgba(0,170,255,0.3)]"
          />
          <h2 className="text-xl font-bold text-white">Group - 3</h2>
         
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#4fc3f7] mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li 
              className=" hover:text-[#4fc3f7] transition" 
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li 
              className="hover:text-[#4fc3f7] transition" 
              onClick={() => navigate("/allcourses")}
            >
              Courses
            </li>
            <li 
              className=" hover:text-[#4fc3f7] transition" 
              onClick={() => navigate("/login")}
            >
              Login
            </li>
            <li 
              className=" hover:text-[#4fc3f7] transition" 
              onClick={() => navigate("/profile")}
            >
              My Profile
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-[#4fc3f7] mb-3">Explore Categories</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#4fc3f7] transition">Web Development</li>
            <li className="hover:text-[#4fc3f7] transition">AI / Machine Learning</li>
            <li className="hover:text-[#4fc3f7] transition">Data Science</li>
            <li className="hover:text-[#4fc3f7] transition">UI / UX Design</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-10 pt-5 text-center text-sm">
        <span className="text-gray-500">© {new Date().getFullYear()} </span>
        <span className="text-[#4fc3f7] font-medium">LMS</span>
        <span className="text-gray-500">. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
