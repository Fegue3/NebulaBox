import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import './UploadProgress.css';

const UploadProgress = ({ uploads, onCancel, onDismiss }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!uploads || uploads.length === 0) return null;

  const completedUploads = uploads.filter((u) => u.progress === 100);
  const activeUploads = uploads.filter((u) => u.progress < 100);
  const hasActiveUploads = activeUploads.length > 0;

  return (
    <div className="upload-progress-container">
      <div className="upload-progress-header">
        <div className="upload-progress-title">
          <button
            className="upload-expand-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label="Toggle upload details"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
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

      {isExpanded && (
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
      )}
    </div>
  );
};

export default UploadProgress;
