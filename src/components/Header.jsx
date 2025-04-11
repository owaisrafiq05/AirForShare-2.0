import { Link } from 'react-router-dom';
import { FaCloudUploadAlt, FaUsers } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <FaCloudUploadAlt className="text-2xl md:text-3xl" />
          <span>AirForShare 2.0</span>
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Link 
            to="/public-files" 
            className="flex items-center gap-1 py-2 px-3 hover:bg-blue-700 rounded-md transition duration-200"
          >
            <span>Public Files</span>
          </Link>
          <Link 
            to="/rooms" 
            className="flex items-center gap-1 py-2 px-3 hover:bg-blue-700 rounded-md transition duration-200"
          >
            <FaUsers className="text-lg" />
            <span>Rooms</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 