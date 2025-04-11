import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FaUsers, FaPlus } from 'react-icons/fa';
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">File Sharing Rooms</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Join a public room or create a private room to share files directly with other users.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaPlus className="mr-2 text-green-500" />
              Create or Join a Room
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Enter your details below to join an existing room or create a new private room.
            </p>
            
            <JoinRoomForm 
              onJoin={handleJoin}
              isLoading={isJoining}
            />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 mt-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaUsers className="mr-2 text-blue-500" />
              About Rooms
            </h2>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p>
                <strong>Public Rooms:</strong> Anyone can join with the room ID. Great for sharing with multiple people.
              </p>
              <p>
                <strong>Private Rooms:</strong> Only invited users can join. Perfect for secure one-to-one sharing.
              </p>
              <p>
                <strong>File Retention:</strong> Files shared in rooms are available for 1 hour after uploading.
              </p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">Public Rooms</h2>
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                <p>Loading rooms...</p>
              </div>
            ) : rooms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rooms.map((room) => (
                  <Room key={room.id} room={room} />
                ))}
              </div>
            ) : (
              <div className="text-center p-8 border border-dashed rounded-lg border-gray-300 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">No public rooms found</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Create a new room to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms; 