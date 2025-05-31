import React, { useState } from 'react';
import { MdContentCopy } from "react-icons/md";

const EmailList = ({ email }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!email || email.trim() === '') {
    return <p className="text-gray-500">No emails available.</p>;
  }

  // Split emails string into array by comma or semicolon
  const emailsArray = email.includes(',') 
    ? email.split(',').map(e => e.trim())
    : email.includes(';')
      ? email.split(';').map(e => e.trim())
      : [email.trim()]; // just single email as array

  const handleCopy = (text, index) => {
    if (!navigator.clipboard) {
      alert('Clipboard API not supported');
      return;
    }
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
      })
      .catch(() => alert('Failed to copy'));
  };

  return (
    <ul className="list-disc list-inside text-blue-700 space-y-1">
      {emailsArray.map((email, index) => (
        <li key={index} className="flex items-center justify-between">
          <span>{email}</span>
          <button
            aria-label={`Copy email ${email}`}
            className="ml-2 text-gray-600 hover:text-gray-900 flex items-center"
            onClick={() => handleCopy(email, index)}
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

export default EmailList;
