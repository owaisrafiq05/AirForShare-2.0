import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FaCloudUploadAlt, FaFileDownload } from 'react-icons/fa';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';
import { filesApi } from '../services/api';

const PublicFiles = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  
  useEffect(() => {
    fetchFiles();
  }, []);
  
  const fetchFiles = async () => {
    setIsLoading(true);
    
    try {
      const response = await filesApi.getPublicFiles();
      
      if (response.success) {
        setFiles(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch files');
      }
    } catch (error) {
      console.error('Error fetching files:', error);
      toast.error(`Failed to load files: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUploadSuccess = (fileData) => {
    // Add the new file to the list
    setFiles(prevFiles => [fileData, ...prevFiles]);
  };
  
  const handleDelete = (deletedFile) => {
    // Remove the deleted file from the list
    setFiles(prevFiles => prevFiles.filter(file => file.publicId !== deletedFile.publicId));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Public File Sharing</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload files to share with everyone. Files are stored securely and will be available for 1 hour.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaCloudUploadAlt className="mr-2 text-blue-500" />
              Upload a File
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Files uploaded here will be accessible to anyone with the link. Maximum file size: 100MB.
            </p>
            
            <FileUpload 
              uploadUrl="http://localhost:3000/api/files/public/upload"
              isPrivate={false}
              onUploadSuccess={handleUploadSuccess}
            />
            
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              By uploading, you agree to our terms of service.
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 mt-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaFileDownload className="mr-2 text-green-500" />
              Download Files
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Click on any file in the list to download it. Files are automatically deleted after 1 hour.
            </p>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">Public Files</h2>
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                <p>Loading files...</p>
              </div>
            ) : (
              <FileList 
                files={files} 
                allowDelete={true}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicFiles; 