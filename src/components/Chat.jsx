import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaFile } from 'react-icons/fa';

const Message = ({ message, isCurrentUser }) => {
  const time = new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
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
        <div className="flex items-center gap-2 mb-2">
          <FaFile />
          <span className="font-medium">File shared</span>
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
        <div className={`text-xs mt-2 text-right ${isCurrentUser ? 'text-green-200' : 'text-gray-500 dark:text-gray-400'}`}>
          {time}
        </div>
      </div>
    </div>
  );
};

const Chat = ({ messages = [], currentUser, onSendMessage }) => {
  const [messageText, setMessageText] = useState('');
  const endOfMessagesRef = useRef(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    
    onSendMessage(messageText);
    setMessageText('');
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
            />
          ))
        )}
        <div ref={endOfMessagesRef} />
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!messageText.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-2 rounded-lg transition-colors"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat; 