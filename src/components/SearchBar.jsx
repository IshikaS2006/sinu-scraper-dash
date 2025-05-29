import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({ onSearchChange }) => {
  const handleChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="w-full flex justify-center my-5">
      <div className="flex w-full max-w-4xl p-1 border-gray-200">
        <input
          type="text"
          placeholder="Search websites..."
          onChange={handleChange}
          className="flex-1 p-3 rounded-l-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        <button
          type="submit"
          className="flex items-center justify-center px-4 bg-gray-800 text-white rounded-r-lg hover:bg-blue-600 transition-colors cursor-pointer"
          aria-label="Search"
        >
          <IoSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
