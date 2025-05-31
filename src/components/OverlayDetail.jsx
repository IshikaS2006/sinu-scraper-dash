import React from 'react';
import EmailList from './EmailList';
import PhoneNumberList from './PhoneNumberList';
import { motion, AnimatePresence } from 'framer-motion';

const OverlayDetail = ({ website, onClose }) => {
  return (
    <AnimatePresence>
      {website && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed top-0 right-0 w-1/3 h-full bg-white border-l border-gray-200 p-6 overflow-y-auto shadow-lg z-50"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            aria-label="Close detail panel"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold mb-4">{website.name}</h2>

          {website.description && (
            <p className="mb-4 text-gray-700">{website.description}</p>
          )}

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Emails</h3>
            <EmailList emails={website.emails || []} />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Phone Numbers</h3>
            {/* ✅ Fixed prop name */}
            <PhoneNumberList phones={website.phone || []} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayDetail;
