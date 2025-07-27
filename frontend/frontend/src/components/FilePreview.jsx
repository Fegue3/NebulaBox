import React, { useState, useEffect } from 'react';
import './FilePreview.css';
import { getPresignedDownloadUrl } from '../services/api';

const FilePreview = ({ file, onDelete, onDownload, formatFileSize }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchImagePreview = async () => {
      if (!file?.type?.startsWith('image/')) return;

      // caso local: ficheiro ainda no browser
      if (file.file instanceof File) {
        const url = URL.createObjectURL(file.file);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
      }

      // caso remoto: gerar URL assinado
      if (file.id && !previewUrl) {
        try {
          const { url } = await getPresignedDownloadUrl(
            {
              fileId: file.fileId || file.id,
              filename: file.filename || file.name,
              userId: file.userId, // se necessário, depende da tua API
              mimeType: file.type || file.mimeType,
            },
            file.accessToken // deve ser passado pelo FilesDashboard
          );
          console.log('Imagem preview URL gerado:', url);
          setPreviewUrl(url);
        } catch (err) {
          console.error('Erro ao obter preview da imagem:', err);
        }
      }
    };

    fetchImagePreview();
  }, [file]);

  const getFileIcon = (fileType = '') => {
    if (fileType.startsWith('image/')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21,15 16,10 5,21" />
        </svg>
      );
    } else if (fileType.includes('pdf')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
        </svg>
      );
    } else if (fileType.includes('video/')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      );
    } else if (fileType.includes('audio/')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
        </svg>
      );
    }
  };

  const getFilePreview = () => {
    if (file?.type?.startsWith('image/') && previewUrl) {
      return (
        <div className="image-preview">
          <img src={previewUrl} alt={file.name || file.filename} loading="lazy" />
        </div>
      );
    }
    return (
      <div className="file-icon-preview">
        {getFileIcon(file?.type || '')}
      </div>
    );
  };

  const formatDate = (date) => {
    try {
      const d = typeof date === 'string' ? new Date(date) : date;
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(d);
    } catch (err) {
      return '';
    }
  };

  const displayName = file.name || file.filename || 'Unnamed File';

  return (
    <div
      className="file-preview"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="file-preview-header">
        {getFilePreview()}
        <div className={`file-actions ${isHovered ? 'visible' : ''}`}>
          <a
            className="action-btn download-btn"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onDownload?.();
            }}
            title="Download"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </a>
          <button
            className="action-btn delete-btn"
            onClick={onDelete}
            title="Delete"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      </div>
      <div className="file-info">
        <h3 className="file-name" title={displayName}>
          {displayName.length > 20 ? displayName.slice(0, 20) + '...' : displayName}
        </h3>
        <div className="file-details">
          <span className="file-size">{formatFileSize(file.size)}</span>
          <span className="file-date">{formatDate(file.uploadDate)}</span>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
