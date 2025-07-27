import React from 'react';
import './UploadProgress.css';

const UploadProgress = ({ uploads, onCancel, onDismiss }) => {
  if (!uploads || uploads.length === 0) return null;

  const completedUploads = uploads.filter(upload => upload.progress === 100);
  const activeUploads = uploads.filter(upload => upload.progress < 100);
  const hasActiveUploads = activeUploads.length > 0;

  return (
    <div className="upload-progress-container">
      <div className="upload-progress-header">
        <div className="upload-progress-title">
          {hasActiveUploads ? (
            <>
              <div className="upload-spinner"></div>
              <span>Uploading {activeUploads.length} file{activeUploads.length > 1 ? 's' : ''}...</span>
            </>
          ) : (
            <span>{completedUploads.length} upload{completedUploads.length > 1 ? 's' : ''} completed</span>
          )}
        </div>
        <button 
          className="upload-progress-close" 
          onClick={onDismiss}
          aria-label="Close upload progress"
        >
          ×
        </button>
      </div>

      <div className="upload-progress-list">
        {uploads.map((upload) => (
          <div key={upload.id} className="upload-item">
            <div className="upload-file-info">
              <div className="upload-file-icon">
                {upload.type?.startsWith('image/') ? '🖼️' : 
                 upload.type?.includes('pdf') ? '📄' : 
                 upload.type?.startsWith('video/') ? '🎥' : 
                 upload.type?.startsWith('audio/') ? '🎵' : '📁'}
              </div>
              <div className="upload-file-details">
                <div className="upload-file-name">{upload.name}</div>
                <div className="upload-file-size">{upload.sizeFormatted}</div>
              </div>
            </div>

            <div className="upload-actions">
              {upload.progress < 100 ? (
                <>
                  <div className="upload-progress-bar">
                    <div 
                      className="upload-progress-fill" 
                      style={{ width: `${upload.progress}%` }}
                    ></div>
                  </div>
                  <span className="upload-progress-text">{upload.progress}%</span>
                  <button 
                    className="upload-cancel-btn"
                    onClick={() => onCancel(upload.id)}
                    aria-label="Cancel upload"
                  >
                    ×
                  </button>
                </>
              ) : (
                <div className="upload-complete">
                  <span className="upload-complete-icon">✓</span>
                  <span className="upload-complete-text">Complete</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadProgress;