import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";

const ReviewCard = ({ text, name, image, rating, description, title, comment }) => {
  return (
    <div
      className="relative p-6 rounded-2xl  max-w-sm w-full
                 backdrop-blur-xl bg-white/20 border border-[#C7B8FF]/50 
                 hover:bg-white/30 transition-all duration-300
                 shadow-[0_4px_20px_rgba(122,97,255,0.2)]"
    >
      {/* Gradient Glass Shine */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

      {/* ⭐ Rating */}
      <div className="flex items-center mb-4 text-[#7B61FF] text-sm relative z-10">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <span key={i}>
              {i < rating ? <FaStar /> : <FaRegStar />}
            </span>
          ))}
      </div>

      {/* 📌 Title */}
      <p className="text-[#1B1F3B] font-semibold text-sm mb-1 relative z-10">
        Review For:
        <span className="text-[#7B61FF] font-semibold"> {title}</span>
      </p>

      {/* 💬 Comment */}
      <p className="text-[#1B1F3B]/85 text-sm mb-5 relative z-10">
        "{comment || "No comment provided"}"
      </p>

      {/* 👤 User Info */}
      <div className="flex items-center gap-3 relative z-10">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-2 border-[#C7B8FF]/70 shadow-md"
        />

        <div>
          <h4 className="font-semibold text-[#1B1F3B] text-sm">{name}</h4>
          <p className="text-xs text-[#6AA9FF]">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
