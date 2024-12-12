import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUpload({ onFileUpload }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0 && onFileUpload) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-500">Drop the file here</p>
      ) : (
        <p className="text-gray-500">Drag and drop a file here, or click to select a file</p>
      )}
      <p className="text-sm text-gray-400 mt-2">Supports CSV, XLS, XLSX</p>
    </div>
  );
}

export default FileUpload;