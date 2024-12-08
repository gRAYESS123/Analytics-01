// src/components/FileUpload/FileUpload.js
import React from 'react';
import Papa from 'papaparse';

const FileUpload = ({ onFileUpload, loading, error }) => {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            onFileUpload([], 'CSV parsing failed: ' + results.errors[0].message);
          } else {
            onFileUpload(results.data);
          }
        },
        error: (error) => {
          onFileUpload([], error.message);
        }
      });
    } catch (err) {
      onFileUpload([], err.message);
    }
  };

  return (
    <div className="mb-6">
      <div className="max-w-xl">
        <label className="block text-sm font-medium text-gray-700">
          Upload Support Email Data
        </label>
        <div className="mt-1">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                     file:rounded-md file:border-0 file:text-sm file:font-semibold 
                     file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>
      </div>
      {loading && (
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-700"></div>
        </div>
      )}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;