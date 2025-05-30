import React, { useState, useEffect } from "react";
import { Search, Globe, Mail, Phone, X, Copy, RefreshCw } from "lucide-react";
import SearchBar from "./SearchBar";
import WebsiteList from "./WebsiteList";
import OverlayDetail from "./OverlayDetail";
import websitesData from "../data/mockData.json";

const Dashboard = () => {
  const [websites, setWebsites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWebsitei, setSelectedWebsitei] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDbData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/websites");
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setWebsites(data);
    } catch (error) {
      console.error("Failed to fetch websites:", error);
      alert("Failed to fetch data from server");
      setWebsites(websitesData); // fallback to json data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // setWebsites(websitesData);
    fetchDbData();
  }, []);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const filteredWebsites = websites.filter(
    (website) =>
      website.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      website.url?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (website) => {
    setSelectedWebsitei(website);
  };

  const handleOverlayClose = () => {
    setSelectedWebsitei(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-900 mb-2">Dashboard</h1>
      </div>

      {/* Refresh Button */}
      <button
        onClick={fetchDbData}
        disabled={loading}
        className="flex items-center gap-2 mx-auto mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        {loading ? "Refreshing..." : "Refresh Data"}
      </button>

      {/* Search Bar */}
      <SearchBar onSearchChange={handleSearchChange} />

      {/* Centered content */}
      <div className="max-w-4xl mx-auto">
        <div className="flex h-[70vh] bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300">
          {/* Website list */}
          <div
            className={`${
              selectedWebsitei ? "w-2/3" : "w-full"
            } p-6 overflow-y-auto transition-all duration-300`}
          >
            {" "}
            <WebsiteList
              websites={filteredWebsites}
              onSplitClick={handleCardClick}
            />
          </div>

          {/* Sidebar (if selected) */}
          <OverlayDetail
            website={selectedWebsitei}
            onClose={handleOverlayClose}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
