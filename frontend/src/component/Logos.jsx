import React from "react";
import { HiLockOpen } from "react-icons/hi2";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";

function Logos() {
  const items = [
    { icon: <HiLockOpen className="w-7 h-7 text-[#1B1F3B]" />, text: "Lifetime Access" },
    { icon: <FaSackDollar className="w-7 h-7 text-[#1B1F3B]" />, text: "Value for Money" },
    { icon: <BiSupport className="w-7 h-7 text-[#1B1F3B]" />, text: "Lifetime Support" },
    { icon: <FaUsers className="w-7 h-7 text-[#1B1F3B]" />, text: "Community Support" },
  ];

  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-4 py-6">

      {items.map((box, index) => (
        <div
          key={index}
          className="
            flex items-center justify-center gap-3 
            px-6 py-3
            rounded-2xl 
            bg-[#FFFFFF]
            border border-[#6AA9FF]
            shadow-sm
            text-[#1B1F3B]
            font-medium
            transition-all duration-300
            hover:bg-[#C7B8FF]
            hover:shadow-md
            hover:scale-105
            text-sm md:text-base
          "
        >
          <span>{box.icon}</span>
          <span className="font-semibold">{box.text}</span>
        </div>
      ))}

    </div>
  );
}

export default Logos;
