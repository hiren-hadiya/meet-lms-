import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { serverUrl } from "../App";
import Card from "../component/Card.jsx"; 
import { FaArrowLeftLong } from "react-icons/fa6";
import Nav from "../component/Nav.jsx";

function SearchResults() {
  const [courses, setCourses] = useState([]);
  const [params] = useSearchParams();
  const query = params.get("query");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/course/search?query=${query}`
        );
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setCourses([]);
      }
    };

    if (query) fetchData();
    else setCourses([]); 
  }, [query]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-50 px-4 md:px-10 py-10 relative">
      <Nav/>
      {/* Back Arrow */}
      <FaArrowLeftLong
        className="absolute top-6 mt-14 left-6 w-6 h-6 text-black cursor-pointer hover:text-gray-700 transition"
        onClick={() => navigate(-1)}
      />

      {/* Heading */}
      <h1 className="text-3xl mt-16 md:text-5xl font-bold text-center text-gray-800">
        Search Results
      </h1>

      {/* Subtext */}
      {query && (
        <p className="text-center text-gray-600 text-sm md:text-base mt-2 mb-8">
          Showing results for: <span className="font-semibold text-black">"{query}"</span>
        </p>
      )}

      {/* No Query */}
      {!query && (
        <p className="text-gray-500 text-lg mt-20 text-center w-full">
          🔍 Please enter something to search.
        </p>
      )}

      {/* No Results */}
      {query && courses?.length === 0 && (
        <p className="text-gray-500 text-lg mt-20 text-center w-full">
          ❌ No results found for "<span className="font-semibold text-black">{query}</span>"
        </p>
      )}

      {/* Courses */}
      {courses?.length > 0 && (
        <div className="w-full flex flex-wrap items-start justify-center gap-8 lg:gap-12 px-2 lg:px-20 mt-6">
          {courses.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              thumbnail={item.thumbnail}
              title={item.title}
              price={item.price}
              category={item.category}
              reviews={item.reviews}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
