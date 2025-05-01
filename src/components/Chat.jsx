import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaFile, FaPaperclip, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'sonner';
import { filesApi } from '../services/api';

const Message = ({ message, isCurrentUser, onDeleteFile }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const time = new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  const handleDeleteFile = async () => {
    if (!message.fileInfo || !message.fileInfo.publicId) {
      toast.error("Cannot delete file: missing ID");
      return;
    }
    
    setIsDeleting(true);
    
    try {
      // Determine if it's a public or private file
      const isPublic = message.fileInfo.isPublic;
      const response = isPublic 
        ? await filesApi.deletePublicFile(message.fileInfo.publicId)
        : await filesApi.deletePrivateFile(message.fileInfo.publicId);
      
      if (response.success) {
        toast.success("File deleted successfully");
        if (onDeleteFile) {
          onDeleteFile(message);
        }
      } else {
        throw new Error(response.message || "Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error(`Failed to delete file: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Regular message
  if (!message.fileInfo) {
    return (
      <div className={`flex mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg
            ${isCurrentUser 
              ? 'bg-blue-600 text-white rounded-br-none' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
            }`}
        >
          {!isCurrentUser && (
            <div className="font-semibold text-xs mb-1">{message.user.username}</div>
          )}
          <p className="break-words">{message.message}</p>
          <div className={`text-xs mt-1 text-right ${isCurrentUser ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}`}>
            {time}
          </div>
        </div>
      </div>
    );
  }
  
  // File message
  return (
    <div className={`flex mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg
          ${isCurrentUser 
            ? 'bg-green-600 text-white rounded-br-none' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
          }`}
      >
        {!isCurrentUser && (
          <div className="font-semibold text-xs mb-1">{message.user.username}</div>
        )}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <FaFile />
            <span className="font-medium">File shared</span>
          </div>
          {isCurrentUser && (
            <button 
              onClick={handleDeleteFile}
              disabled={isDeleting}
              className="text-white/80 hover:text-white/100"
              title="Delete file"
            >
              {isDeleting ? (
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <FaTrash size={14} />
              )}
            </button>
          )}
        </div>
        <a
          href={message.fileInfo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 border border-white/20 dark:border-gray-600 rounded-lg hover:bg-white/10 dark:hover:bg-gray-600/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <FaFile className={isCurrentUser ? 'text-white/80' : 'text-blue-500'} />
            <span className="font-medium truncate">{message.fileInfo.name}</span>
          </div>
          <div className={`text-xs mt-1 ${isCurrentUser ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
            {(message.fileInfo.size / 1024 / 1024).toFixed(2)} MB • Click to download
          </div>
        </a>
        {message.message && (
          <p className="break-words mt-2 border-t border-white/20 dark:border-gray-700 pt-2">
            {message.message}
          </p>
        )}
        <div className={`text-xs mt-2 text-right ${isCurrentUser ? 'text-green-200' : 'text-gray-500 dark:text-gray-400'}`}>
          {time}
        </div>
      </div>
    </div>
  );
};

const Chat = ({ messages = [], currentUser, onSendMessage, onDeleteMessage }) => {
  const [messageText, setMessageText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const endOfMessagesRef = useRef(null);
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!messageText.trim() && !selectedFile) return;
    
    if (selectedFile) {
      // Upload the file first
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      try {
        // Upload to private API endpoint
        const response = await axios.post('http://localhost:3000/api/files/private/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        if (response.data.success) {
          // Send message with file info
          const fileInfoWithMessage = {
            ...response.data.data,
            message: messageText  // Include the message text with the file info
          };
          onSendMessage(messageText, fileInfoWithMessage);
          toast.success('File uploaded and shared successfully!');
        } else {
          throw new Error('File upload failed');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error(`Failed to upload file: ${error.message}`);
      } finally {
        setIsUploading(false);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } else {
      // Send text-only message
      onSendMessage(messageText);
    }
    
    setMessageText('');
  };
  
  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <Message 
              key={index}
              message={message}
              isCurrentUser={message.user.id === currentUser?.id}
              onDeleteFile={onDeleteMessage}
            />
          ))
        )}
        <div ref={endOfMessagesRef} />
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        {selectedFile && (
          <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <FaFile className="mr-2 text-blue-500" />
              <span className="text-sm truncate max-w-[200px]">{selectedFile.name}</span>
              <span className="text-xs text-gray-500 ml-2">
                ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-gray-500 hover:text-red-500"
              disabled={isUploading}
            >
              ✕
            </button>
          </div>
        )}
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={selectedFile ? "Add a message (optional)" : "Type a message..."}
            className="flex-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isUploading}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
          <button
            type="button"
            onClick={handleAttachClick}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 p-2 rounded-lg transition-colors"
            disabled={isUploading}
          >
            <FaPaperclip />
          </button>
          <button
            type="submit"
            disabled={(!messageText.trim() && !selectedFile) || isUploading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-2 rounded-lg transition-colors"
          >
            {isUploading ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <FaPaperPlane />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat; 