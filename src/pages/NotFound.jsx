import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-lg">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <FaHome />
            <span>Go Home</span>
          </Link>
          <Link 
            to="/rooms" 
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <FaSearch />
            <span>Find Rooms</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 