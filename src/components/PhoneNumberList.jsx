import React, { useState } from 'react';
import { MdContentCopy } from "react-icons/md";

const PhoneNumberList = ({ phone }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  // If phones is a string, split it into an array
  const phonesArray = Array.isArray(phone)
    ? phone
    : (typeof phone === 'string' && phone.trim() !== '')
      ? phone.includes(',')
        ? phone.split(',').map(p => p.trim())
        : phone.includes(';')
          ? phone.split(';').map(p => p.trim())
          : phone.split(/\s+/).map(p => p.trim()) // split by spaces if no comma/semicolon
      : [];

  if (phonesArray.length === 0) {
    return <p className="text-gray-500">No phone numbers available.</p>;
  }

  const handleCopy = (phone, index) => {
    if (!navigator.clipboard) {
      alert('Clipboard API not supported');
      return;
    }
    navigator.clipboard.writeText(phone)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
      })
      .catch(() => {
        alert('Failed to copy');
      });
  };

  return (
    <ul className="list-disc list-inside text-green-700 space-y-1">
      {phonesArray.map((phone, index) => (
        <li key={index} className="flex items-center justify-between">
          <span>{phone}</span>
          <button
            aria-label={`Copy phone number ${phone}`}
            className="ml-2 text-gray-600 hover:text-gray-900 flex items-center"
            onClick={() => handleCopy(phone, index)}
          >
            <MdContentCopy />
            {copiedIndex === index && (
              <span className="ml-1 text-xs text-green-600">Copied!</span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PhoneNumberList;
