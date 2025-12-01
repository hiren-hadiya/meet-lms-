import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ thumbnail, title, category, price, id, reviews }) => {
  const navigate = useNavigate();

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAverageRating(reviews);

  return (
    <div
      onClick={() => navigate(`/viewcourse/${id}`)}
      className="
        max-w-sm w-full bg-white 
        rounded-3xl shadow-md 
        overflow-hidden cursor-pointer 
        transition-all duration-300
        hover:scale-[1.03] hover:shadow-2xl
        group
      "
     
    >
      {/* Thumbnail */}
      <div className="overflow-hidden rounded-t-3xl">
        <img
          src={thumbnail}
          alt={title}
          className="
            w-full h-48 object-cover 
            group-hover:scale-110 
            transition-all duration-500
          "
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">

        {/* Title */}
        <h2 className="text-xl font-semibold text-[#1B1F3B] line-clamp-2">
          {title}
        </h2>

        {/* Category */}
        <span
          className="
            inline-block px-3 py-1 
            rounded-full text-sm font-medium 
            bg-gradient-to-r from-[#6AA9FF]/20 to-[#C7B8FF]/20 
            text-[#7B61FF]
          "
        >
          {category}
        </span>

        {/* Price & Rating */}
        <div className="flex justify-between items-center pt-3">

          {/* Price */}
          <span className="text-lg font-bold text-[#1B1F3B]">
            ₹{price}
          </span>

          {/* Rating */}
          <span className="flex items-center gap-1 text-[#7B61FF] font-semibold">
            <FaStar size={18} className="text-[#7B61FF]" />
            {avgRating}
          </span>

        </div>
      </div>
    </div>
  );
};

export default CourseCard;
