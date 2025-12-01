import React, { useEffect, useState } from 'react';
import Card from "../component/Card.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Nav from '../component/Nav.jsx';
import ai from '../assets/SearchAi.png';
import { useSelector } from 'react-redux';

function AllCourses() {
  const navigate = useNavigate();
  const { courseData } = useSelector(state => state.course);

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [category, setCategory] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);

  // Toggle category selection
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  // Filter courses based on selected categories
  const applyFilter = () => {
    let courseCopy = [...courseData];
    if (category.length > 0) {
      courseCopy = courseCopy.filter(item => category.includes(item.category));
    }
    setFilterCourses(courseCopy);
  };

  useEffect(() => {
    setFilterCourses(courseData);
  }, [courseData]);

  useEffect(() => {
    applyFilter();
  }, [category]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Nav />

      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setIsSidebarVisible(prev => !prev)}
        className="fixed top-20 left-4 z-50 bg-white text-black px-3 py-1 rounded md:hidden border-2 border-black shadow-sm hover:bg-gray-100 transition"
      >
        {isSidebarVisible ? 'Hide' : 'Show'} Filters
      </button>

      {/* Sidebar */}
      <aside
        className={`w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-50
          ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <h2 className="text-xl font-bold flex items-center justify-center gap-2 text-white mb-6">
          <FaArrowLeftLong
            className="cursor-pointer hover:text-purple-500 transition"
            onClick={() => navigate("/")}
          />
          Filter by Category
        </h2>

        <form className="space-y-4 text-sm bg-gray-700 border border-gray-600 text-white p-5 rounded-2xl" onSubmit={(e) => e.preventDefault()}>
          {/* AI Search Button */}
          {/* <button
            className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center gap-2 font-medium transition"
            onClick={() => navigate("/searchwithai")}
          >
            Search with AI
            <img src={ai} className="w-6 h-6 rounded-full" alt="AI" />
          </button> */}

          {/* Category Checkboxes */}
          {['App Development', 'AI/ML', 'AI Tools', 'Data Science', 'Data Analytics', 'Ethical Hacking', 'UI UX Designing', 'Web Development', 'Others'].map((cat, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
              <input
                type="checkbox"
                className="accent-purple-500 w-4 h-4 rounded-md"
                value={cat}
                onChange={toggleCategory}
              />
              {cat}
            </label>
          ))}
        </form>
      </aside>

      {/* Main Courses Section */}
      <main className="w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-4">
        {filterCourses?.map((item, index) => (
          <Card
            key={index}
            thumbnail={item.thumbnail}
            title={item.title}
            price={item.price}
            category={item.category}
            id={item._id}
            reviews={item.reviews}
          />
        ))}
      </main>
    </div>
  );
}

export default AllCourses;
