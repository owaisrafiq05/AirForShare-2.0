import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FaCloudUploadAlt, FaFileDownload, FaSync } from 'react-icons/fa';
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
    <div className="min-h-screen bg-gray-900 pt-20 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white relative inline-block">
            Public File Sharing
            <div className="absolute left-0 bottom-0 w-full h-1 bg-[#abd373]/30 rounded-full"></div>
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Upload files to share with everyone. Files are stored securely and will be available for 1 hour.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50 transition-all duration-300 hover:border-[#abd373]/30 transform hover:-translate-y-1">
              <h2 className="text-xl font-bold mb-4 flex items-center text-white">
                <FaCloudUploadAlt className="mr-3 text-[#abd373]" />
                Upload a File
              </h2>
              <p className="text-gray-300 mb-6">
                Files uploaded here will be accessible to anyone with the link. Maximum file size: 100MB.
              </p>
              
              <FileUpload 
                uploadUrl="http://localhost:3000/api/files/public/upload"
                isPrivate={false}
                onUploadSuccess={handleUploadSuccess}
              />
              
              <div className="mt-4 text-sm text-gray-400">
                By uploading, you agree to our terms of service.
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50 mt-6 transition-all duration-300 hover:border-[#abd373]/30 transform hover:-translate-y-1">
              <h2 className="text-xl font-bold mb-4 flex items-center text-white">
                <FaFileDownload className="mr-3 text-[#abd373]" />
                Download Files
              </h2>
              <p className="text-gray-300">
                Click on any file in the list to download it. Files are automatically deleted after 1 hour.
              </p>
              
              <button 
                onClick={fetchFiles} 
                className="mt-4 group px-5 py-2 bg-white/10 rounded-lg flex items-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_span]:delay-200 [&_span]:transition-all"
              >
                <FaSync className="text-[#abd373] group-hover:text-gray-800 transition-all duration-300" />
                <span className="text-white group-hover:text-gray-800">Refresh List</span>
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50 transition-all duration-300 hover:border-[#abd373]/30">
              <h2 className="text-xl font-bold mb-6 text-white border-b border-gray-700 pb-4">Public Files</h2>
              
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#abd373] mb-4"></div>
                  <p className="text-gray-300">Loading files...</p>
                </div>
              ) : (
                <FileList 
                  files={files} 
                  allowDelete={true}
                  onDelete={handleDelete}
                />
              )}
              
              {!isLoading && files.length === 0 && (
                <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/30">
                  <FaCloudUploadAlt className="text-5xl text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-300 mb-2">No files available</p>
                  <p className="text-gray-400 text-sm">Upload a file to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicFiles; 