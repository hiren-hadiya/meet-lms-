import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CardPage() {
  const [popularCourses, setPopularCourses] = useState([]);
  const { courseData } = useSelector((state) => state.course);
  const navigate = useNavigate();

  useEffect(() => {
    setPopularCourses(courseData.slice(-6));
  }, [courseData]);

  return (
    <div className="w-full flex flex-col items-center justify-center py-14 px-4 bg-white">

      {/* Heading */}
      <h1 className="text-[32px] md:text-[48px] font-extrabold text-[#1B1F3B] text-center">
        Our Latest Courses
      </h1>

      {/* Underline Accent */}
      <div className="w-24 h-1 bg-gradient-to-r from-[#6AA9FF] via-[#C7B8FF] to-[#7B61FF] rounded-full mt-3"></div>

      {/* Subtitle */}
      <p className="lg:w-[55%] md:w-[75%] w-[90%] text-center text-[#1B1F3B]/70 text-[16px] mt-5 mb-12">
        Explore top-rated courses designed to boost your skills, enhance your 
        career, and unlock opportunities in tech, AI, business, and more.
      </p>

      {/* Cards Container */}
      <div
        className="
          w-full flex flex-wrap gap-10 
          items-center justify-center
          px-4 md:px-10 lg:px-20
        "
      >
        {popularCourses?.map((item, index) => (
          <Card
            key={index}
            id={item._id}
            thumbnail={item.thumbnail}
            title={item.title}
            price={item.price}
            category={item.category}
            reviews={item.reviews}
          />
        ))}
      </div>

      {/* View all button */}
      <button
        onClick={() => navigate("/allcourses")}
        className="
          mt-12 px-7 py-3 rounded-2xl text-[16px] font-semibold text-white
          bg-gradient-to-r from-[#6AA9FF] via-[#7B61FF] to-[#C7B8FF]
          shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer
        "
      >
        View All Courses →
      </button>
    </div>
  );
}

export default CardPage;
