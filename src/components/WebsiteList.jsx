import React, { useState, useEffect } from 'react';
import WebsiteCard from './WebsiteCard';
import OverlayDetail from './OverlayDetail';
import ModalPopup from './ModalPopup';

const WebsiteList = ({ websites, onSplitClick }) => {
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleSplitClick = (website) => {
    setSelectedWebsite(website);
    if (onSplitClick) {
      onSplitClick(website);
    }
  };

  const handleClose = () => {
    setSelectedWebsite(null);
  };

  return (
    <>
      {websites.map((website) => (
        <WebsiteCard
          key={website.url}
          website={website}
          onSplitClick={handleSplitClick}
        />
      ))}

      {/* Show side overlay on desktop */}
      {!isMobile && selectedWebsite && (
        <OverlayDetail website={selectedWebsite} onClose={handleClose} />
      )}

      {/* Show modal popup on mobile */}
      {isMobile && selectedWebsite && (
        <ModalPopup website={selectedWebsite} onClose={handleClose} />
      )}
    </>
  );
};

export default WebsiteList;
