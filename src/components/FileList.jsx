import { useState } from 'react';
import { FaFile, FaFileImage, FaFileAudio, FaFileVideo, FaFilePdf, FaFileCode, FaFileArchive, FaTrash } from 'react-icons/fa';
import { formatDistanceToNow } from '../utils/date';
import { formatFileSize } from '../utils/format';
import { toast } from 'sonner';
import axios from 'axios';

const FileList = ({ files, allowDelete = false, onDelete = () => {}, baseApiUrl = 'http://localhost:3000/api' }) => {
  const [deletingFiles, setDeletingFiles] = useState(new Set());

  const getFileIcon = (name, mimetype) => {
    if (mimetype && mimetype.startsWith('image/')) return <FaFileImage className="text-green-500" />;
    if (mimetype && mimetype.startsWith('audio/')) return <FaFileAudio className="text-purple-500" />;
    if (mimetype && mimetype.startsWith('video/')) return <FaFileVideo className="text-red-500" />;
    if (mimetype && mimetype.includes('pdf')) return <FaFilePdf className="text-red-600" />;
    if (name.match(/\.(zip|rar|tar|gz|7z)$/i)) return <FaFileArchive className="text-yellow-600" />;
    if (name.match(/\.(html|css|js|jsx|ts|tsx|json|php|py|java|c|cpp|h|rb|go|rs|swift)$/i)) {
      return <FaFileCode className="text-blue-500" />;
    }
    return <FaFile className="text-gray-500" />;
  };

  const handleDelete = async (file) => {
    if (!file.publicId) {
      toast.error("Cannot delete file: missing public ID");
      return;
    }

    setDeletingFiles(prev => new Set([...prev, file.publicId]));
    
    try {
      const response = await axios.delete(`${baseApiUrl}/files/public/${file.publicId}`);
      
      if (response.data.success) {
        toast.success("File deleted successfully");
        onDelete(file);
      } else {
        throw new Error(response.data.message || "Failed to delete file");
      }
    } catch (error) {
      toast.error(`Delete failed: ${error.response?.data?.message || error.message}`);
      console.error("Delete error:", error);
    } finally {
      setDeletingFiles(prev => {
        const newSet = new Set([...prev]);
        newSet.delete(file.publicId);
        return newSet;
      });
    }
  };

  if (!files || files.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <p className="text-gray-500">No files found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              File
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Size
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Uploaded
            </th>
            {allowDelete && (
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {files.map((file, index) => (
            <tr key={file.publicId || file.url || index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                    {getFileIcon(file.name, file.mimetype)}
                  </div>
                  <div className="ml-4">
                    <a 
                      href={file.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {file.name}
                    </a>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {formatFileSize(file.size)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {file.uploadedAt ? formatDistanceToNow(new Date(file.uploadedAt)) : 'Unknown'}
              </td>
              {allowDelete && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(file)}
                    disabled={deletingFiles.has(file.publicId)}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingFiles.has(file.publicId) ? (
                      <span className="inline-flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Deleting...
                      </span>
                    ) : (
                      <span className="inline-flex items-center">
                        <FaTrash className="mr-1" />
                        Delete
                      </span>
                    )}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList; 