// components/SearchBar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${query}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="
      flex items-center gap-3
      bg-[#FFFFFF]
      rounded-4xl
      px-4 py-2
      shadow-md
      border border-[#C7B8FF]
      focus-within:border-[#7b61ffee]
      transition-all duration-300
      "
    >
      <input
        type="text"
        placeholder="Search courses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
        outline-none
        px-2 py-1
        text-[#1B1F3B]
        placeholder-[#1B1F3B99]
        w-[220px]
        md:w-[260px]
        "
      />

      <button
        type="submit"
        className="
        bg-[#7B61FF]
        text-[#FFFFFF]
        px-5 py-1
        rounded-xl
        shadow-sm
        hover:bg-[#b482f0]
        transition-all
        "
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
