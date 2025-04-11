import { FaUsers, FaLock, FaUnlock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from '../utils/date';

const Room = ({ room }) => {
  const navigate = useNavigate();
  
  const handleJoinRoom = () => {
    navigate(`/room/${room.id}`);
  };
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
      onClick={handleJoinRoom}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <FaUsers className="text-blue-600 dark:text-blue-400 text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Room #{room.id.substring(0, 8)}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Created {formatDistanceToNow(new Date(room.createdAt))}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {room.isPrivate ? (
            <div className="p-1.5 bg-amber-100 dark:bg-amber-900/50 rounded-md">
              <FaLock className="text-amber-600 dark:text-amber-400" />
            </div>
          ) : (
            <div className="p-1.5 bg-green-100 dark:bg-green-900/50 rounded-md">
              <FaUnlock className="text-green-600 dark:text-green-400" />
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300">
          <FaUsers className="text-gray-400" />
          <span>{room.userCount} {room.userCount === 1 ? 'user' : 'users'}</span>
        </div>
        
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-4 rounded-md transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            handleJoinRoom();
          }}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Room; 