import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaSpinner, FaFile, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'sonner';

const FileUpload = ({ uploadUrl, isPrivate = false, onUploadSuccess = () => {} }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [fileName, setFileName] = useState('');
  
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    setFileName(file.name);
    const formData = new FormData();
    formData.append('file', file);
    
    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);
    
    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });
      
      if (response.data.success) {
        setUploadComplete(true);
        setTimeout(() => {
          toast.success('File uploaded successfully!');
          onUploadSuccess(response.data.data);
          setUploadComplete(false);
          setFileName('');
        }, 1500);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      toast.error(`Upload failed: ${error.response?.data?.message || error.message}`);
      console.error('Upload error:', error);
      setUploadComplete(false);
    } finally {
      setTimeout(() => {
        if (!uploadComplete) {
          setIsUploading(false);
        }
      }, 800);
    }
  }, [uploadUrl, onUploadSuccess, uploadComplete]);
  
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: false
  });
  
  // Function to get border color based on drag state
  const getBorderColor = (isDragActive, isDragAccept, isDragReject) => {
    if (isDragAccept) return 'border-green-500';
    if (isDragReject) return 'border-red-500';
    if (isDragActive) return 'border-blue-500';
    return 'border-gray-300 dark:border-gray-700';
  };
  
  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed p-8 rounded-xl text-center cursor-pointer transition-all duration-300
          ${getBorderColor(isDragActive, isDragAccept, isDragReject)}
          ${isDragActive 
            ? 'bg-blue-50 dark:bg-blue-900/20 scale-105' 
            : 'hover:border-blue-400 hover:bg-gray-50 dark:hover:border-blue-600 dark:hover:bg-gray-800/50'
          }
          ${isUploading || uploadComplete ? 'pointer-events-none' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-4 py-6">
          {uploadComplete ? (
            <div className="flex flex-col items-center space-y-4 animate-float">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <FaCheckCircle className="text-green-500 text-4xl" />
              </div>
              <div className="space-y-2">
                <p className="font-medium text-xl text-green-600 dark:text-green-400">Upload Complete!</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{fileName}</p>
              </div>
            </div>
          ) : isUploading ? (
            <div className="flex flex-col items-center space-y-6 py-4 w-full max-w-md">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaFile className="text-blue-500 text-4xl" />
                </div>
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#e6e6e6" 
                    strokeWidth="8"
                  />
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (uploadProgress / 100) * 283}
                    className="transition-all duration-300 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
                  {uploadProgress}%
                </div>
              </div>
              <div className="w-full space-y-2">
                <p className="font-medium">Uploading {fileName}...</p>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ease-out" 
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="transition-all duration-300 ease-out transform hover:scale-105">
              <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center animate-float">
                <FaCloudUploadAlt className="text-blue-500 text-5xl" />
              </div>
              <p className="font-medium text-lg mb-2">
                {isDragActive 
                  ? isDragAccept 
                    ? "Drop to upload!" 
                    : "This file type is not accepted"
                  : "Drag & drop a file here, or click to select"
                }
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isPrivate 
                  ? "This file will be shared privately (P2P)" 
                  : "This file will be shared publicly"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload; 