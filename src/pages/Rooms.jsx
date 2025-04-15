import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FaUsers, FaPlus, FaSync, FaLock } from 'react-icons/fa';
import Room from '../components/Room';
import JoinRoomForm from '../components/JoinRoomForm';
import { roomsApi } from '../services/api';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  
  useEffect(() => {
    fetchRooms();
  }, []);
  
  const fetchRooms = async () => {
    setIsLoading(true);
    
    try {
      const response = await roomsApi.getPublicRooms();
      
      if (response.success) {
        setRooms(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch rooms');
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast.error(`Failed to load rooms: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleJoin = async (joinData) => {
    setIsJoining(true);
    
    try {
      if (joinData.isPrivate) {
        // Create a new private room
        const response = await roomsApi.createRoom(true);
        
        if (response.success) {
          // Navigate to the room in the parent component
          window.location.href = `/room/${response.data.roomId}?username=${encodeURIComponent(joinData.username)}`;
        } else {
          throw new Error(response.message || 'Failed to create room');
        }
      } else if (joinData.roomId) {
        // Navigate to an existing room
        window.location.href = `/room/${joinData.roomId}?username=${encodeURIComponent(joinData.username)}`;
      } else {
        throw new Error('Missing required information');
      }
    } catch (error) {
      console.error('Error joining room:', error);
      toast.error(`Failed to join room: ${error.message}`);
    } finally {
      setIsJoining(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white relative inline-block">
            File Sharing Rooms
            <div className="absolute left-0 bottom-0 w-full h-1 bg-[#abd373]/30 rounded-full"></div>
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Join a public room or create a private room to share files directly with other users.
          </p>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50 transition-all duration-300 hover:border-[#abd373]/30 transform hover:-translate-y-1">
              <h2 className="text-xl font-bold mb-4 flex items-center text-white">
                <FaPlus className="mr-3 text-[#abd373]" />
                Create or Join a Room
              </h2>
              <p className="text-gray-300 mb-6">
                Enter your details below to join an existing room or create a new private room.
              </p>
              
              <JoinRoomForm 
                onJoin={handleJoin}
                isLoading={isJoining}
              />
            </div>
          
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50 mt-6 transition-all duration-300 hover:border-[#abd373]/30 transform hover:-translate-y-1">
              <h2 className="text-xl font-bold mb-4 flex items-center text-white">
                <FaUsers className="mr-3 text-[#abd373]" />
                About Rooms
              </h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start">
                  <div className="mr-3 p-2 bg-gray-700/50 rounded-lg text-[#abd373]">
                    <FaUsers />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Public Rooms</p>
                    <p className="text-sm">Anyone can join with the room ID. Great for sharing with multiple people.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 p-2 bg-gray-700/50 rounded-lg text-[#abd373]">
                    <FaLock />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Private Rooms</p>
                    <p className="text-sm">Only invited users can join. Perfect for secure one-to-one sharing.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 p-2 bg-gray-700/50 rounded-lg text-[#abd373]">
                    <FaSync />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">File Retention</p>
                    <p className="text-sm">Files shared in rooms are available for 1 hour after uploading.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50 transition-all duration-300 hover:border-[#abd373]/30">
              <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                <h2 className="text-xl font-bold text-white">Public Rooms</h2>
                <button 
                  onClick={fetchRooms} 
                  className="p-2 rounded-lg bg-gray-700/50 text-[#abd373] hover:bg-gray-700 transition-colors"
                  title="Refresh rooms"
                >
                  <FaSync />
                </button>
              </div>
            
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#abd373] mb-4"></div>
                  <p className="text-gray-300">Loading rooms...</p>
                </div>
              ) : rooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rooms.map((room) => (
                    <Room key={room.id} room={room} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/30">
                  <FaUsers className="text-5xl text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-300 mb-2">No public rooms found</p>
                  <p className="text-gray-400 text-sm">Create a new room to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms; 