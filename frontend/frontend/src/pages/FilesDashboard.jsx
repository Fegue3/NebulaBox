import React, { useState, useRef } from 'react';
import EmptyFilesState from '../components/EmptyFilesState';
import FilePreview from '../components/FilePreview';
import './FilesDashboard.css';

const FilesDashboard = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const newFiles = uploadedFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date(),
      file: file
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles = droppedFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date(),
      file: file
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDeleteFile = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const openFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="files-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Your Files</h1>
          <p className="dashboard-subtitle">Manage and organize your cloud storage</p>
        </div>
        
        <button className="upload-btn" onClick={openFileUpload}>
          <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          Upload Files
        </button>
      </div>

      <div 
        className={`files-container ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {files.length === 0 ? (
          <EmptyFilesState onUploadClick={openFileUpload} />
        ) : (
          <div className="files-grid">
            {files.map(file => (
              <FilePreview 
                key={file.id}
                file={file}
                onDelete={() => handleDeleteFile(file.id)}
                formatFileSize={formatFileSize}
              />
            ))}
          </div>
        )}
        
        {isDragging && (
          <div className="drag-overlay">
            <div className="drag-content">
              <svg className="drag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17,8 12,3 7,8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
              <h3>Drop files here to upload</h3>
            </div>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        multiple
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FilesDashboard;