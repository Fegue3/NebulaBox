import React from 'react';
import './EmptyFilesState.css';

const EmptyFilesState = ({ onUploadClick }) => {
  return (
    <div className="empty-files-state">
      <div className="empty-content">
        <div className="empty-icon-container">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" x2="8" y1="13" y2="13" />
            <line x1="16" x2="8" y1="17" y2="17" />
            <polyline points="10,9 9,9 8,9" />
          </svg>
          
          <div className="floating-elements">
            <div className="floating-element element-1"></div>
            <div className="floating-element element-2"></div>
            <div className="floating-element element-3"></div>
          </div>
        </div>
        
        <h2 className="empty-title">No files yet</h2>
        <p className="empty-description">
          Start by uploading your first file to NebulaBox. 
          Drag and drop files here or click the button below.
        </p>
        
        <div className="empty-actions">
          <button className="primary-upload-btn" onClick={onUploadClick}>
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17,8 12,3 7,8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
            Upload Your First File
          </button>
        </div>
        
        <div className="upload-info">
          <div className="info-item">
            <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            <span>Lightning fast uploads</span>
          </div>
          <div className="info-item">
            <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <circle cx="12" cy="16" r="1" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Secure by default</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyFilesState;