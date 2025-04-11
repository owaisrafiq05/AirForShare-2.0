import { FaUser, FaUserTie } from 'react-icons/fa';

const UserList = ({ users = [], currentUserId }) => {
  const sortedUsers = [...users].sort((a, b) => {
    // Current user at the top
    if (a.id === currentUserId) return -1;
    if (b.id === currentUserId) return 1;
    // Then alphabetical by username
    return a.username.localeCompare(b.username);
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium">Users in Room ({users.length})</h3>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {sortedUsers.map((user) => (
          <li key={user.id} className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
              {user.id === currentUserId ? (
                <FaUserTie className="text-blue-600 dark:text-blue-400" />
              ) : (
                <FaUser className="text-gray-600 dark:text-gray-400" />
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user.username} {user.id === currentUserId && '(You)'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">ID: {user.id.substring(0, 8)}...</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList; 