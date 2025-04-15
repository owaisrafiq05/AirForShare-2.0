import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaSadTear } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-20 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-xl mx-auto">
          <div className="mb-8 text-[#abd373] flex justify-center">
            <FaSadTear className="text-8xl opacity-80" />
          </div>
          <h1 className="text-7xl font-bold text-white mb-6">404</h1>
          <h2 className="text-3xl font-semibold text-gray-200 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-300 mb-12 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/" 
              className="group px-8 py-4 bg-white/10 rounded-lg flex items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_span]:delay-200 [&_span]:transition-all"
            >
              <FaHome className="text-[#abd373] group-hover:text-gray-800 transition-all duration-300" />
              <span className="font-bold text-white group-hover:text-gray-800">Go Home</span>
            </Link>
            <Link 
              to="/rooms" 
              className="group px-8 py-4 bg-white/10 rounded-lg flex items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_span]:delay-200 [&_span]:transition-all"
            >
              <FaSearch className="text-[#abd373] group-hover:text-gray-800 transition-all duration-300" />
              <span className="font-bold text-white group-hover:text-gray-800">Find Rooms</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 