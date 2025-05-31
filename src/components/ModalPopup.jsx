import React from 'react';
import EmailList from './EmailList';
import PhoneNumberList from './PhoneNumberList';
import { motion, AnimatePresence } from 'framer-motion';

const ModalPopup = ({ website, onClose }) => {
  return (
    <AnimatePresence>
      {website && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 m-10 flex justify-center items-center z-50"
          onClick={onClose}  // close modal if user clicks outside content
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-lg max-w-md w-full p-6 relative shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal content
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              aria-label="Close popup"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{website.name}</h2>
            {website.description && <p className="mb-4 text-gray-700">{website.description}</p>}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Emails</h3>
              <EmailList emails={website.emails || []} />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Phone Numbers</h3>
              {/* Fixed prop name to 'phones' */}
              <PhoneNumberList phones={website.phone || []} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalPopup;
