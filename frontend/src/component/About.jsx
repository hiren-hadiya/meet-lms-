import React from "react";
import about from "../assets/about.jpg";
import VideoPlayer from "./VideoPlayer";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { BiSolidBadgeCheck } from "react-icons/bi";

function About() {
  return (
    <div className="w-full min-h-[60vh] bg-white text-[#1B1F3B] flex flex-wrap items-center justify-center py-10 px-4 lg:px-16">

      {/* Left Section */}
      <div className="lg:w-[40%] md:w-[70%] w-full flex items-center justify-center relative mb-10 lg:mb-0">
        <div className="relative group">
          <img
            src={about}
            className="w-[85%] h-[90%] rounded-2xl shadow-xl transform transition-all duration-300 group-hover:scale-105"
            alt="about"
          />
          <VideoPlayer />
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-[50%] md:w-[80%] w-full flex flex-col gap-5 px-3">

        {/* Section Header */}
        <div className="flex items-center text-lg text-[#7B61FF] font-semibold gap-3">
          About Us
          <TfiLayoutLineSolid className="w-6 h-6 text-[#6AA9FF]" />
        </div>

        {/* Title */}
        <h2 className="text-[32px] md:text-[45px] font-bold leading-tight text-[#1B1F3B]">
          We Maximize Your Learning Growth
        </h2>

        {/* Description */}
        <p className="text-[15px] md:text-[17px] text-[#1B1F3B]/80 leading-relaxed">
          We provide a modern Learning Management System that simplifies online
          education, tracks progress, and enhances student-instructor
          collaboration effectively and seamlessly.
        </p>

        {/* Features */}
        <div className="w-full lg:w-[70%] bg-gradient-to-br from-[#6AA9FF]/20 via-[#C7B8FF]/20 to-[#7B61FF]/20 p-5 rounded-2xl shadow-md">

          {/* Row 1 */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 text-[16px] font-medium">
              <BiSolidBadgeCheck className="text-[#7B61FF]" size={22} />
              Simplified Learning
            </div>
            <div className="flex items-center gap-2 text-[16px] font-medium">
              <BiSolidBadgeCheck className="text-[#7B61FF]" size={22} />
              Expert Trainers
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-[16px] font-medium">
              <BiSolidBadgeCheck className="text-[#7B61FF]" size={22} />
              Big Experience
            </div>
            <div className="flex items-center gap-2 text-[16px] font-medium">
              <BiSolidBadgeCheck className="text-[#7B61FF]" size={22} />
              Lifetime Access
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default About;
