import { useState } from 'react';
import { FaUser, FaKey, FaLock, FaUnlock } from 'react-icons/fa';

const JoinRoomForm = ({ onJoin, initialRoomId = '', isLoading = false }) => {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState(initialRoomId);
  const [isPrivate, setIsPrivate] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (username.length > 20) {
      newErrors.username = 'Username must be less than 20 characters';
    }
    
    if (!initialRoomId && !roomId && !isPrivate) {
      newErrors.roomId = 'Room ID is required for joining a public room';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    onJoin({
      username,
      roomId: roomId || undefined,
      isPrivate
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
      <div>
        <label htmlFor="username" className="block text-sm font-medium mb-1">
          Your Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            <FaUser />
          </div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
            } bg-white dark:bg-gray-800`}
            placeholder="Enter your display name"
          />
        </div>
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username}</p>
        )}
      </div>

      {!initialRoomId && (
        <>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="createNewRoom"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="createNewRoom" className="text-sm font-medium">
              Create a new {isPrivate ? 'private' : 'public'} room
            </label>
            {isPrivate ? <FaLock className="text-amber-500" /> : <FaUnlock className="text-green-500" />}
          </div>

          {!isPrivate && (
            <div>
              <label htmlFor="roomId" className="block text-sm font-medium mb-1">
                Room ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FaKey />
                </div>
                <input
                  type="text"
                  id="roomId"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.roomId ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } bg-white dark:bg-gray-800`}
                  placeholder="Enter room ID to join"
                />
              </div>
              {errors.roomId && (
                <p className="mt-1 text-sm text-red-600">{errors.roomId}</p>
              )}
            </div>
          )}
        </>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting...
          </>
        ) : (
          <>{initialRoomId ? 'Join Room' : (isPrivate ? 'Create Private Room' : 'Join Room')}</>
        )}
      </button>
    </form>
  );
};

export default JoinRoomForm; 