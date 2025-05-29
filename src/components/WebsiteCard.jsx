import React from "react";
import { BsGlobe2 } from "react-icons/bs";
import { GrSplit } from "react-icons/gr";

const WebsiteCard = ({ website, onClick }) => {
  // Assuming website.url contains the actual link

  // To prevent the onClick opening overlay when user clicks on the link,
  // we stop propagation in the link click handler.

  return (
    <div
      className="bg-white cursor-pointer border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 transform hover:-translate-y-1 my-3"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") onClick();
      }}
    >
      {/* Top row with icon + name and end icon */}
      <div className="flex justify-between items-start mb-2">
        {/* Left section: Icon + Website name (clickable link) */}
        <div className="flex items-center space-x-2">
          <BsGlobe2 size={20} className="text-gray-600" />
          <a
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()} // Prevent overlay open when clicking link
            className="text-lg font-semibold text-indigo-800 hover:underline"
          >
            {website.name}
          </a>
        </div>

        {/* Right section: GrSplit icon */}
        <GrSplit
          size={18}
          className="text-gray-500 mt-1 hover:text-gray-900"
        />
      </div>

      {/* Snippet text */}
      {website.snippet && (
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {website.snippet}
        </p>
      )}
    </div>
  );
};

export default WebsiteCard;
