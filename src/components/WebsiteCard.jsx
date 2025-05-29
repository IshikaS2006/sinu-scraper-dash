import React from "react";
import { BsGlobe2 } from "react-icons/bs";
import { GrSplit } from "react-icons/gr";

const WebsiteCard = ({ website, onSplitClick }) => {
  return (
    <div
      className="bg-white cursor-pointer border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 transform hover:-translate-y-1 my-3"
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          <BsGlobe2 size={20} className="text-gray-600" />
          <a
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-lg font-semibold text-indigo-800 hover:underline"
          >
            {website.name}
          </a>
        </div>

        <GrSplit
          size={18}
          className="text-gray-500 mt-1 hover:text-gray-900"
          onClick={(e) => {
            e.stopPropagation();
            onSplitClick(website);
          }}
          aria-label={`Show details for ${website.name}`}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.stopPropagation();
              onSplitClick(website);
            }
          }}
        />
      </div>

      {website.snippet && (
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {website.snippet}
        </p>
      )}
    </div>
  );
};

export default WebsiteCard;
