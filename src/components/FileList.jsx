import { useState, useEffect } from 'react';
import { FaFile, FaFileImage, FaFileAudio, FaFileVideo, FaFilePdf, FaFileCode, FaFileArchive, FaTrash, FaDownload, FaSpinner } from 'react-icons/fa';
import { formatDistanceToNow } from '../utils/date';
import { formatFileSize } from '../utils/format';
import { toast } from 'sonner';
import axios from 'axios';
import Loader from './Loader';

const FileList = ({ files, allowDelete = false, onDelete = () => {}, baseApiUrl = 'http://localhost:3000/api', isLoading = false }) => {
  const [deletingFiles, setDeletingFiles] = useState(new Set());
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    if (files && files.length > 0) {
      // Animate each file entry with a staggered delay
      const timer = setTimeout(() => {
        const newVisibleItems = [];
        files.forEach((_, index) => {
          setTimeout(() => {
            newVisibleItems.push(index);
            setVisibleItems([...newVisibleItems]);
          }, index * 100); // 100ms stagger between items
        });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [files]);

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

  if (isLoading) {
    return (
      <Loader text="Loading files..." />
    );
  }

  if (!files || files.length === 0) {
    return (
      <div className="text-center p-10 border border-dashed rounded-xl bg-gray-50 dark:bg-gray-800/50">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <FaFile className="text-gray-400 text-3xl" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">No files found</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Upload a file to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
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
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {files.map((file, index) => (
              <tr 
                key={file.publicId || file.url || index} 
                className={`transition-all duration-300 ${
                  visibleItems.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                } hover:bg-gray-50 dark:hover:bg-gray-800/50`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg animate-float">
                      {getFileIcon(file.name, file.mimetype)}
                    </div>
                    <div className="ml-4">
                      <a 
                        href={file.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 group"
                      >
                        <span className="truncate max-w-xs">{file.name}</span>
                        <FaDownload className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-1" size={12} />
                      </a>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{file.mimetype || 'Unknown type'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                    {formatFileSize(file.size)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {file.uploadedAt ? formatDistanceToNow(new Date(file.uploadedAt)) : 'Unknown'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-3">
                    <a 
                      href={file.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                      download
                    >
                      <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                        <FaDownload size={14} />
                        <span>Download</span>
                      </span>
                    </a>
                    
                    {allowDelete && (
                      <button
                        onClick={() => handleDelete(file)}
                        disabled={deletingFiles.has(file.publicId)}
                        className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {deletingFiles.has(file.publicId) ? (
                          <span className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 px-3 py-1 rounded-full">
                            <FaSpinner className="animate-spin" size={14} />
                            <span>Deleting...</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 px-3 py-1 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
                            <FaTrash size={14} />
                            <span>Delete</span>
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList; 