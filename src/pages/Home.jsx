import { Link } from 'react-router-dom';
import { FaCloudUploadAlt, FaUsers, FaArrowRight, FaLock } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import bgImage from '../assets/bg.png';

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
      className={`m-2 group px-10 py-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="w-20 h-20 card1img aspect-square text-[#abd373] group-hover:bg-gray-800 text-5xl rounded-full p-2 transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-2 mx-auto flex items-center justify-center">
        {icon}
      </div>
      <p className="cardtxt font-semibold text-gray-200 tracking-wider group-hover:text-gray-700 text-xl">
        {title}
      </p>
      <p className="blueberry font-semibold text-gray-600 text-xs">
        {description}
      </p>
    </div>
  );
};

const StepItem = ({ number, title, description, isLast = false }) => (
  <div className="flex mb-16 relative">
    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-[#abd373] to-[#88a95b] text-white font-bold text-2xl shadow-lg shadow-[#abd373]/20 z-10">
      {number}
    </div>
    
    <div className="ml-8 flex-1">
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-700/50 hover:border-[#abd373]/50 transition-all duration-300 transform hover:-translate-y-1">
        <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-300 text-lg">
          {description}
        </p>
      </div>
      
      {!isLast && (
        <div className="absolute left-8 top-16 h-16 w-0.5 bg-gradient-to-b from-[#abd373] to-[#88a95b]">
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-6 w-3 h-3 rotate-45 border-b-2 border-r-2 border-[#abd373]"></div>
        </div>
      )}
    </div>
  </div>
);

const Home = () => {
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setBgPosition({ x, y });
      }
    };
    
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section with Background Image */}
      <div 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent"
          style={{
            backgroundImage: `radial-gradient(circle at ${bgPosition.x * 100}% ${bgPosition.y * 100}%, rgba(171, 211, 115, 0.3) 0%, transparent 50%)`,
          }}
        ></div>
        
        <div className="container mx-auto z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-gradient-text">
            Welcome to <span className="text-[#abd373]">AirForShare 2.0</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 opacity-90">
            The modern solution for simple, secure file sharing with peer-to-peer capabilities
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/public-files" 
              className="group px-10 py-5 bg-white/10 rounded-lg flex items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_span]:delay-200 [&_span]:transition-all"
            >
              <FaCloudUploadAlt className="text-2xl text-[#abd373] group-hover:text-gray-800 transition-all duration-300" />
              <span className="font-bold text-white group-hover:text-gray-800">Public File Sharing</span>
              <FaArrowRight className="ml-1 text-white group-hover:text-gray-800 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link 
              to="/rooms" 
              className="group px-10 py-5 bg-white/10 rounded-lg flex items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_span]:delay-200 [&_span]:transition-all"
            >
              <FaUsers className="text-2xl text-[#abd373] group-hover:text-gray-800 transition-all duration-300" />
              <span className="font-bold text-white group-hover:text-gray-800">P2P File Sharing</span>
              <FaArrowRight className="ml-1 text-white group-hover:text-gray-800 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center items-start p-1">
            <div className="w-1.5 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 relative">
            <span className="relative z-10 text-white">Key Features</span>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-3 bg-[#abd373]/30 rounded-full -z-0"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <Feature 
              icon={<FaCloudUploadAlt className="text-inherit" />}
              title="Public File Sharing"
              description="Upload files to our secure cloud storage and share them publicly with anyone, anywhere."
              delay={0}
            />
            <Feature 
              icon={<FaUsers className="text-inherit" />}
              title="P2P File Sharing"
              description="Share files directly with specific users through a secure peer-to-peer connection."
              delay={150}
            />
            <Feature 
              icon={<FaLock className="text-inherit" />}
              title="Secure Transfers"
              description="All file transfers are encrypted and secure, ensuring your data stays private and protected."
              delay={300}
            />
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 relative">
            <span className="relative z-10 text-white">How It Works</span>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-3 bg-[#abd373]/30 rounded-full -z-0"></div>
          </h2>
          
          <div className="max-w-3xl mx-auto px-6">
            <StepItem 
              number="1" 
              title="Choose Your Sharing Method" 
              description="Select between public file sharing (accessible to anyone) or P2P file sharing (private, direct transfers)."
            />
            
            <StepItem 
              number="2" 
              title="Upload & Share" 
              description="Upload your files using our simple drag-and-drop interface and share them instantly."
            />
            
            <StepItem 
              number="3" 
              title="Download & Enjoy" 
              description="Recipients can download the files from the shared link or directly in their P2P room."
              isLast={true}
            />
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-12 rounded-2xl backdrop-blur-sm max-w-4xl mx-auto border border-gray-700/50">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to start sharing?</h2>
            <Link 
              to="/public-files" 
              className="group px-10 py-5 bg-white/10 rounded-lg inline-flex items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_span]:delay-200 [&_span]:transition-all"
            >
              <span className="font-bold text-white group-hover:text-gray-800">Get Started Now</span>
              <FaArrowRight className="ml-1 text-white group-hover:text-gray-800 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 