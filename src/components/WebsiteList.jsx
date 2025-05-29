import React from "react";
import WebsiteCard from "./WebsiteCard";

const WebsiteList = ({ websites, onCardClick }) => {
  if (!websites.length) {
    return <p className="p-4 text-center text-gray-500">No websites found.</p>;
  }

  return (
    <div className=" p-1 max-w-7xl mx-auto">
      {websites.map((website) => (
        <WebsiteCard
          key={website.id}
          website={website}
          onClick={() => onCardClick(website)}
        />
      ))}
    </div>
  );
};

export default WebsiteList;
