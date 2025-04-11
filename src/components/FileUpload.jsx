import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'sonner';

const FileUpload = ({ uploadUrl, isPrivate = false, onUploadSuccess = () => {} }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);
    
    setIsUploading(true);
    setUploadProgress(0);
    
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
        toast.success('File uploaded successfully!');
        onUploadSuccess(response.data.data);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      toast.error(`Upload failed: ${error.response?.data?.message || error.message}`);
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  }, [uploadUrl, onUploadSuccess]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
  });
  
  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-blue-600 dark:hover:bg-gray-800/50'
          }`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-3 py-4">
          {isUploading ? (
            <>
              <FaSpinner className="text-blue-500 text-3xl animate-spin" />
              <p className="font-medium">Uploading... {uploadProgress}%</p>
              <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300 ease-out" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <FaCloudUploadAlt className="text-blue-500 text-5xl" />
              <p className="font-medium text-lg">
                {isDragActive ? "Drop the file here" : "Drag & drop a file here, or click to select"}
              </p>
              <p className="text-sm text-gray-500">
                {isPrivate 
                  ? "This file will be shared privately (P2P)" 
                  : "This file will be shared publicly"}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload; 