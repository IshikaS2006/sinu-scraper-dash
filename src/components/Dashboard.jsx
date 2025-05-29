import React, { useState, useEffect } from 'react';
import { Search, Globe, Mail, Phone, X, Copy } from 'lucide-react';
import SearchBar from './SearchBar';
import WebsiteList from './WebsiteList';
import OverlayDetail from './OverlayDetail';
import websitesData from '../data/mockData.json';

const Dashboard = () => {
  const [websites, setWebsites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWebsitei, setSelectedWebsitei] = useState(null);

  useEffect(() => {
    setWebsites(websitesData);
  }, []);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const filteredWebsites = websites.filter((website) =>
    website.name.toLowerCase().includes(searchTerm.toLowerCase())
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

    {/* Search Bar */}
    <SearchBar onSearchChange={handleSearchChange} />

    {/* Centered content */}
    <div className="max-w-4xl mx-auto">
      <div className="flex h-[70vh] bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300">
        {/* Website list */}
        <div className={`${selectedWebsitei ? "w-2/3" : "w-full"} p-6 overflow-y-auto transition-all duration-300`}>
          <WebsiteList websites={filteredWebsites} onCardClick={handleCardClick} />
        </div>

        {/* Sidebar (if selected) */}
        <OverlayDetail website={selectedWebsitei} onClose={handleOverlayClose} />
      </div>
    </div>
  </div>
);



};

export default Dashboard;