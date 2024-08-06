import React, { useState } from 'react';

const SendEmail = ({ user, onClose }) => {
  const [emailContent, setEmailContent] = useState('');
  const [subject, setSubject] = useState('');

  const handleSendEmail = async () => {
    try {
      // Send email data to the API
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          subject: subject,
          message: emailContent,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result.message); // Email sent successfully
      } else {
        console.error(result.error); // Error sending email
      }

      // Close the popup after sending email
      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Send Email to {user.email}</h2>
        <div className="mb-4">
          <label className="block mb-2">Subject:</label>
          <input
            className="w-full border border-gray-300 rounded-lg p-2"
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <textarea
          className="w-full h-40 border border-gray-300 rounded-lg p-2 mb-4"
          placeholder="Write your email content here..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        />
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded"
          >
            Close
          </button>
          <button
            onClick={handleSendEmail}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
