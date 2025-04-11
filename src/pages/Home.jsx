import { Link } from 'react-router-dom';
import { FaCloudUploadAlt, FaUsers, FaArrowRight, FaLock } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Feature = ({ icon, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 card-hover transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="flex justify-center mb-4">
        <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-lg animate-float">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-center">{description}</p>
    </div>
  );
};

const Home = () => {
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setBgPosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div 
      className="container mx-auto px-4 py-10 overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at ${bgPosition.x * 100}% ${bgPosition.y * 100}%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)`,
      }}
    >
      {/* Hero Section */}
      <div className="text-center mb-20 relative">
        <div className="absolute -z-10 w-full h-full">
          <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-gradient-text">
          Welcome to AirForShare 2.0
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10 opacity-90">
          The modern solution for simple, secure file sharing with peer-to-peer capabilities
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/public-files" 
            className="group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-1"
          >
            <FaCloudUploadAlt className="text-xl" />
            <span>Public File Sharing</span>
            <FaArrowRight className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link 
            to="/rooms" 
            className="group bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 transform hover:-translate-y-1"
          >
            <FaUsers className="text-xl" />
            <span>P2P File Sharing</span>
            <FaArrowRight className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-center mb-10 relative">
          <span className="relative z-10">Key Features</span>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-3 bg-blue-500/20 rounded-full -z-0"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature 
            icon={<FaCloudUploadAlt className="text-blue-600 dark:text-blue-400 text-4xl" />}
            title="Public File Sharing"
            description="Upload files to our secure cloud storage and share them publicly with anyone, anywhere."
            delay={0}
          />
          <Feature 
            icon={<FaUsers className="text-blue-600 dark:text-blue-400 text-4xl" />}
            title="P2P File Sharing"
            description="Share files directly with specific users through a secure peer-to-peer connection."
            delay={150}
          />
          <Feature 
            icon={<FaLock className="text-blue-600 dark:text-blue-400 text-4xl" />}
            title="Secure Transfers"
            description="All file transfers are encrypted and secure, ensuring your data stays private and protected."
            delay={300}
          />
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-center mb-10 relative">
          <span className="relative z-10">How It Works</span>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-3 bg-blue-500/20 rounded-full -z-0"></div>
        </h2>
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded hidden md:block"></div>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-2xl shadow-lg shadow-blue-500/20 z-10">1</div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 card-hover md:ml-8 flex-1">
                <h3 className="text-2xl font-bold mb-3">Choose Your Sharing Method</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Select between public file sharing (accessible to anyone) or P2P file sharing (private, direct transfers).
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-2xl shadow-lg shadow-indigo-500/20 z-10">2</div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 card-hover md:ml-8 flex-1">
                <h3 className="text-2xl font-bold mb-3">Upload & Share</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Upload your files using our simple drag-and-drop interface and share them instantly.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-2xl shadow-lg shadow-purple-500/20 z-10">3</div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 card-hover md:ml-8 flex-1">
                <h3 className="text-2xl font-bold mb-3">Download & Enjoy</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Recipients can download the files from the shared link or directly in their P2P room.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-blue-600/10 to-indigo-600/10 p-12 rounded-2xl backdrop-blur-sm">
        <h2 className="text-4xl font-bold mb-6">Ready to start sharing?</h2>
        <Link 
          to="/public-files" 
          className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-5 rounded-xl font-medium text-lg inline-flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 transform hover:-translate-y-1"
        >
          Get Started Now
          <FaArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default Home; 