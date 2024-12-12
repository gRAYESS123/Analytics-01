import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onFileUpload, loading, error }) => {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onabort = () => onFileUpload([], 'File reading was aborted');
    reader.onerror = () => onFileUpload([], 'File reading failed');
    reader.onload = () => {
      const csvText = reader.result;
      const lines = csvText.split('\n');
      const headers = lines[0].split(',');
      
      const data = [];
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = lines[i].split(',');
        const row = {};
        
        headers.forEach((header, index) => {
          row[header.trim()] = values[index]?.trim() || '';
        });
        
        data.push(row);
      }
      
      onFileUpload(data);
    };

    reader.readAsText(file);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  });

  return (
    <div className="mb-6">
      <div
        {...getRootProps()}
        className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        {loading ? (
          <p className="text-gray-600">Processing file...</p>
        ) : isDragActive ? (
          <p className="text-blue-500">Drop the CSV file here</p>
        ) : (
          <p className="text-gray-500">
            Drag and drop a CSV file here, or click to select a file
          </p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;