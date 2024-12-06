import React from 'react';
import Papa from 'papaparse';

const FileUpload = ({ onFileUpload, loading, error }) => {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        transform: (value) => value.trim()
      });

      if (parsed.errors.length > 0) {
        throw new Error('CSV parsing failed: ' + parsed.errors[0].message);
      }

      const validEmails = parsed.data.filter(row => 
        row.sender && row.date && new Date(row.date).toString() !== 'Invalid Date'
      );

      if (validEmails.length === 0) {
        throw new Error('No valid data found in CSV');
      }

      onFileUpload(validEmails);
    } catch (err) {
      console.error('Error processing file:', err);
      onFileUpload([], err.message);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-500 
          file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
          file:text-sm file:font-semibold file:bg-blue-50 
          file:text-blue-700 hover:file:bg-blue-100"
      />
      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mx-auto"></div>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;