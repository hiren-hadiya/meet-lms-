import React from "react";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaUikit } from "react-icons/fa6";
import { MdOutlineAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { TbBrandOpenai } from "react-icons/tb";
import { BsDatabaseCheck, BsFillClipboardDataFill } from "react-icons/bs";
import { MdOutlineDeveloperMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ExploreCourses() {
  const navigate = useNavigate();

  const categories = [
    { name: "Web Development", icon: <TbDeviceDesktopAnalytics className="w-12 h-12" /> },
    { name: "UI UX Designing", icon: <FaUikit className="w-12 h-12" /> },
    { name: "App Development", icon: <MdOutlineAppShortcut className="w-12 h-12" /> },
    { name: "Ethical Hacking", icon: <FaHackerrank className="w-12 h-12" /> },
    { name: "AI / ML", icon: <TbBrandOpenai className="w-12 h-12" /> },
    { name: "Data Science", icon: <BsDatabaseCheck className="w-12 h-12" /> },
    { name: "Data Analytics", icon: <BsFillClipboardDataFill className="w-12 h-12" /> },
    { name: "AI Tools", icon: <MdOutlineDeveloperMode className="w-12 h-12" /> },
  ];

  return (
    <div className="w-full min-h-[60vh] flex flex-col lg:flex-row items-center justify-center gap-10 px-6 py-14 bg-white">

      {/* Left Section */}
      <div className="w-full lg:w-[350px] flex flex-col items-start justify-center px-4 md:px-10">
        <h1 className="text-4xl font-bold text-[#1B1F3B] leading-tight">
          Explore <br /> Our Courses
        </h1>

        <p className="text-[16px] text-[#1B1F3B]/70 mt-4">
          Unlock new skills with high-quality courses designed by industry experts.
          Learn Web Dev, AI, UX, Data Science, Hacking, Apps, and more!
        </p>

        <button
          onClick={() => navigate("/allcourses")}
          className="
            mt-8 px-6 py-3 rounded-xl text-white text-[17px] font-semibold
            bg-gradient-to-r from-[#6AA9FF] via-[#7B61FF] to-[#C7B8FF]
            shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer
          "
        >
          Explore Courses →
        </button>
      </div>

      {/* Right Section - Categories */}
      <div className="w-[750px] max-w-[90%] flex flex-wrap justify-center gap-8">

        {categories.map((item, index) => (
          <div
            key={index}
            className="
              w-[110px] h-[140px] flex flex-col items-center justify-between
              text-center text-[#1B1F3B] text-[14px] font-medium
              hover:scale-[1.05] transition-all duration-300 
            "
          >
            <div
              className="
                w-[100px] h-[90px] rounded-2xl flex items-center justify-center shadow-md
                bg-gradient-to-br from-[#6AA9FF]/25 via-[#C7B8FF]/25 to-[#7B61FF]/25
                hover:shadow-xl hover:from-[#6AA9FF]/40 hover:to-[#7B61FF]/40
                transition-all duration-300
              "
            >
              <span className="text-[#1B1F3B]/80">{item.icon}</span>
            </div>

            <span className="font-semibold text-[#1B1F3B]">{item.name}</span>
          </div>
        ))}

      </div>

    </div>
  );
}

export default ExploreCourses;
