import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FaFile, FaUsers, FaUser, FaComments, FaShare } from 'react-icons/fa';
import Chat from '../components/Chat';
import UserList from '../components/UserList';
import FileUpload from '../components/FileUpload';
import JoinRoomForm from '../components/JoinRoomForm';
import { roomsApi } from '../services/api';
import { initSocket, on, off, joinRoom, sendMessage, shareFileInfo, getSocketId } from '../services/socket';

// Helper function to get query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RoomDetail = () => {
  const { id: roomId } = useParams();
  const query = useQuery();
  const navigate = useNavigate();
  
  // State
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [username, setUsername] = useState(query.get('username') || '');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'files', 'users'
  
  useEffect(() => {
    // Initialize socket and fetch room data
    const socket = initSocket();
    fetchRoomData();
    
    // If we have a username in the URL, join the room automatically
    if (username) {
      handleJoinRoom({ username, roomId });
    }
    
    // Set up socket event listeners
    on('roomInfo', handleRoomInfo);
    on('userJoined', handleUserJoined);
    on('message', handleMessage);
    on('newFile', handleNewFile);
    on('userLeft', handleUserLeft);
    
    // Clean up event listeners on unmount
    return () => {
      off('roomInfo', handleRoomInfo);
      off('userJoined', handleUserJoined);
      off('message', handleMessage);
      off('newFile', handleNewFile);
      off('userLeft', handleUserLeft);
    };
  }, [roomId, username]);
  
  const fetchRoomData = async () => {
    setIsLoading(true);
    
    try {
      const response = await roomsApi.getRoom(roomId);
      
      if (response.success) {
        setRoom(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch room details');
      }
    } catch (error) {
      console.error('Error fetching room:', error);
      toast.error(`Failed to load room: ${error.message}`);
      navigate('/rooms');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleJoinRoom = (joinData) => {
    joinRoom({
      roomId: joinData.roomId,
      username: joinData.username
    });
  };
  
  const handleRoomInfo = (data) => {
    setIsJoined(true);
    setUsers(data.users);
    setCurrentUser({
      id: getSocketId(),
      username: username
    });
    
    // Update room data
    setRoom(prevRoom => ({
      ...prevRoom,
      isPrivate: data.isPrivate,
      users: data.users
    }));
  };
  
  const handleUserJoined = (data) => {
    // Update users list
    setUsers(data.users);
  };
  
  const handleUserLeft = (data) => {
    // Update users list
    setUsers(data.users);
  };
  
  const handleMessage = (data) => {
    // Add new message to the list
    setMessages(prevMessages => [...prevMessages, data]);
  };
  
  const handleNewFile = (data) => {
    // Add file info as a message
    setMessages(prevMessages => [...prevMessages, data]);
  };
  
  const handleSendMessage = (messageText) => {
    sendMessage(roomId, messageText);
  };
  
  const handleUploadSuccess = (fileData) => {
    // Share the file info with the room
    shareFileInfo(roomId, fileData);
  };
  
  // If we don't have a username yet, show the join form
  if (!isJoined) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold mb-4">Join Room</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Enter your name to join room {roomId.substring(0, 8)}...
          </p>
          
          <JoinRoomForm
            onJoin={handleJoinRoom}
            initialRoomId={roomId}
          />
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-xl">Loading room details...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          Room: {room?.id.substring(0, 8)}...
          {room?.isPrivate && (
            <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
              Private Room
            </span>
          )}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {users.length} {users.length === 1 ? 'user' : 'users'} in this room
        </p>
      </div>
      
      {/* Mobile Tab Navigation */}
      <div className="lg:hidden bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-4 overflow-hidden">
        <div className="flex">
          <button 
            className={`flex-1 py-3 flex items-center justify-center gap-1 ${activeTab === 'chat' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            onClick={() => setActiveTab('chat')}
          >
            <FaComments />
            <span>Chat</span>
          </button>
          
          <button 
            className={`flex-1 py-3 flex items-center justify-center gap-1 ${activeTab === 'files' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            onClick={() => setActiveTab('files')}
          >
            <FaFile />
            <span>Files</span>
          </button>
          
          <button 
            className={`flex-1 py-3 flex items-center justify-center gap-1 ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            onClick={() => setActiveTab('users')}
          >
            <FaUsers />
            <span>Users</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chat Area (Main Content) */}
        <div className={`lg:col-span-7 ${activeTab !== 'chat' && 'hidden lg:block'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden h-[600px] flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-900">
              <h2 className="text-xl font-bold flex items-center">
                <FaComments className="mr-2 text-blue-500" />
                Chat
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {messages.length} {messages.length === 1 ? 'message' : 'messages'}
              </div>
            </div>
            
            <Chat
              messages={messages}
              currentUser={currentUser}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
        
        {/* Sidebar (Files & Users) */}
        <div className="lg:col-span-5">
          {/* File Upload */}
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-6 ${activeTab !== 'files' && 'hidden lg:block'}`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <h2 className="text-xl font-bold flex items-center">
                <FaFile className="mr-2 text-blue-500" />
                Share a File
              </h2>
            </div>
            <div className="p-4">
              <FileUpload
                uploadUrl="http://localhost:3000/api/files/private/upload"
                isPrivate={true}
                onUploadSuccess={handleUploadSuccess}
              />
            </div>
          </div>
          
          {/* Room Info & Users */}
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 ${activeTab !== 'users' && 'hidden lg:block'}`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <h2 className="text-xl font-bold flex items-center">
                <FaUsers className="mr-2 text-blue-500" />
                Users
              </h2>
            </div>
            
            <UserList
              users={users}
              currentUserId={currentUser?.id}
            />
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href.split('?')[0]);
                  toast.success('Room link copied to clipboard');
                }}
              >
                <FaShare />
                <span>Share Room Link</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail; 