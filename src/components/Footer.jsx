import { FaGithub, FaCode } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">AirForShare 2.0</h3>
            <p className="text-gray-400 text-sm mt-1">
              P2P file sharing made simple and secure
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a href="https://github.com/yourusername/airforshare" 
               className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1">
              <FaGithub />
              <span>GitHub</span>
            </a>
            <a href="#" 
               className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1">
              <FaCode />
              <span>API Docs</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-gray-500 text-sm border-t border-gray-800 pt-5">
          &copy; {new Date().getFullYear()} AirForShare 2.0. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 