import React, { useState, useRef, useEffect } from 'react';
import EmptyFilesState from '../components/EmptyFilesState';
import FilePreview from '../components/FilePreview';
import {
  getPresignedUploadUrl,
  uploadFileToS3,
  deleteUserFile,
  listUserFiles,
  getPresignedDownloadUrl,
} from '../services/api';
import './FilesDashboard.css';
import { useAuth } from '../auth/AuthProvider';

const FilesDashboard = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);
  const { user } = useAuth();
  const accessToken = user?.accessToken;
  const userId = user?.sub;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fetched = await listUserFiles(accessToken);
        setFiles(
          fetched.map((f) => ({
            ...f,
            id: f.fileId,
            name: f.filename,
            uploadDate: new Date(f.uploadDate),
          }))
        );
      } catch (err) {
        console.error('Erro ao carregar ficheiros:', err);
      }
    };

    if (accessToken) fetchFiles();
  }, [accessToken]);

  const uploadHandler = async (file) => {
    try {
      const { url, fileId } = await getPresignedUploadUrl(file, accessToken);
      await uploadFileToS3(url, file);
      const updated = await listUserFiles(accessToken);
      setFiles(
        updated.map((f) => ({
          ...f,
          id: f.fileId,
          name: f.filename,
          uploadDate: new Date(f.uploadDate),
        }))
      );
    } catch (err) {
      console.error('Erro ao fazer upload:', err);
    }
  };

  const handleFileUpload = async (event) => {
    const uploadedFiles = Array.from(event.target.files);
    for (const file of uploadedFiles) {
      await uploadHandler(file);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    for (const file of droppedFiles) {
      await uploadHandler(file);
    }
  };

  const handleDeleteFile = async (file) => {
    try {
      await deleteUserFile(
        {
          fileId: file.fileId || file.id,
          filename: file.filename || file.name,
          userId: userId,
        },
        accessToken
      );
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    } catch (err) {
      console.error('Erro ao apagar ficheiro:', err);
    }
  };

  const handleDownloadFile = async (file) => {
    try {
      const { url } = await getPresignedDownloadUrl(
        {
          fileId: file.fileId || file.id,
          filename: file.filename || file.name,
          userId: userId,
          mimeType: file.mimeType || file.type,
        },
        accessToken
      );

      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = file.filename || file.name;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } catch (err) {
      console.error('Erro ao fazer download:', err);
    }
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

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    <div className="files-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Your Files</h1>
          <p className="dashboard-subtitle">Manage and organize your cloud storage</p>
        </div>

        <button className="upload-btn" onClick={openFileUpload}>
          <svg
            className="upload-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          Upload Files
        </button>
      </div>

      <div className={`files-container ${isDragging ? 'dragging' : ''}`}>
        {files.length === 0 ? (
          <EmptyFilesState onUploadClick={openFileUpload} />
        ) : (
          <div className="files-grid">
            {files.map((file) => (
              <FilePreview
                key={file.id}
                file={{ ...file, accessToken }} // 👈 acesso para preview da imagem
                onDelete={() => handleDeleteFile(file)}
                onDownload={() => handleDownloadFile(file)}
                formatFileSize={formatFileSize}
              />
            ))}
          </div>
        )}

        {isDragging && (
          <div className="drag-overlay">
            <div className="drag-content">
              <svg
                className="drag-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
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
